import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-pokemon-individual',
  templateUrl: './pokemon-individual.component.html',
  styleUrls: ['./pokemon-individual.component.css']
})
export class PokemonIndividualComponent implements OnInit {
  pokemonAleatorio: any;

  constructor(private pokemonService: ServicioService) { }

  ngOnInit(): void {
    const numeroAleatorio = Math.floor(Math.random() * 1010) + 1; //Obtiene un número aleatorio entre el 1 y el 1010
    this.obtenerPokemonAleatorio(numeroAleatorio);
  }

  obtenerPokemonAleatorio(numero: number): void {
    this.pokemonService.getPokemonPorNumero(numero).subscribe(data => {

      //Primera letra del nombre a mayúscula
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

      //Altura de decimetros a metros
      data.height = data.height / 10;

      //Peso a kilogramos
      data.weight = data.weight / 10;

      this.pokemonAleatorio = data;
    });
  }

}

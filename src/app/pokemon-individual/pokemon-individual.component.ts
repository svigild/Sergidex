import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-pokemon-individual',
  templateUrl: './pokemon-individual.component.html',
  styleUrls: ['./pokemon-individual.component.css']
})
export class PokemonIndividualComponent implements OnInit {
  pokemonAleatorio: any;
  pokemonActual: any;

  constructor(private pokemonService: ServicioService) { }

  ngOnInit(): void {
    const numeroAleatorio = Math.floor(Math.random() * 1010) + 1; //Obtiene un número aleatorio entre el 1 y el 1010
    this.obtenerPokemonAleatorio(numeroAleatorio);
  }

  typeColorMappings: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };

  getCssClassForType(typeName: string): string {
    const typeColor = this.typeColorMappings[typeName];
    return typeColor ? 'type-' + typeName : 'type-default';
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

  cambiarPokemon(): void {
    const nuevoNumeroAleatorio = Math.floor(Math.random() * 1010) + 1;
    this.obtenerPokemonAleatorio(nuevoNumeroAleatorio);
  }

}

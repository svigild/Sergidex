import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { forkJoin, map, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  
  destacados: any[] = []; // Cambié el nombre de la propiedad a 'destacados'

  constructor(private apiService: ServicioService) { }

  ngOnInit(): void {
    this.obtenerPokemonsDestacados(); // Llamo al método para obtener los Pokémon destacados
  }

  obtenerPokemonsDestacados() {
    this.apiService.obtenerPokemonsDestacados().subscribe(
      (pokemons: any[]) => {
        this.destacados = pokemons.map(details => {
          const nameLowerCase = details.name.toLowerCase(); // Convierte el nombre a minúsculas
          return {
            id: details.id,
            name: nameLowerCase,
            height: details.height / 10, // Dividir entre 10 para obtener altura en decímetros
            weight: details.weight / 10, // Dividir entre 10 para obtener peso en hectogramos
            sprites: details.sprites,
            types: details.types,
            description: '' // Asigna la descripción aquí
          };
        });
      },
      (error: any) => {
        console.error('Error al obtener Pokémon destacados:', error);
      }
    );
  }
  

  typeColorMappings: { [key: string]: string } = {
    normal: 'type-normal',
    fire: 'type-fire',
    water: 'type-water',
    electric: 'type-electric',
    grass: 'type-grass',
    ice: 'type-ice',
    fighting: 'type-fighting',
    poison: 'type-poison',
    ground: 'type-ground',
    flying: 'type-flying',
    psychic: 'type-psychic',
    bug: 'type-bug',
    rock: 'type-rock',
    ghost: 'type-ghost',
    dragon: 'type-dragon',
    dark: 'type-dark',
    steel: 'type-steel',
    fairy: 'type-fairy'
  };

  getCssClassForType(typeName: string): string {
    const defaultTypeClass = 'type-default';
    const typeClass = this.typeColorMappings[typeName.toLowerCase()] || defaultTypeClass;
    return `rounded ${typeClass}`;
  }



}
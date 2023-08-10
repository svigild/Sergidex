import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';

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
    this.obtenerDescripciones(this.destacados); // Agregar esta línea
  }

  obtenerPokemonsDestacados() {
    for (const pokemon of this.destacados) {
      this.apiService.obtenerDetallesPokemon(pokemon.id).subscribe(
        (detalles: any) => {
          // Obtener la descripción en el idioma deseado, por ejemplo, en inglés (en)
          const description = detalles.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
          if (description) {
            pokemon.description = description.flavor_text;
          }
        },
        (error: any) => {
          console.error('Error al obtener detalles del Pokémon:', error);
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

  obtenerDescripciones(pokemons: any[]) {
    for (const pokemon of pokemons) {
      this.apiService.obtenerDescripcionPokemon(pokemon.id).subscribe(
        (data) => {
          const description = data.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'en' && entry.version.name === 'sword'
          );
          if (description) {
            pokemon.descripcion = description.flavor_text.replace(/\n/g, ' '); // Remover saltos de línea
            console.log('Descripción:', pokemon.descripcion); // Agregar este log
          }
        },
        (error) => {
          console.error('Error al obtener la descripción:', error);
        }
      );
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {
  allPokemon: any[] = []; // Lista de todos los Pokémon
  selectedPokemonList: any[] = []; // Lista de Pokémon seleccionados
  maxPokemonCount: number = 6;

  addPokemonToTeam(pokemon: any) {
    if (this.selectedPokemonList.length < this.maxPokemonCount) {
      this.selectedPokemonList.push(pokemon);
    }
  }

  removePokemonFromTeam(index: number){
    this.selectedPokemonList.splice(index, 1);
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

  emptyPokemonSlots(selectedPokemonCount: number): any[] {
    const emptySlots = Math.max(this.maxPokemonCount - selectedPokemonCount, 0);
    return new Array(emptySlots).fill(null);
  }

  getColorForType(typeName: string): string {
    const typeClass = this.typeColorMappings[typeName.toLowerCase()] || '';
    return typeClass;
  }
}
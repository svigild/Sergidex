import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-lista-pokemon-equipo',
  templateUrl: './lista-pokemon-equipo.component.html',
  styleUrls: ['./lista-pokemon-equipo.component.css']
})
export class ListaPokemonEquipoComponent implements OnInit{
  @Input() pokemonList: any[] = [];
  @Output() pokemonSelected = new EventEmitter<any>();
  
  //pokemonList : any[] = []; //Creo la array vacia
  searchTerm: string = '';
  selectedType: string = '';

  constructor(private pokemonService: ServicioService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  //Obtengo la lista con los Pokemon
  getPokemonList() {
    this.pokemonService.getAllPokemon().subscribe(
      (pokemonList: any[]) => {
        this.pokemonList = pokemonList;
        this.filteredPokemonList = pokemonList; // Asigna la lista filtrada también
      },
      (error) => {
        console.log('Error getting Pokemon list:', error);
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

  selectPokemon(pokemon: any) {
    this.pokemonSelected.emit(pokemon);
  }

  allTypes: string[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
    'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  getColorClassForType(type: string): string {
    const typeColorClass = this.typeColorMappings[type.toLowerCase()] || 'btn-secondary';
    return `btn ${typeColorClass}`;
  }

  filteredPokemonList: any[] = []; // Lista de Pokémon filtrados por tipo

  filterByType(selectedType: string) {
    this.selectedType = selectedType; // Actualizar el tipo seleccionado
  
    // Filtrar la lista de Pokémon por tipo y término de búsqueda
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      (this.selectedType === '' || pokemon.types.some((type: { type: { name: string } }) => type.type.name === this.selectedType)) &&
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  seeAllPokemon(){
    this.filteredPokemonList = this.pokemonList; 
  }

  searchPokemon(type: string) {
    this.selectedType = type; // Actualizar el tipo seleccionado
  
    // Filtrar la lista de Pokémon por tipo y término de búsqueda
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      (this.selectedType === '' || pokemon.types.some((type: { type: { name: string } }) => type.type.name === this.selectedType)) &&
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}

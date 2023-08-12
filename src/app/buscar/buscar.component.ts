import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  pokemonList : any[] = []; //Creo la array vacia
  visiblePokemonList: any[] = [];
  loading: boolean = false;
  
  searchTerm: string = ''; // Término de búsqueda


  constructor(private pokemonService: ServicioService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonService.getAllPokemon().subscribe(
      (pokemonList: any[]) => {
        this.pokemonList = pokemonList;
        this.visiblePokemonList = [...pokemonList]; // Initialize the visible list
      },
      (error) => {
        console.log('Error getting Pokemon list:', error);
      }
    );
  }
  
 
  getAllPokemon() {
    this.loading = true;
    this.pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        const pokemonPromises = data.results.map((pokemonResult: any) => {
          const pokemonNumber = this.extractPokemonNumberFromUrl(pokemonResult.url);
          return this.pokemonService.getPokemonPorNumero(pokemonNumber).toPromise();
        });
  
        Promise.all(pokemonPromises).then((pokemonDetails: any[]) => {
          this.pokemonList = pokemonDetails; 
          this.loading = false;
        });
      },
      (error) => {
        console.log('Error getting Pokemon list:', error);
        this.loading = false;
      }
    );
  }

  extractPokemonNumberFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
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

  
  updateSearchTerm(term: string) {
    this.searchTerm = term;
    this.filterPokemon();
  }
  
  filterPokemon() {
    if (this.searchTerm) {
      this.pokemonService.filterPokemonByName(this.searchTerm)
        .pipe(debounceTime(300))
        .subscribe(
          (filteredPokemon: any[]) => {
            this.visiblePokemonList = filteredPokemon;
          },
          (error) => {
            console.log('Error filtering Pokemon:', error);
          }
        );
    } else {
      this.visiblePokemonList = [...this.pokemonList]; // Reset the visible list
    }
  }

}
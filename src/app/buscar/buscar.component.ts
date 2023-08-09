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
  currentPage: number = 1;
  itemsPerPage: number = 50; // Define la cantidad de Pokémon por página
  totalPages: number = 1;
  nextPageUrl: string | null = null;
  loading: boolean = false;
  totalPagesArray: number[] = [];
  searchTerm: string = ''; // Término de búsqueda


  constructor(private pokemonService: ServicioService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonService.getAllPokemon().subscribe(
      (pokemonList: any[]) => {
        // Aquí tienes la lista completa de Pokémon
        this.pokemonList = pokemonList;
  
        // Cargar los primeros 50 Pokémon y establecer las páginas
        this.totalPages = Math.ceil(pokemonList.length / this.itemsPerPage);
        this.loadTotalPagesArray();
        this.loadVisiblePokemon();
  
        this.loading = false;
      },
      (error) => {
        console.log('Error getting Pokemon list:', error);
        this.loading = false;
      }
    );
  }
  
  loadTotalPagesArray() {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getTotalPages() {
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.totalPages = Math.ceil(data.count / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  
      // Filtrar las páginas vacías
      this.totalPagesArray = this.totalPagesArray.filter(pageNumber => {
        return pageNumber <= this.totalPages; // Verificar si hay datos en esa página
      });
  
      // Cargar los Pokémon iniciales
      this.getAllPokemon();
    });
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
          this.nextPageUrl = data.next;
          this.loadVisiblePokemon(); // Cargar los primeros 50 Pokémon
          this.loading = false;
        });
      },
      (error) => {
        console.log('Error getting Pokemon list:', error);
        this.loading = false;
      }
    );
  }
  
  loadVisiblePokemon() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.pokemonList.length);
    this.visiblePokemonList = this.pokemonList.slice(startIndex, endIndex);
  }

  extractPokemonNumberFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadVisiblePokemon(); // Cargar los Pokémon de la página actual
    }
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

    // Actualizar la paginación cuando se realiza una búsqueda
    this.currentPage = 1;
    this.loadTotalPagesArray();
  }

  filterPokemon() {
    if (this.searchTerm) {
      this.pokemonService.filterPokemonByName(this.searchTerm)
        .pipe(debounceTime(300))
        .subscribe(
          (filteredPokemon: any[]) => {
            this.visiblePokemonList = filteredPokemon;
            this.currentPage = 1; // Actualizar la página cuando se filtran los Pokémon
            this.loadTotalPagesArray(); // Actualizar la paginación
          },
          (error) => {
            console.log('Error filtering Pokemon:', error);
          }
        );
    } else if (!this.searchTerm && this.visiblePokemonList.length === 0) {
      this.getAllPokemon();
    }
  }

}

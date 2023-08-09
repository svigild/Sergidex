import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicioService } from '../servicio.service';

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
  this.getPokemonList(); // Cambia esta línea
  }

  getPokemonList() {
    this.pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        this.totalPages = Math.ceil(data.count / this.itemsPerPage);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.totalPagesArray = this.totalPagesArray.filter(pageNumber => {
          return pageNumber <= this.totalPages;
        });
  
        const pokemonPromises = data.results.map((pokemonResult: any) => {
          const pokemonNumber = this.extractPokemonNumberFromUrl(pokemonResult.url);
          return this.pokemonService.getPokemonPorNumero(pokemonNumber).toPromise();
        });
  
        Promise.all(pokemonPromises).then((pokemonDetails: any[]) => {
          this.pokemonList = pokemonDetails;
          this.nextPageUrl = data.next;
          this.loadVisiblePokemon();
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

  getTotalPages() {
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.totalPages = Math.ceil(data.count / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  
      // Filtrar las páginas vacías
      this.totalPagesArray = this.totalPagesArray.filter(pageNumber => {
        return pageNumber <= this.totalPages; // Verificar si hay datos en esa página
      });
    });
  }

  getAllPokemon() {
    this.loading = true;
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      // Asegúrate de que data.results sea un array
      if (Array.isArray(data.results)) {
        const pokemonPromises = data.results.map((pokemonResult: any) => {
          const pokemonNumber = this.extractPokemonNumberFromUrl(pokemonResult.url);
          return this.pokemonService.getPokemonPorNumero(pokemonNumber).toPromise();
        });
  
        Promise.all(pokemonPromises).then((pokemonDetails: any[]) => {
          this.pokemonList = pokemonDetails;
          this.nextPageUrl = data.next;
          this.loadVisiblePokemon();
          this.loading = false;
        });
      }
    });
  }
  
  extractPokemonNumberFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadVisiblePokemon();
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
  }

  filterPokemon() {
    if (this.searchTerm) {
      this.pokemonService.filterPokemonByName(this.searchTerm).subscribe(
        (filteredPokemon: any[]) => {
          this.visiblePokemonList = filteredPokemon;
        },
        (error) => {
          console.log('Error filtering Pokemon:', error);
        }
      );
    } else {
      // Si el término de búsqueda está vacío, cargar todos los Pokémon
      this.getAllPokemon();
    }
  }

}

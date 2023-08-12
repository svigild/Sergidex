import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'https://pokeapi.co/api/v2'; 

  constructor(private http: HttpClient) { }

  getDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/mewtwo`);
  }

  getPokemonPorNumero(numero : number ): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/pokemon/` + numero);
  }

  getAllPokemon(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=1010`).pipe(
      tap((data: any) => console.log('API Response:', data)),
      map((data: any) => data.results), // Aquí estás extrayendo la lista de resultados
      switchMap((results: any[]) => {
        const pokemonPromises = results.map((pokemonResult: any) => {
          const pokemonNumber = this.extractPokemonNumberFromUrl(pokemonResult.url);
          return this.getPokemonPorNumero(pokemonNumber).toPromise();
        });
        return forkJoin(pokemonPromises);
      })
    );
  }

  extractPokemonNumberFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2], 10);
  }

  filterPokemonByName(searchTerm: string): Observable<any[]> {
    return this.getAllPokemon().pipe(
      map((allPokemon: any[]) => {
        if (!searchTerm) {
          return allPokemon; // Si no hay término de búsqueda, devolver todos los Pokémon
        }
  
        searchTerm = searchTerm.toLowerCase(); // Convertir el término de búsqueda a minúsculas
        return allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
      })
    );
  } 

  obtenerPokemonsDestacados(): Observable<any> {
    const pokemonNames = ['mewtwo', 'rayquaza', 'groudon', 'arceus'];
    const requests: Observable<any>[] = [];
  
    for (const name of pokemonNames) {
      const url = `${this.apiUrl}/pokemon/${name}`;
      requests.push(this.http.get(url));
    }
  
    return forkJoin(requests);
  }

  getDescripcionPokemonPorEspecie(especieUrl: string): Observable<any> {
    console.log("getDescripcionPokemonPorEspecie called"); // Agrega este console.log
    return this.http.get(especieUrl);
  }

  getPokemonSpecies(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  getPokemonEvolutionChain(url: string): Observable<any> {
    return this.http.get(url);
  }

  getSpriteUrl(url: string): string {
    // Si la URL contiene "/other/official-artwork/", ya es una URL completa
    if (url.includes('/other/official-artwork/')) {
      return url;
    }
  
    // Si la URL no contiene "/other/official-artwork/", construimos la URL completa
    const pokemonId = this.extractPokemonNumberFromUrl(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }


  getSpanishDescription(speciesUrl: string): Observable<string> {
    return this.http.get(speciesUrl).pipe(
      map((speciesDetails: any) => {
        const flavorTextEntries = speciesDetails.flavor_text_entries;
        const spanishFlavorTextEntry = flavorTextEntries.find((entry: any) => entry.language.name === 'es');
        return spanishFlavorTextEntry.flavor_text;
      })
    );
  }
}
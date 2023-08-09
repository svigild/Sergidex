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
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=1000`).pipe(
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
}

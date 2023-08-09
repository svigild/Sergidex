import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

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

  getAllPokemon() : Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=1000`).pipe(
      map((response: any) => response.results)
    );
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
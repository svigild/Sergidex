import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent {
  types: { [key: string]: { [key: string]: number } };
  typeNames: string[];
  userType: string = '';
  opponentType: string = '';
  effectiveness: number | null = null;
  calculating: boolean = false;

  constructor() {

    this.types = {
      "Bug": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 1, "Fairy": 0.5, "Fighting": 0.5, "Fire": 2, "Flying": 0.5, "Ghost": 1, "Grass": 2, "Ground": 1, "Ice": 1, "Normal": 1, "Poison": 0.5, "Psychic": 2, "Rock": 2, "Steel": 0.5, "Water": 1 },
      "Dark": { "Bug": 2, "Dark": 0.5, "Dragon": 1, "Electric": 1, "Fairy": 2, "Fighting": 2, "Fire": 1, "Flying": 1, "Ghost": 0.5, "Grass": 1, "Ground": 1, "Ice": 1, "Normal": 1, "Poison": 1, "Psychic": 0, "Rock": 1, "Steel": 1, "Water": 1 },
      "Dragon": { "Bug": 1, "Dark": 1, "Dragon": 2, "Electric": 0.5, "Fairy": 2, "Fighting": 1, "Fire": 0.5, "Flying": 1, "Ghost": 1, "Grass": 0.5, "Ground": 1, "Ice": 2, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 1, "Steel": 1, "Water": 0.5 },
      "Electric": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 0.5, "Fairy": 1, "Fighting": 1, "Fire": 1, "Flying": 0.5, "Ghost": 1, "Grass": 1, "Ground": 2, "Ice": 1, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 1, "Steel": 0.5, "Water": 1 },
      "Fairy": { "Bug": 0.5, "Dark": 0.5, "Dragon": 0, "Electric": 1, "Fairy": 1, "Fighting": 0.5, "Fire": 1, "Flying": 1, "Ghost": 1, "Grass": 1, "Ground": 1, "Ice": 1, "Normal": 1, "Poison": 2, "Psychic": 1, "Rock": 1, "Steel": 2, "Water": 1 },
      "Fighting": { "Bug": 0.5, "Dark": 0.5, "Dragon": 1, "Electric": 1, "Fairy": 2, "Fighting": 1, "Fire": 1, "Flying": 2, "Ghost": 1, "Grass": 1, "Ground": 1, "Ice": 1, "Normal": 1, "Poison": 1, "Psychic": 2, "Rock": 0.5, "Steel": 1, "Water": 1 },
      "Fire": { "Bug": 0.5, "Dark": 1, "Dragon": 1, "Electric": 1, "Fairy": 0.5, "Fighting": 1, "Fire": 0.5, "Flying": 1, "Ghost": 1, "Grass": 0.5, "Ground": 2, "Ice": 0.5, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 2, "Steel": 0.5, "Water": 2 },
      "Flying": { "Bug": 0.5, "Dark": 1, "Dragon": 1, "Electric": 2, "Fairy": 1, "Fighting": 0.5, "Fire": 1, "Flying": 1, "Ghost": 1, "Grass": 0.5, "Ground": 0, "Ice": 2, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 2, "Steel": 1, "Water": 1 },
      "Ghost": { "Bug": 0.5, "Dark": 2, "Dragon": 1, "Electric": 1, "Fairy": 1, "Fighting": 0, "Fire": 1, "Flying": 1, "Ghost": 2, "Grass": 1, "Ground": 1, "Ice": 1, "Normal": 0, "Poison": 0.5, "Psychic": 1, "Rock": 1, "Steel": 1, "Water": 1 },
      "Grass": { "Bug": 2, "Dark": 1, "Dragon": 1, "Electric": 0.5, "Fairy": 1, "Fighting": 1, "Fire": 2, "Flying": 2, "Ghost": 1, "Grass": 0.5, "Ground": 0.5, "Ice": 2, "Normal": 1, "Poison": 2, "Psychic": 1, "Rock": 1, "Steel": 1, "Water": 0.5 },
      "Ground": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 0, "Fairy": 1, "Fighting": 1, "Fire": 1, "Flying": 1, "Ghost": 1, "Grass": 2, "Ground": 1, "Ice": 2, "Normal": 1, "Poison": 0.5, "Psychic": 1, "Rock": 0.5, "Steel": 1, "Water": 2 },
      "Ice": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 1, "Fairy": 1, "Fighting": 2, "Fire": 2, "Flying": 1, "Ghost": 1, "Grass": 1, "Ground": 1, "Ice": 0.5, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 2, "Steel": 2, "Water": 1 },
      "Normal": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 1, "Fairy": 1, "Fighting": 2, "Fire": 1, "Flying": 1, "Ghost": 0, "Grass": 1, "Ground": 1, "Ice": 1, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 1, "Steel": 1, "Water": 1 },
      "Poison": { "Bug": 0.5, "Dark": 1, "Dragon": 1, "Electric": 1, "Fairy": 0.5, "Fighting": 0.5, "Fire": 1, "Flying": 1, "Ghost": 1, "Grass": 0.5, "Ground": 2, "Ice": 1, "Normal": 1, "Poison": 0.5, "Psychic": 2, "Rock": 1, "Steel": 1, "Water": 1 },
      "Psychic": { "Bug": 2, "Dark": 2, "Dragon": 1, "Electric": 1, "Fairy": 1, "Fighting": 0.5, "Fire": 1, "Flying": 1, "Ghost": 2, "Grass": 1, "Ground": 1, "Ice": 1, "Normal": 1, "Poison": 1, "Psychic": 0.5, "Rock": 1, "Steel": 1, "Water": 1 },
      "Rock": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 1, "Fairy": 1, "Fighting": 2, "Fire": 0.5, "Flying": 0.5, "Ghost": 1, "Grass": 2, "Ground": 2, "Ice": 1, "Normal": 0.5, "Poison": 0.5, "Psychic": 1, "Rock": 1, "Steel": 2, "Water": 2 },
      "Steel": { "Bug": 0.5, "Dark": 1, "Dragon": 0.5, "Electric": 1, "Fairy": 0.5, "Fighting": 2, "Fire": 2, "Flying": 0.5, "Ghost": 1, "Grass": 0.5, "Ground": 2, "Ice": 0.5, "Normal": 0.5, "Poison": 0, "Psychic": 0.5, "Rock": 0.5, "Steel": 0.5, "Water": 1 },
      "Water": { "Bug": 1, "Dark": 1, "Dragon": 1, "Electric": 2, "Fairy": 1, "Fighting": 1, "Fire": 0.5, "Flying": 1, "Ghost": 1, "Grass": 2, "Ground": 1, "Ice": 0.5, "Normal": 1, "Poison": 1, "Psychic": 1, "Rock": 1, "Steel": 0.5, "Water": 0.5 }
    };
    this.typeNames = Object.keys(this.types);
  }


  calculateEffectiveness() {
    const opponentEff = this.types[this.opponentType]?.[this.userType];
    this.effectiveness = opponentEff !== undefined ? opponentEff : null;
}

  getTypeClass(type: string): string {
    return 'type type-' + type.toLowerCase();
  }

  getEffClass(effectiveness: number): string {
    const eff: { [key: number]: string } = {
      0: "immune",
      0.5: "noteffective",
      1: "normal",
      2: "veryeffective"
    };

    return 'eff eff-' + eff[effectiveness];
  }

  getTypesArray(typeName: string): { type: string, effectiveness: number }[] {
    const typeObj = this.types[typeName];
    return Object.keys(typeObj).map(key => ({ type: key, effectiveness: typeObj[key] }));
  }

  selectUserType(type: string) {
    this.userType = type;
  }

  selectOpponentType(type: string) {
    this.opponentType = type;
  }



}
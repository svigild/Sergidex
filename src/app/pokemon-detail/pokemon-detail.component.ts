import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemonId!: number;
  pokemonDetails: any; 
  spanishDescription: string = '';
  pokemonEvolutionChain: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: ServicioService
  ) {}

  ngOnInit(): void {
    // Obtén el ID del Pokémon de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.pokemonId = +params['id'];
      // Llama al servicio para obtener los detalles del Pokémon
      this.getPokemon();
    });
  }

  getPokemon() {
    this.pokemonService.getPokemonPorNumero(this.pokemonId).subscribe(details => {
      this.pokemonDetails = details;
  
      // Obtén la especie del Pokémon y su cadena evolutiva
      this.pokemonService.getPokemonSpecies(this.pokemonDetails.species.url).subscribe(species => {
        this.loadEvolutionChain(species.evolution_chain.url);
        this.getSpanishDescription(species.url); // Cambia el orden de llamada
        const speciesUrl = this.pokemonDetails.species.url;
      this.getSpanishDescription(speciesUrl);
      });
    });
  }

  getSpanishDescription(speciesUrl: string) {
    this.pokemonService.getDescripcionPokemonPorEspecie(speciesUrl).subscribe(speciesDetails => {
      const flavorTextEntries = speciesDetails.flavor_text_entries;
      const spanishFlavorTextEntry = flavorTextEntries.find((entry: any) => entry.language.name === 'es');
      this.spanishDescription = spanishFlavorTextEntry.flavor_text;
    });
  }

  loadEvolutionChain(evolutionChainUrl: string) {
    this.pokemonService.getPokemonEvolutionChain(evolutionChainUrl).subscribe(evolutionChain => {
      this.pokemonEvolutionChain = evolutionChain;
      console.log("Evolution Chain:", evolutionChain); // Agrega este console.log
    });
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

  getSpriteUrl(url: string): string {
    return this.pokemonService.getSpriteUrl(url);
  }

  getEvolutionStages(stage: any): any[] {
    const stages: any[] = [stage.species];
  
    if (stage.evolves_to.length > 0) {
      stage.evolves_to.forEach((evolution: any) => {
        stages.push(...this.getEvolutionStages(evolution));
      });
    }
  
    return stages;
  }

}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PokemonIndividualComponent } from './pokemon-individual/pokemon-individual.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FormsModule } from '@angular/forms';
import { EquipoComponent } from './equipo/equipo.component';
import { ListaPokemonEquipoComponent } from './lista-pokemon-equipo/lista-pokemon-equipo.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    BuscarComponent,
    PokemonIndividualComponent,
    BuscadorComponent,
    EquipoComponent,
    ListaPokemonEquipoComponent,
    PokemonDetailComponent,
    SobreMiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

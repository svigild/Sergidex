import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { BuscarComponent } from './buscar/buscar.component';
import { EquipoComponent } from './equipo/equipo.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  {path:'', redirectTo: 'inicio', pathMatch: 'full' },
  {path:'inicio', component:InicioComponent},
  {path:'buscar', component:BuscarComponent},
  {path:'equipo', component:EquipoComponent},
  {path:'sobre-mi', component:SobreMiComponent},
  {path:'pokemon/:id', component:PokemonDetailComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
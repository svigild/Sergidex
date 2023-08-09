import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}

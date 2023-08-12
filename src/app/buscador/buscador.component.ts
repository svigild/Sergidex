import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.search.emit(this.searchTerm);
    }
  }
}
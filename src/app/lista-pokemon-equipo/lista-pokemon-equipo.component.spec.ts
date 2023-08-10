import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPokemonEquipoComponent } from './lista-pokemon-equipo.component';

describe('ListaPokemonEquipoComponent', () => {
  let component: ListaPokemonEquipoComponent;
  let fixture: ComponentFixture<ListaPokemonEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPokemonEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPokemonEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

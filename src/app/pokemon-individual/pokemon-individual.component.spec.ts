import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonIndividualComponent } from './pokemon-individual.component';

describe('PokemonIndividualComponent', () => {
  let component: PokemonIndividualComponent;
  let fixture: ComponentFixture<PokemonIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

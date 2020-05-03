import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadDisponibleComponent } from './cantidad-disponible.component';

describe('CantidadDisponibleComponent', () => {
  let component: CantidadDisponibleComponent;
  let fixture: ComponentFixture<CantidadDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantidadDisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantidadDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

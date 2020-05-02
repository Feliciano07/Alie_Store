import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoProductoComponent } from './resultado-producto.component';

describe('ResultadoProductoComponent', () => {
  let component: ResultadoProductoComponent;
  let fixture: ComponentFixture<ResultadoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

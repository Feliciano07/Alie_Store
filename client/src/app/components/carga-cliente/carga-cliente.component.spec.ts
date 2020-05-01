import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaClienteComponent } from './carga-cliente.component';

describe('CargaClienteComponent', () => {
  let component: CargaClienteComponent;
  let fixture: ComponentFixture<CargaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

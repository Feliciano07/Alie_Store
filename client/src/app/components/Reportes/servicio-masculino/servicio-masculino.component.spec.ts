import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioMasculinoComponent } from './servicio-masculino.component';

describe('ServicioMasculinoComponent', () => {
  let component: ServicioMasculinoComponent;
  let fixture: ComponentFixture<ServicioMasculinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioMasculinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioMasculinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

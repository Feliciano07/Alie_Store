import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagivationClienteComponent } from './nagivation-cliente.component';

describe('NagivationClienteComponent', () => {
  let component: NagivationClienteComponent;
  let fixture: ComponentFixture<NagivationClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagivationClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagivationClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

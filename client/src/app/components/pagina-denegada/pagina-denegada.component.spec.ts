import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDenegadaComponent } from './pagina-denegada.component';

describe('PaginaDenegadaComponent', () => {
  let component: PaginaDenegadaComponent;
  let fixture: ComponentFixture<PaginaDenegadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDenegadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDenegadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

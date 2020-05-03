import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaPromedioComponent } from './ayuda-promedio.component';

describe('AyudaPromedioComponent', () => {
  let component: AyudaPromedioComponent;
  let fixture: ComponentFixture<AyudaPromedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaPromedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaPromedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

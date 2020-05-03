import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFemeninoComponent } from './admin-femenino.component';

describe('AdminFemeninoComponent', () => {
  let component: AdminFemeninoComponent;
  let fixture: ComponentFixture<AdminFemeninoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFemeninoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFemeninoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

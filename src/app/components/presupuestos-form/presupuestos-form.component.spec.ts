import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosFormComponent } from './presupuestos-form.component';

describe('PresupuestosFormComponent', () => {
  let component: PresupuestosFormComponent;
  let fixture: ComponentFixture<PresupuestosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

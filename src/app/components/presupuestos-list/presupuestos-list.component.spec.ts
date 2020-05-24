import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosListComponent } from './presupuestos-list.component';

describe('PresupuestosListComponent', () => {
  let component: PresupuestosListComponent;
  let fixture: ComponentFixture<PresupuestosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

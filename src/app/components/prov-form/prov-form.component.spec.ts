import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvFormComponent } from './prov-form.component';

describe('ProvFormComponent', () => {
  let component: ProvFormComponent;
  let fixture: ComponentFixture<ProvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

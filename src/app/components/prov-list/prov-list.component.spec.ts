import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvListComponent } from './prov-list.component';

describe('ProvListComponent', () => {
  let component: ProvListComponent;
  let fixture: ComponentFixture<ProvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

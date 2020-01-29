import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLocalsComponent } from './display-locals.component';

describe('DisplayLocalsComponent', () => {
  let component: DisplayLocalsComponent;
  let fixture: ComponentFixture<DisplayLocalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayLocalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

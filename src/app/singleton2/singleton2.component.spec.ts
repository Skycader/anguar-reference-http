import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singleton2Component } from './singleton2.component';

describe('Singleton2Component', () => {
  let component: Singleton2Component;
  let fixture: ComponentFixture<Singleton2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Singleton2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singleton2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

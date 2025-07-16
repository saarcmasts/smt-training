import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Green } from './green';

describe('Green', () => {
  let component: Green;
  let fixture: ComponentFixture<Green>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Green]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Green);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

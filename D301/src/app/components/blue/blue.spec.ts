import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blue } from './blue';

describe('Blue', () => {
  let component: Blue;
  let fixture: ComponentFixture<Blue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

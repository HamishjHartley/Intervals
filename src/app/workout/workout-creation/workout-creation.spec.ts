import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCreation } from './workout-creation';

describe('WorkoutCreation', () => {
  let component: WorkoutCreation;
  let fixture: ComponentFixture<WorkoutCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

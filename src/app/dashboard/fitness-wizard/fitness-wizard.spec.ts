import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessWizard } from './fitness-wizard';

describe('FitnessWizard', () => {
  let component: FitnessWizard;
  let fixture: ComponentFixture<FitnessWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessWizard],
    }).compileComponents();

    fixture = TestBed.createComponent(FitnessWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

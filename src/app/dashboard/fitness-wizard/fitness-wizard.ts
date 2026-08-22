import { ConfigService } from './../config-service';
import { Component, signal, input, inject } from '@angular/core';
import { FitnessData } from '../../workout/workout-creation/workout-creation';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fitness-wizard',
  imports: [FormField],
  templateUrl: './fitness-wizard.html',
  styleUrl: './fitness-wizard.css',
})
export class FitnessWizard {
  private configService = inject(ConfigService);
  private router = inject(Router);

  fitnessModel = signal<FitnessData>({ftp: 0, thresholdHr: 0, maxHr: 0});
  fitnessForm = form(this.fitnessModel);

  fitness: FitnessData = {ftp: 0, thresholdHr: 0, maxHr: 0};
  fitnessSignal = input(this.fitness);

  setFitnessData(event: Event) {
  event.preventDefault();
  this.fitness = this.fitnessModel();
  this.configService.updateFitness(this.fitness);
  }

  toDashboard() {
    this.router.navigate(['/dashboard']);
  }
}

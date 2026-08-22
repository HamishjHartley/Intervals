import { tap, Subject } from 'rxjs';
import { ConfigService } from './../../dashboard/config-service';
import { MessageService } from '../message/message-service';
import { FitService } from '../file-generation/fit-service';
import { Component, signal, inject } from '@angular/core';
import {form, FormField} from '@angular/forms/signals'
import {MatTableModule} from '@angular/material/table';

export interface LapData {
  duration: number;
  powerZone: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

// TODO: Add additional fitness fields
export interface FitnessData {
  ftp: number;
  thresholdHr: number;
  maxHr: number;
  criticalPower?: number;
  wPrime?: number;
}

@Component({
  selector: 'app-workout-creation',
  imports: [FormField, MatTableModule],
  templateUrl: './workout-creation.html',
  styleUrl: './workout-creation.css',
})
export class WorkoutCreation {
  protected readonly title = signal('interval');

  private fitService = inject(FitService);
  private messageService = inject(MessageService);
  private configService = inject(ConfigService);

  intervalModel = signal<LapData>({duration: 0, powerZone: 0}); 
  intervalForm = form(this.intervalModel); 

  laps: LapData[] = []; 
  lapSignal = signal(this.laps);
  columnsToDisplay = ['position', 'duration', 'power'];

  fitnessData: FitnessData = this.configService.fitnessData();

  addLap(event: Event) {
    event.preventDefault();
    const lap = this.intervalModel();
    this.laps = [...this.laps, lap];
  }

  createActivityFIT() {
    const messages = this.messageService.createActivityMessage(this.laps);
    const encodedMessages = this.fitService.encodeMessages(messages);
    this.fitService.downloadFile(encodedMessages);
  }

  createWorkoutFIT() {
    const messages = this.messageService.createWorkoutMessage(this.laps, this.fitnessData);
    const encodedMessages = this.fitService.encodeMessages(messages);
    this.fitService.downloadFile(encodedMessages);
  }
}

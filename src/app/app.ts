import { MessageService } from './workout/message/message-service';
import { FitService } from './workout/file-generation/fit-service';
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  selector: 'app-root',
  imports: [RouterOutlet, FormField, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('interval');

  private fitService = inject(FitService);
  private messageService = inject(MessageService);

  intervalModel = signal<LapData>({duration: 0, powerZone: 0}); 
  intervalForm = form(this.intervalModel); 

  fitnessModel = signal<FitnessData>({ftp: 0, thresholdHr: 0, maxHr: 0});
  fitnessForm = form(this.fitnessModel);

  laps: LapData[] = []; 
  lapSignal = signal(this.laps);
  columnsToDisplay = ['position', 'duration', 'power'];

  fitness: FitnessData = {ftp: 0, thresholdHr: 0, maxHr: 0};
  fitnessSignal = signal(this.fitness);

  // TODO: Have creation wizard whereby fitness paramters must be entered first before workout can be created
  setFitnessData(event: Event) {
    event.preventDefault();
    this.fitness = this.fitnessModel();

    console.log(this.fitness);
  }

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
    const messages = this.messageService.createWorkoutMessage(this.laps, this.fitness);
    const encodedMessages = this.fitService.encodeMessages(messages);
    this.fitService.downloadFile(encodedMessages);
  }


}
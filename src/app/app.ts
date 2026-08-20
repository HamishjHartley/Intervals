import { MessageService } from './message/message-service';
import { FitService } from './file-generation/fit-service';
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {form, FormField} from '@angular/forms/signals'
import {MatTableModule} from '@angular/material/table';

export interface LapData {
  duration: number;
  power: number
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

  intervalModel = signal<LapData>({duration: 0, power: 0}); // Creating form model
  intervalForm = form(this.intervalModel); // Creating a FieldTree

  laps:LapData[] = []; // Array to store created laps
  lapSignal = signal(this.laps);
  columnsToDisplay = ['position', 'duration', 'power'];

  addLap(event: Event) {
    event.preventDefault()
    const lap = this.intervalModel();
    this.laps = [...this.laps, lap];

  }

  createFIT() {
    const messages = this.messageService.createMessage()
    const encodedMessages = this.fitService.encodeMessages(messages);
    this.fitService.downloadFile(encodedMessages);
  }


}
import { Injectable, Service } from '@angular/core';
import { Activity, DeveloperDataId, DeveloperFieldDescr, DeviceInfo, FileId, Lap, MessageField, Messages, Record, Session, TimerEvent } from './message-fields';
import { LapData } from '../app';
import { Utils } from '@garmin/fitsdk';
import { FIELD_DEFAULTS } from './field-defaults.constants';

@Service()
export class MessageService {

    private createField<T extends Object>(defaults: T, overrides?: Partial<T>): T {
        return {...defaults, ...overrides};
    }

    private createDeveloperDataId(): DeveloperDataId {
        return this.createField(FIELD_DEFAULTS.developerDataId());
    }

    private createDeveloperFieldDescr(fieldName: string, units: string): DeveloperFieldDescr {
        return this.createField(FIELD_DEFAULTS.developerFieldDescr(fieldName, units));
    }

    private createFileId(startTime: number): FileId {
        return this.createField(FIELD_DEFAULTS.fileId(startTime));
    }

    private createDeviceInfo(startTime: number): DeviceInfo {
        return this.createField(FIELD_DEFAULTS.deviceInfo(startTime));
    }

    private createTimerEvent(startTime: number, eventType: string): TimerEvent {
        return this.createField(FIELD_DEFAULTS.timerEvent(startTime, eventType));
    }

    // Remove ambiguous "i" param
    private createRecord(timestamp: number, i: number): Record {
        return this.createField(FIELD_DEFAULTS.record(timestamp, i));
    }

    private createLap(messageIndex: number, timestamp: number, startTime: number, totalElapsedTime: number, totalTimerTime: number): Lap {
        return this.createField(FIELD_DEFAULTS.lap(messageIndex, timestamp, startTime, totalElapsedTime, totalTimerTime));
    }

    private createSession(startTime: number, timestamp: number, totalElapsedTime: number, totalTimerTime: number, numLaps: number, sport: string, subSport: string): Session {
        return this.createField(FIELD_DEFAULTS.session(startTime, timestamp, totalElapsedTime, totalTimerTime, numLaps, sport, subSport));
    }

    private createActivity(timestamp: number, localTimestamp: number, totalTimerTime: number): Activity {
        return this.createField(FIELD_DEFAULTS.activity(timestamp, localTimestamp, totalTimerTime));
    }

    // Creates all of the required timing variables
    private createTimings(lapData: LapData[]) {
        const now = new Date();
        const localTimestampOffset = now.getTimezoneOffset() * -60;
        const startTime = Utils.convertDateToDateTime(now);


    }


    // Main message creation logic - Time creation should be abstracted 
    createMessage(lapData: LapData[]): MessageField[] {
        const messages: MessageField[] = [];
        const now = new Date();
        const localTimestampOffset = now.getTimezoneOffset() * -60;
        const startTime = Utils.convertDateToDateTime(now);

        messages.push(this.createDeveloperDataId());
        messages.push(this.createFileId(startTime));
        messages.push(this.createDeviceInfo(startTime));
        messages.push(this.createTimerEvent(startTime, "start"));
        
        let timestamp = startTime;

        let totalElapsedTime = 0;
        lapData.forEach(element => {
            totalElapsedTime = totalElapsedTime + element.duration
        });
        let totalTimerTime = totalElapsedTime;

        // Record loop - Abstract to method?
        for (let i=0; i <= totalElapsedTime; i++) {
            messages.push(this.createRecord(timestamp, i));

            timestamp++;
        }
        messages.push(this.createTimerEvent(timestamp, "stop"));


        let lapTimestamp = startTime; // separate lap timestamp

        for (let i=0; i< lapData.length; i++) {
            messages.push(this.createLap(i, lapTimestamp, lapTimestamp, lapData[i].duration, lapData[i].duration));
            console.log("Adding", lapData[i].duration, "to lap time stamp:", lapTimestamp, "=");
            lapTimestamp = lapTimestamp + lapData[i].duration;
            console.log(lapTimestamp);
        }

        // Too many parameters, hard coding sport type as well
        let numLaps = 1;
        messages.push(this.createSession(startTime, timestamp, totalElapsedTime, totalTimerTime, numLaps, "cycling", "generic"));

        let localTimestamp = timestamp + localTimestampOffset;
        messages.push(this.createActivity(timestamp, localTimestamp, totalTimerTime));

        console.log(messages);

        return messages;
    }

}
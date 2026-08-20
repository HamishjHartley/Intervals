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

    private createLap(timestamp: number, startTime: number, totalElapsedTime: number, totalTimerTime: number): Lap {
        return this.createField(FIELD_DEFAULTS.lap(timestamp, startTime, totalElapsedTime, totalTimerTime));
    }

    private createSession(startTime: number, timestamp: number, totalElapsedTime: number, totalTimerTime: number, numLaps: number, sport: string, subSport: string): Session {
        return this.createField(FIELD_DEFAULTS.session(startTime, timestamp, totalElapsedTime, totalTimerTime, numLaps, sport, subSport));
    }

    private createActivity(timestamp: number, localTimestamp: number, totalTimerTime: number): Activity {
        return this.createField(FIELD_DEFAULTS.activity(timestamp, localTimestamp, totalTimerTime));
    }

    // Main message creation logic - Time creation should be abstracted 
    // Figure out how to represent a "Messages" array as a concrete type
    createMessage(): (DeveloperDataId | FileId | DeviceInfo | TimerEvent | Record | Lap | Activity)[] {
        const messages: (DeveloperDataId | FileId | DeviceInfo | TimerEvent | Record | Lap | Activity)[] = [];
        const now = new Date();
        const localTimestampOffset = now.getTimezoneOffset() * -60;
        const startTime = Utils.convertDateToDateTime(now);

        messages.push(this.createDeveloperDataId());
        messages.push(this.createFileId(startTime));
        messages.push(this.createDeviceInfo(startTime));
        messages.push(this.createTimerEvent(startTime, "start"));
        
        let timestamp = startTime;
        // Record loop - Abstract to method?
        for (let i=0; i <= 4; i++) {
            messages.push(this.createRecord(timestamp, i));

            timestamp++;
        }
        messages.push(this.createTimerEvent(timestamp, "stop"));

        // Lap creation - Abstract to method? 
        let totalElapsedTime = timestamp - startTime;
        let totalTimerTime = timestamp - startTime;
        messages.push(this.createLap(timestamp, startTime, totalElapsedTime, totalTimerTime));
        
        // Too many parameters, hard coding sport type as well
        let numLaps = 1;
        messages.push(this.createSession(startTime, timestamp, totalElapsedTime, totalTimerTime, numLaps, "cycling", "generic"));

        let localTimestamp = timestamp + localTimestampOffset;
        messages.push(this.createActivity(timestamp, localTimestamp, totalTimerTime));

        console.log(messages);

        return messages;
    }

}
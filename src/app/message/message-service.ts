import { Service } from '@angular/core';
import { Activity, DeveloperDataId, DeveloperFieldDescr, DeviceInfo, FileId, Lap, MessageField, Record, Session, TimerEvent } from './message-fields';
import { LapData } from '../app';
import { Utils } from '@garmin/fitsdk';
import { FIELD_DEFAULTS } from './field-defaults.constants';

@Service()
export class MessageService {
    
    private startTime: number = 0;
    private timestamp: number = 0;
    private lapTimeStamp: number = 0;
    private totalElapsedTime: number = 0;
    private totalTimerTime: number = 0;
    private localTimeStampOffset: number = 0;
    private localTimeStamp: number = 0;
    
    private createField<MessageField>(defaults: MessageField, overrides?: Partial<MessageField>): MessageField {
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

    private initializeTimes(lapData: LapData[]) {
        const now = new Date(Date.now() - 60 * 60 * 1000); // 60 mins ago - for debugging purposes on strava so activity is visible
        this.localTimeStampOffset = now.getTimezoneOffset() * -60;
        
        this.startTime = Utils.convertDateToDateTime(now);
        this.timestamp = this.startTime;
        this.lapTimeStamp = this.startTime;
        lapData.forEach(element => {
            this.totalElapsedTime = this.totalElapsedTime + element.duration
        });
        this.totalTimerTime = this.totalElapsedTime;
        this.localTimeStampOffset = now.getTimezoneOffset() * -60;
        this.localTimeStamp = this.timestamp + this.localTimeStampOffset;
    }

    public createMessage(lapData: LapData[]): MessageField[] {
        const messages: MessageField[] = [];
        this.initializeTimes(lapData);

        messages.push(this.createDeveloperDataId());
        messages.push(this.createFileId(this.startTime));
        messages.push(this.createDeviceInfo(this.startTime));
        messages.push(this.createTimerEvent(this.startTime, "start"));
        
        // Record loop 
        for (let i=0; i <= this.totalElapsedTime; i++) {
            messages.push(this.createRecord(this.timestamp, i));
            this.timestamp++;
        }
        messages.push(this.createTimerEvent(this.timestamp, "stop"));

        // Lap loop
        lapData.forEach((lap, i) => {
            messages.push(this.createLap(i, this.lapTimeStamp, this.lapTimeStamp, lap.duration, lap.duration));
            this.lapTimeStamp = this.lapTimeStamp + lap.duration;
        })

        // Too many parameters, hard coding sport type as well
        let numLaps = 1;
        messages.push(this.createSession(this.startTime, this.timestamp, this.totalElapsedTime, this.totalTimerTime, numLaps, "cycling", "generic"));
        messages.push(this.createActivity(this.timestamp, this.localTimeStamp, this.totalTimerTime));
        
        return messages;
    }

}
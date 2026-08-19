import { Injectable } from '@angular/core';
import { Activity, DeveloperDataId, DeveloperFieldDescr, DeviceInfo, FileId, Lap, Messages, Record, Session, TimerEvent } from './message-fields';
import { LapData } from '../app';
import { Profile } from '@garmin/fitsdk/src/types/profile';
import { Utils } from '@garmin/fitsdk/src/types/utils';
import { FIELD_DEFAULTS } from './field-defaults.constants';

@Injectable()
export class MessageService {

    private createField<T extends Object>(defaults: T, overrides?: Partial<T>): T {
        return {...defaults, ...overrides};
    }

    createDeveloperDataId(): DeveloperDataId {
        return this.createField(FIELD_DEFAULTS.developerDataId());
    }

    createDeveloperFieldDescr(fieldName: string, units: string): DeveloperFieldDescr {
        return this.createField(FIELD_DEFAULTS.developerFieldDescr(fieldName, units));
    }

    createFileId(startTime: Date): FileId {
        return this.createField(FIELD_DEFAULTS.fileId(startTime));
    }

    createDeviceInfo(startTime: Date): DeviceInfo {
        return this.createField(FIELD_DEFAULTS.deviceInfo(startTime));
    }

    createTimerEvent(startTime: Date, eventType: string): TimerEvent {
        return this.createField(FIELD_DEFAULTS.timerEvent(startTime, eventType));
    }

    // Remove ambiguous "i" param
    createRecord(timestamp: Date, i: number): Record {
        return this.createField(FIELD_DEFAULTS.record(timestamp, i));
    }

    createLap(timestamp: Date, startTime: Date, totalElapsedTime: Date, totalTimerTime: Date): Lap {
        return this.createField(FIELD_DEFAULTS.lap(timestamp, startTime, totalElapsedTime, totalTimerTime));
    }

    createSession(startTime: Date, timestamp: Date, totalElapsedTime: Date, totalTimerTime: Date, numLaps: number, sport: string, subSport: string): Session {
        return this.createField(FIELD_DEFAULTS.session(startTime, timestamp, totalElapsedTime, totalTimerTime, numLaps, sport, subSport));
    }

    createActivity(timestamp: Date, localTimestamp: Date, totalTimerDate: Date): Activity {
        return this.createField(FIELD_DEFAULTS.activity(timestamp, localTimestamp, totalTimerDate));
    }

}
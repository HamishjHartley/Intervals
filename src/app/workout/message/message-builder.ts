import { Activity, DeveloperDataId, DeveloperFieldDescr, DeviceInfo, FileId, Lap, Messages, Record, Session, TimerEvent } from './message-fields';

// TODO: Remove - unused
export class MessageBuilder {

    private config: Partial<Messages> = {}

    setDeveloperDataId(developerDataId: DeveloperDataId): this {
        this.config.developerDataId = developerDataId;
        return this;
    };

    setdeveloperFieldDescr(developerFieldDescr: DeveloperFieldDescr): this {
        this.config.developerFieldDescr = developerFieldDescr;
        return this;
    };

    setFileId(fileId: FileId): this {
        this.config.fileId = fileId;
        return this;
    };

    setDeviceInfo(deviceInfo: DeviceInfo): this {
        this.config.deviceInfo = deviceInfo;
        return this;
    };

    setTimerEvent(timerEvent: TimerEvent): this {
        this.config.timerEvent = timerEvent;
        return this;
    };

    setRecord(record: Record): this {
        this.config.record = record;
        return this;
    };

    setLap(lap: Lap): this {
        this.config.lap = lap;
        return this;
    };
    
    setSession(session: Session): this {
        this.config.session = session;
        return this;
    };

    setActivity(activity: Activity): this {
        this.config.activity = activity;
        return this;
    };

    build(): Messages {
        return {
            developerDataId: this.config.developerDataId,
            developerFieldDescr: this.config.developerFieldDescr,
            fileId: this.config.fileId ?? {},
            deviceInfo: this.config.deviceInfo,
            timerEvent: this.config.timerEvent,
            record: this.config.record ?? {},
            lap: this.config.lap ?? {},
            session: this.config.session ?? {},
            activity: this.config.activity ?? {}
        };
    };
}
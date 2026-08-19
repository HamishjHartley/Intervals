export interface DeveloperDataId {
    mesgNum: number;
    applicationId: any[];
    applicationVersion: number;
    developerDataIndex: number;
};

export interface DeveloperFieldDescr {
    mesgNum: number;
    developerDataIndex: number;
    fieldDefinitionNumber: number;
    fitBaseTypeId: number;
    fieldName: string;
    units: string;
    nativeMesgNum: number;
};

export interface FileId {
    mesgNum: number;
    type: string;
    manufacturer: string;
    product: number;
    timeCreated: Date;
    serialNumber: number;
};

export interface DeviceInfo {
    mesgNum: number;
    deviceIndex: string;
    manufacturer: string;
    product: number;
    productName: string;
    serialNumber: number;
    softwareVersion: number;
    timestamp: Date;
};

export interface TimerEvent {
    mesgNum: number;
    timestamp: Date;
    event: string;
    eventType: string;
};

export interface Record {
    mesgNum: number;
    timestamp: Date;
    distance: number; 
    enhancedSpeed: number; 
    heartRate: number;
    cadence: number;
    power: number;
    enhancedAltitude: number;
    positionLat: number;
    positionLong: number;
    developerFields?: {};
};

export interface Lap {
    mesgNum: number;
    messageIndex: number;
    timestamp: Date;
    startTime: Date;
    totalElapsedTime: Date;
    totalTimerTime: Date;
};

export interface Session {
    mesgNum: number;
    messageIndex: number;
    timestamp: Date;
    startTime: Date;
    totalElapsedTime: Date;
    totalTimerTime: Date
    sport: string;
    subSport: string;
    firstLapIndex: number;
    numLaps: number
    developerFields?: {};
};

export interface Activity {
    mesgNum: number;
    timestamp: Date; 
    numSessions: number;
    localTimestamp: Date;
    totalTimerDate: Date;
};

export interface Messages {
    developerDataId?: DeveloperDataId;
    developerFieldDescr?: DeveloperFieldDescr;
    fileId: FileId | {};
    deviceInfo?: DeviceInfo;
    timerEvent?: TimerEvent;
    record: Record | {};
    lap: Lap | {};
    session: Session | {};
    activity: Activity | {};
};
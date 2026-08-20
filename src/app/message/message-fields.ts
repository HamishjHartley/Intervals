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
    timeCreated: number;
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
    timestamp: number;
};

export interface TimerEvent {
    mesgNum: number;
    timestamp: number;
    event: string;
    eventType: string;
};

export interface Record {
    mesgNum: number;
    timestamp: number;
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
    timestamp: number;
    startTime: number;
    totalElapsedTime: number;
    totalTimerTime: number;
};

export interface Session {
    mesgNum: number;
    messageIndex: number;
    timestamp: number;
    startTime: number;
    totalElapsedTime: number;
    totalTimerTime: number
    sport: string;
    subSport: string;
    firstLapIndex: number;
    numLaps: number
    developerFields?: {};
};

export interface Activity {
    mesgNum: number;
    timestamp: number; 
    numSessions: number;
    localTimestamp: number;
    totalTimerTime: number;
};

export interface MessageField {
    messageField: [ DeveloperDataId | FileId | DeviceInfo | TimerEvent | Record | Lap | Activity | Session ];
}


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


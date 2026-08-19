export interface DeveloperDataId {
    msgNum: number,
    applicationId: [],
    applicationVersion: number,
    developerDataIndex: number
};

export interface DeveloperFieldDescr {
    msgNum: number,
    developerDataIndex: number,
    fieldDefinitionNumber: number,
    fitBaseTypeId: Float32Array,
    fieldName: string,
    units: string,
    nativeMsgNum: number
};

export interface FileId {
    mesgNum: number,
    type: string,
    manufacturer: string,
    product: number,
    timeCreated: Date,
    serialNumber: number
};

export interface DeviceInfo {
    mesgNum: number,
    deviceIndex: string,
    manufacturer: string,
    product: number,
    productName: string,
    serialNumber: number,
    softwareVersion: number,
    timeStamp: Date
};

export interface TimerEvent {
    mesgNum: number,
    timestamp: Date,
    event: string,
    eventType: string
};

export interface Record {
    mesgNum: number,
    timestamp: Date,
    distance: number, 
    enhancedSpeed: number, 
    heartRate: number,
    cadence: number,
    power: number,
    enhancedAltitude: number,
    positionLat: number,
    positionLong: number,
    developerFields?: {}
};

export interface Lap {
    mesgNum: number,
    messageIndex: number,
    timestamp: Date,
    startTime: Date,
    totalElapsedTime: Date,
    totalTimerTime: Date
};

export interface Session {
    mesgNum: number,
    messageIndex: number,
    timestamp: Date,
    startTime: Date,
    totalElapsedTime: Date,
    totalTimerTime: Date
    sport: string,
    subSport: string,
    firstLapIndex: number,
    numLaps: number
    developerFields?: {}
};

export interface Activity {
    mesgNum: number,
    timestamp: Date, 
    numSessions: number,
    localTimestamp: Date,
    totalTimerDate: Date
};
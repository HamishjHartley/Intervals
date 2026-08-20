export interface DeveloperDataId {
    mesgNum: number;
    applicationId: any[]; // Establish concrete type!
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

export interface Workout {
    /*
    sport: enum;
    subSport?: enum;
    capabilities: enum; 	// Workout capability flags
    numValidSteps: uint16;	// Count of WorkoutStep messages belonging to this workout
    wktName: string;	// Display name
    poolLength: uint16;	// Only relevant for swim workouts
    poolLengthUnit:enum; //Only relevant for swim workouts
    */
};

export interface WorkoutStep {
/*
messageIndex	uint16	Step index — used by repeat steps to reference earlier steps
wktStepName	string	Display name for the step
durationType	enum	time, distance, open, repeatUntilStepsCmplt, etc.
durationValue	uint32	Dynamic field — meaning depends on durationType (see below)
targetType	enum	speed, heartRate, cadence, power, open, etc.
targetValue	uint32	Dynamic field — meaning depends on targetType
customTargetValueLow	uint32	Lower bound when using a custom (non-zone) target range
customTargetValueHigh	uint32	Upper bound when using a custom target range
intensity	enum	active, rest, warmup, cooldown, recovery, interval, other
notes	string	Free-text notes
equipment	enum	e.g. swim equipment
exerciseCategory	uint16	For strength-training style steps
exerciseName	uint16	Paired with exerciseCategory
exerciseWeight	uint16	For strength-training style steps
weightDisplayUnit	enum	Paired with exerciseWeight
secondaryTargetType	enum	Optional second target dimension
secondaryTargetValue	uint32	Dynamic, paired with secondaryTargetType
secondaryCustomTargetValueLow	uint32	Paired with secondary target
secondaryCustomTargetValueHigh	uint32	Paired with secondary target
*/
}

export type ActivityMessageField = DeveloperDataId | FileId | DeviceInfo | TimerEvent | Record | Lap | Activity;

export type WorkoutMessageField = FileId | Workout | WorkoutStep;

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


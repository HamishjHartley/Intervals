import { Types } from '@garmin/fitsdk';

// TODO: Add Types constants where required, i.e. for sport field
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
    mesgNum: number;
    messageIndex?: Types.MessageIndex;
    sport?: Types.Sport;
    capabilities?: Types.WorkoutCapabilities;
    /** number of valid steps */
    numValidSteps?: Types.Uint16;
    wktName?: Types.String;
    subSport?: Types.SubSport;
    poolLength?: Types.Float64;
    poolLengthUnit?: Types.DisplayMeasure;
    /** Description of the workout */
    wktDescription?: Types.String;
};

export interface WorkoutSession {
    mesgNum: number;
    messageIndex?: Types.MessageIndex;
    sport?: Types.Sport;
    subSport?: Types.SubSport;
    numValidSteps?: number;
    firstStepIndex?: number;
    poolLength?: Types.Float64;
    poolLengthUnit?: Types.DisplayMeasure;
};

export interface WorkoutStep {
    mesgNum: number;
    messageIndex?: Types.MessageIndex;
    wktStepName?: Types.String;
    durationType?: Types.WktStepDuration;
    durationValue?: Types.Uint32; 
    durationTime?: Types.Float64; 
    durationDistance?: Types.Float64; 
    durationHr?: Types.WorkoutHr; 
    durationCalories?: Types.Uint32;
    /** message_index of step to loop back to. Steps are assumed to be in the order by message_index. custom_name and intensity members are undefined for this duration type.*/ 
    durationStep?: Types.Uint32; 
    durationPower?: Types.WorkoutPower; 
    durationReps?: Types.Uint32;
    targetType?: Types.WktStepTarget;
    targetValue?: Types.Uint32;
    /** speed zone (1-10);Custom =0;*/ 
    targetSpeedZone?: Types.Uint32;
    /** hr zone (1-5);Custom =0;*/ 
    targetHrZone?: Types.Uint32;
    /** Zone (1-?); Custom = 0;*/ 
    targetCadenceZone?: Types.Uint32;
    /** Power Zone ( 1-7); Custom = 0;*/ 
    targetPowerZone?: Types.Uint32;
    /** # of repetitions*/ 
    repeatSteps?: Types.Uint32; 
    repeatTime?: Types.Float64; 
    repeatDistance?: Types.Float64; 
    repeatCalories?: Types.Uint32; 
    repeatHr?: Types.WorkoutHr; 
    repeatPower?: Types.WorkoutPower; 
    targetStrokeType?: Types.SwimStroke;
    customTargetValueLow?: Types.Uint32; 
    customTargetSpeedLow?: Types.Float64; 
    customTargetHeartRateLow?: Types.WorkoutHr; 
    customTargetCadenceLow?: Types.Uint32; 
    customTargetPowerLow?: Types.WorkoutPower;
    customTargetValueHigh?: Types.Uint32; 
    customTargetSpeedHigh?: Types.Float64; 
    customTargetHeartRateHigh?: Types.WorkoutHr; 
    customTargetCadenceHigh?: Types.Uint32; 
    customTargetPowerHigh?: Types.WorkoutPower;
    intensity?: Types.Intensity;
    notes?: Types.String;
    equipment?: Types.WorkoutEquipment;
    exerciseCategory?: Types.ExerciseCategory;
    exerciseName?: Types.Uint16;
    exerciseWeight?: Types.Float64;
    weightDisplayUnit?: Types.FitBaseUnit;
    secondaryTargetType?: Types.WktStepTarget;
    secondaryTargetValue?: Types.Uint32;
    /** speed zone (1-10);Custom =0;*/ 
    secondaryTargetSpeedZone?: Types.Uint32;
    /** hr zone (1-5);Custom =0;*/ 
    secondaryTargetHrZone?: Types.Uint32;
    /** Zone (1-?); Custom = 0;*/ 
    secondaryTargetCadenceZone?: Types.Uint32;
    /** Power Zone ( 1-7); Custom = 0;*/ 
    secondaryTargetPowerZone?: Types.Uint32; 
    secondaryTargetStrokeType?: Types.SwimStroke;
    secondaryCustomTargetValueLow?: Types.Uint32; 
    secondaryCustomTargetSpeedLow?: Types.Float64; 
    secondaryCustomTargetHeartRateLow?: Types.WorkoutHr; 
    secondaryCustomTargetCadenceLow?: Types.Uint32; 
    secondaryCustomTargetPowerLow?: Types.WorkoutPower;
    secondaryCustomTargetValueHigh?: Types.Uint32; 
    secondaryCustomTargetSpeedHigh?: Types.Float64; 
    secondaryCustomTargetHeartRateHigh?: Types.WorkoutHr; 
    secondaryCustomTargetCadenceHigh?: Types.Uint32; 
    secondaryCustomTargetPowerHigh?: Types.WorkoutPower;
};

export type ActivityMessageField = DeveloperDataId | FileId | DeviceInfo | TimerEvent | Record | Lap | Activity;

export type WorkoutMessageField = FileId | Workout | WorkoutSession | WorkoutStep;

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


import { Profile, Types, Utils } from '@garmin/fitsdk';
import { DeveloperDataId, DeveloperFieldDescr, DeviceInfo, FileId, TimerEvent, Record, Lap, Session, Activity, Workout, WorkoutSession, WorkoutStep } from './message-fields';

export const FIELD_DEFAULTS = {
    // -- ACTIVITY RELATED CONFIGURATION --
  developerDataId: (): DeveloperDataId => ({
    mesgNum: Profile.MesgNum.DEVELOPER_DATA_ID,
    applicationId: Array(16).fill(0),
    applicationVersion: 1,
    developerDataIndex: 0,
  }),

  developerFieldDescr: (fieldName: string, units: string): DeveloperFieldDescr => ({
    mesgNum: Profile.MesgNum.FIELD_DESCRIPTION,
    developerDataIndex: 0,
    fieldDefinitionNumber: 0,
    fitBaseTypeId: Utils.FitBaseType.UINT8,
    fieldName: fieldName,
    units: units,
    nativeMesgNum: Profile.MesgNum.SESSION,
  }),

  fileId: (startTime: number, type: string): FileId => ({
    mesgNum: Profile.MesgNum.FILE_ID,
    type: type,
    manufacturer: 'development',
    product: 0,
    timeCreated: startTime,
    serialNumber: 1234,
  }),

  deviceInfo: (startTime: number): DeviceInfo => ({
    mesgNum: Profile.MesgNum.DEVICE_INFO,
    deviceIndex: 'creator',
    manufacturer: 'development',
    product: 0,
    productName: 'FIT Cookbook',
    serialNumber: 1234,
    softwareVersion: 12.34,
    timestamp: startTime,
  }),

  timerEvent: (startTime: number, eventType: string): TimerEvent => ({
    mesgNum: Profile.MesgNum.EVENT,
    timestamp: startTime,
    event: "timer",
    eventType: eventType,
  }),

  // TODO: Remove this hardcoded logic
  record: (timestamp: number, i: number): Record => ({
    mesgNum: Profile.MesgNum.RECORD,
    timestamp: timestamp,
    distance: i, // Ramp
    enhancedSpeed: 1, // Flat Line
    heartRate: (Math.sin(Math.PI * 2.0 * (0.01 * i + 10)) + 1.0) * 127.0, // Sine
    cadence: i % 255, // Sawtooth
    power: (i % 255) < 127 ? 150 : 250, // Square
    enhancedAltitude: Math.abs((i % 255) - 127), // Triangle
    positionLat: (Math.sin(Math.PI * 2.0 * (0.01 * i + 10)) + 1.0) * 5000.0, // Flat Line
    positionLong: i * 107.173, // Ramp
  }),

  lap: (messageIndex: number, timestamp: number, startTime: number, totalElapsedTime: number, totalTimerTime: number): Lap => ({
    mesgNum: Profile.MesgNum.LAP,
    messageIndex: messageIndex,
    timestamp: timestamp,
    startTime: startTime,
    totalElapsedTime: totalElapsedTime,
    totalTimerTime: totalTimerTime,
  }),

  session: (startTime: number, timestamp: number, totalElapsedTime: number, totalTimerTime: number, numLaps: number, sport: string, subSport: string): Session => ({
    mesgNum: Profile.MesgNum.SESSION,
    messageIndex: 0,
    timestamp: timestamp,
    startTime: startTime,
    totalElapsedTime: totalElapsedTime,
    totalTimerTime: totalTimerTime,
    sport: sport,
    subSport: subSport,
    firstLapIndex: 0,
    numLaps: numLaps,
  }),

  activity: (timestamp: number, localTimestamp: number, totalTimerTime: number): Activity => ({
    mesgNum: Profile.MesgNum.ACTIVITY,
    timestamp: timestamp,
    numSessions: 1,
    localTimestamp: localTimestamp,
    totalTimerTime: totalTimerTime,
  }),

  // -- WORKOUT RELATED CONFIGURATION --
  // Not including all fields in default configuration - For now
  workout: (sport: Types.Sport, capabilities: Types.WorkoutCapabilities, numValidSteps: Types.Uint16, wktName: string): Workout => ({
    mesgNum: Profile.MesgNum.WORKOUT,
    sport: sport,
    capabilities: capabilities,
    numValidSteps: numValidSteps,
    wktName: wktName,
  }),

  workoutSession: (messageIndex: Types.MessageIndex, sport: Types.Sport, numValidSteps: number, firstStepIndex: number): WorkoutSession => ({
    mesgNum: Profile.MesgNum.WORKOUT_SESSION,
    messageIndex: messageIndex,
    sport: sport,
    numValidSteps: numValidSteps,
    firstStepIndex: firstStepIndex,
  }),

  WorkoutStep: (messageIndex: Types.MessageIndex, wktStepName: string, durationType: Types.WktStepDuration, durationTime: Types.Float64, targetType: Types.WktStepTarget, intensity: Types.Intensity): WorkoutStep => ({
    mesgNum: Profile.MesgNum.WORKOUT_STEP,
    messageIndex: messageIndex,
    wktStepName: wktStepName,
    durationType: durationType,
    durationTime: durationTime,
  }),

} as const;
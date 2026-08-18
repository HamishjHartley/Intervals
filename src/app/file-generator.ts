
import { DeveloperDataIdMesg, FieldDescriptionMesg } from './../../node_modules/@garmin/fitsdk/src/types/mesgs.d';
import { Service } from '@angular/core';
import * as fs from "fs";
import { Encoder, Profile, Utils } from "@garmin/fitsdk";
import { LapData } from "./app";

@Service()
export class FileGenerator {

    // creates and populated messages array
    createFIT() {
        const POWER_KEY = 1;
        const twoPI = Math.PI * 2.0;
        const mesgs = [];

        const developerDataIdMesg = {
            mesgNum: Profile.MesgNum.DEVELOPER_DATA_ID,
            applicationId: Array(16).fill(0), // In practice, this should be a UUID converted to a byte array
            applicationVersion: 1,
            developerDataIndex: 0,
        };
        mesgs.push(developerDataIdMesg);

        const powerFieldDescMesg = {
            mesgNum: Profile.MesgNum.FIELD_DESCRIPTION,
            developerDataIndex: 0,
            fieldDefinitionNumber: 0,
            fitBaseTypeId: Utils.FitBaseType.UINT16,
            fieldName: "Power",
            units: "watts",
            nativeMesgNum: Profile.MesgNum.SESSION,
        };
        mesgs.push(powerFieldDescMesg)

        const fieldDescriptions = {
            [POWER_KEY]: {
                developerDataIdMesg: developerDataIdMesg,
                fieldDescriptionMesg: powerFieldDescMesg
            }
        };

        // The starting timestamp for the activity
        const now = new Date();
        const localTimestampOffset = now.getTimezoneOffset() * -60;
        const startTime = Utils.convertDateToDateTime(now);
        
        // File ID message
        mesgs.push({
            mesgNum: Profile.MesgNum.FILE_ID,
            type: "activity",
            manufacturer: "development",
            product: 0,
            timeCreated: startTime,
            serialNumber: 1234,
        });

        // Device Info message 
        mesgs.push({
            mesgNum: Profile.MesgNum.DEVICE_INFO,
            deviceIndex: "creator",
            manufacturer: "development",
            product: 0,
            productName: "FIT Cookbook",
            serialNumber: 1234,
            softwareVersion: 12.34,
            timestamp: startTime,
        });

        // SART Timer event
        mesgs.push({
            mesgNum: Profile.MesgNum.EVENT,
            timestamp: startTime,
            event: "timer",
            eventType: "start",
        });

        // Every FIT ACTIVITY file MUST contain Record messages
        let timestamp = startTime;

        for (let i = 0; i <= 3600; i++) {
            mesgs.push({
                mesgNum: Profile.MesgNum.RECORD,
                timestamp: timestamp,
                distance: i, // Ramp
                enhancedSpeed: 1, // Flat Line
                cadence: i % 255, // Sawtooth
                power: (i % 255) < 127 ? 150 : 250, // Square

                // Add a Developer Field to the Record Message
                developerFields: {
                    [POWER_KEY]: (Math.cos(twoPI * (0.01 * i + 10)) + 1.0) * 127.0, // Cosine
                },
        });

        timestamp++;
        }
        
        // STOP Timer event
        mesgs.push({
            mesgNum: Profile.MesgNum.EVENT,
            timestamp: timestamp,
            event: "timer",
            eventType: "stop",
        });

        // Every FIT ACTIVITY file MUST contain at least one Lap message
        mesgs.push({
            mesgNum: Profile.MesgNum.LAP,
            messageIndex: 0,
            timestamp: timestamp,
            startTime: startTime,
            totalElapsedTime: timestamp - startTime,
            totalTimerTime: timestamp - startTime,
        });

        // Every FIT ACTIVITY file MUST contain at least one Session message
        mesgs.push({
            mesgNum: Profile.MesgNum.SESSION,
            messageIndex: 0,
            timestamp: timestamp,
            startTime: startTime,
            totalElapsedTime: timestamp - startTime,
            totalTimerTime: timestamp - startTime,
            sport: "cycling",
            subSport: "generic",
            firstLapIndex: 0,
            numLaps: 5,

            // Add a Developer Field to the Session Message
            developerFields: {
            [POWER_KEY]: (timestamp - startTime) / 1200.0, // Three per hour
            },
        });

        // Every FIT ACTIVITY file MUST contain EXACTLY one Activity message
        mesgs.push({
            mesgNum: Profile.MesgNum.ACTIVITY,
            timestamp: timestamp,
            numSessions: 1,
            localTimestamp: timestamp + localTimestampOffset,
            totalTimerTime: timestamp - startTime,
        });

        const encoder = new Encoder({ fieldDescriptions, });

        // Write each message to the encoder
        mesgs.forEach((mesg) => {
            encoder.writeMesg(mesg);
        });

        // Close the encoder
        const uint8Array = encoder.close();
        return uint8Array;
    }

    downloadFile() {
        const data = new Uint8Array(this.createFIT()).buffer; // Forces a plain ArrayBuffer
        const blob = new Blob([data], { type: 'application/octet-stream'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Test FIT file.fit";
        a.click();
        URL.revokeObjectURL(url);
    }

}

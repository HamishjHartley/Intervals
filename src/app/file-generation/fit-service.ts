import { Injectable, Service } from '@angular/core';
import { Encoder} from "@garmin/fitsdk";
import { DeveloperDataId, FileId, DeviceInfo, TimerEvent, Lap, Activity, Record, MessageField } from '../message/message-fields';

@Service()
export class FitService {

    // Fix messages type lol
    encodeMessages(messages: MessageField[]): Uint8Array<ArrayBufferLike> {
        const encoder = new Encoder({ });

        messages.forEach((message) => {
            encoder.writeMesg(message);
        });
        return encoder.close();
    }

    downloadFile(encodedMessages: Uint8Array<ArrayBufferLike>) {
        const data = new Uint8Array(encodedMessages).buffer; // Forces a plain ArrayBuffer
        const blob = new Blob([data], { type: 'application/octet-stream'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Test FIT file.fit";
        a.click();
        URL.revokeObjectURL(url);
    }

}
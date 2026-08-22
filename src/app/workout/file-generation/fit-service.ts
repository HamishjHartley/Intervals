import { Service } from '@angular/core';
import { Encoder} from "@garmin/fitsdk";
import { ActivityMessageField, WorkoutMessageField } from '../message/message-fields';

@Service()
export class FitService {

    encodeMessages(messages: ActivityMessageField[] | WorkoutMessageField[]): Uint8Array<ArrayBufferLike> {
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
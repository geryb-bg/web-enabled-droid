/// <reference path='./types/droid.d.ts' />

export class Droid {

    constructor(gattProfile, controlChar) {
        this.sequence = 0;
        this.gattProfile = gattProfile;
        this.controlChar = controlChar;
        this.colour = "";
    }

    setColour(red, green, blue) {
        let commandId = 0x20;
        let data = new Uint8Array([red, green, blue, 0]); //TODO: what was the last value?
        this.writeValueToChar(commandId, data);
    }

    roll(speed, direction) {
        let commandId = 0x30;
        // Roll command data: speed, direction (MSB), direction (LSB), state
        let data = new Uint8Array([speed, direction >> 8, direction & 0xFF, 1]);
        this.writeValueToChar(commandId, data);
    }

    stop() {
        let commandId = 0x30;
        let data = new Uint8Array([0, 0, 0, 0]);
        this.writeValueToChar(commandId, data);
    }

    writeValueToChar(commandId, data) {
        const deviceId = 0x02;
        const dataLength = data.byteLength + 1;

        const sum = data.reduce((a, b) => {
            return a + b;
        });

        const seq = this.sequence & 255;
        this.sequence += 1

        let chk = (sum + deviceId + commandId + seq + dataLength) & 255;
        chk ^= 255;
        let checksum = new Uint8Array([chk]);

        let packets = new Uint8Array([0xff, 0xff, deviceId, commandId, seq, dataLength]);

        let array = new Uint8Array(packets.byteLength + data.byteLength + checksum.byteLength);
        array.set(packets, 0);
        array.set(data, packets.byteLength);
        array.set(checksum, packets.byteLength + data.byteLength);

        this.controlChar.writeValue(array).then(_ => console.log("Command Sent!"));
    }
}
import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Droid } from './droid';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DroidControlService {

  private radioService: string = '22bb746f-2bb0-7554-2d6f-726568705327';
  private antiDosCharacteristic: string = '22bb746f-2bbd-7554-2d6f-726568705327';
  private txPowerCharacteristic: string = '22bb746f-2bb2-7554-2d6f-726568705327';
  private wakeCpuCharacteristic: string = '22bb746f-2bbf-7554-2d6f-726568705327';

  private controlService: string = '22bb746f-2ba0-7554-2d6f-726568705327';
  private controlCharacteristic: string = '22bb746f-2ba1-7554-2d6f-726568705327';
  private sequence: number = 0;

  constructor(private ble: BluetoothCore) { }

  connectToDroid(): Observable<BluetoothRemoteGATTServer | void> {
    return this.ble.discover$({ 
      filters: [{ 
        namePrefix: 'BB' 
      }], 
      optionalServices: [
        this.radioService, 
        this.controlService
      ] 
    });
  }

  enableDevMode(gattServer: BluetoothRemoteGATTServer): Observable<void> {
    return this.ble.getPrimaryService$(gattServer, this.radioService)
      .mergeMap(radioPrimaryService => {
        return this.ble.getCharacteristic$(radioPrimaryService, this.antiDosCharacteristic)
          .mergeMap(characteristic => {
            let gattChar = characteristic as BluetoothRemoteGATTCharacteristic;
            let bytes = new Uint8Array('011i3'.split('').map(c => c.charCodeAt(0)));
            return this.ble.writeValue$(gattChar, bytes);
          })
          .mergeMap(_ => this.ble.getCharacteristic$(radioPrimaryService, this.txPowerCharacteristic))
          .mergeMap(characteristic => {
            let gattChar = characteristic as BluetoothRemoteGATTCharacteristic;
            let array = new Uint8Array([0x07]);
            return this.ble.writeValue$(gattChar, array);
          })
          .mergeMap(_ => this.ble.getCharacteristic$(radioPrimaryService, this.wakeCpuCharacteristic))
          .mergeMap(characteristic => {
            let gattChar = characteristic as BluetoothRemoteGATTCharacteristic;
            let array = new Uint8Array([0x01]);
            return this.ble.writeValue$(gattChar, array);
          });
      });
  }

  getPrimaryService(gattServer: BluetoothRemoteGATTServer): Observable<Droid> {
    return this.ble.getPrimaryService$(gattServer, this.controlService)
      .mergeMap(controlPrimaryService => {
        return this.ble.getCharacteristic$(controlPrimaryService, this.controlCharacteristic);
      })
      .map(characteristic => {
        let gattChar = characteristic as BluetoothRemoteGATTCharacteristic;
        return {
          gattServer: gattServer,
          controlCharacteristic: gattChar,
          colour: ''
        }
      });
  }

  setColor(r: number, g: number, b: number, primaryChar: BluetoothRemoteGATTCharacteristic) {
    let cid = 0x20; // Set RGB LED Output command
    let data = new Uint8Array([r, g, b, 0]); // Color command data: red, green, blue, flag
    this.writeToChar(cid, data, primaryChar);
  }

  //only works once deployed
  roll(direction: number, primaryChar: BluetoothRemoteGATTCharacteristic) {
    let cid = 0x30; // Roll command
    // Roll command data: speed, direction (MSB), direction (LSB), state
    let data = new Uint8Array([100, direction >> 8, direction & 0xFF, 1]);
    this.writeToChar(cid, data, primaryChar);
  }

  //only works once deployed
  stop(primaryChar: BluetoothRemoteGATTCharacteristic) {
    let cid = 0x30; // Roll command
    // Roll command data: speed, direction (MSB), direction (LSB), state
    let data = new Uint8Array([0, 0, 0, 0]);
    this.writeToChar(cid, data, primaryChar);
  }

  private writeToChar(cid: number, data: Uint8Array, primaryChar: BluetoothRemoteGATTCharacteristic) {
    let did = 0x02;
    let seq = this.sequence & 255;
    this.sequence += 1
    // Start of packet #2
    let sop2 = 0xfc;
    sop2 |= 1; // Answer
    sop2 |= 2; // Reset timeout
    // Data length
    let dlen = data.byteLength + 1;
    let sum = data.reduce((a, b) => {
      return a + b;
    });
    // Checksum
    let chk = (sum + did + cid + seq + dlen) & 255;
    chk ^= 255;
    let checksum = new Uint8Array([chk]);
    let packets = new Uint8Array([0xff, sop2, did, cid, seq, dlen]);
    // Append arrays: packet + data + checksum
    let array = new Uint8Array(packets.byteLength + data.byteLength + checksum.byteLength);
    array.set(packets, 0);
    array.set(data, packets.byteLength);
    array.set(checksum, packets.byteLength + data.byteLength);

    this.ble.writeValue$(primaryChar, array).subscribe();
  }
}
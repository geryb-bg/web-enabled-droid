import { Component, OnInit } from '@angular/core';
import { DroidControlService } from '../droid-control.service';
import { Droid } from '../droid';

@Component({
  selector: 'app-drive-bb8',
  templateUrl: './drive-bb8.component.html',
  styleUrls: ['./drive-bb8.component.css']
})
export class DriveBb8Component implements OnInit {

  droids: Droid[];

  constructor(private droidControl: DroidControlService) {
    this.droids = [];
  }

  ngOnInit() {
  }

  connectToBB8() {
    this.droidControl.connectToDroid().subscribe(gatt => {
      let gattServer = gatt as BluetoothRemoteGATTServer;
      this.droidControl.enableDevMode(gattServer).subscribe(_ => {
        this.droidControl.getPrimaryService(gattServer).subscribe((droid) => {
          this.droids.push(droid);
          console.log("connected");
        });
      });
    });
  }

  setColor(color, droid) {
    switch (color) {
      case 'r': 
        this.droidControl.setColor(250, 0, 0, droid.controlCharacteristic);
        droid.colour = "red";
        break;
      case 'g': 
        this.droidControl.setColor(0, 250, 0, droid.controlCharacteristic);
        droid.colour = "green";
        break;
      case 'b': 
        this.droidControl.setColor(0, 0, 250, droid.controlCharacteristic);
        droid.colour = "blue";
        break;
    }
  }

  move(direction, droid) {
    this.droidControl.roll(direction, droid.controlCharacteristic);
  }

  stop(droid) {
    this.droidControl.stop(droid.controlCharacteristic);
  }
}

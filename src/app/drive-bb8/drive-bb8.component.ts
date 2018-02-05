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
      this.droidControl.enableDevMode(gattServer);
      this.droidControl.getPrimaryService(gattServer).subscribe((droid) => {
        this.droids.push(droid);
        console.log("connected");
      });
    });
  }

  setColor(color, droid) {
    debugger;
    switch (color) {
      case 'r': this.droidControl.setColor(250, 0, 0, droid.colorCharacteristic);
      break;
      case 'g': this.droidControl.setColor(0, 250, 0, droid.colorCharacteristic);
      break;
      case 'b': this.droidControl.setColor(0, 0, 250, droid.colorCharacteristic);
      break;
    }
  }
}

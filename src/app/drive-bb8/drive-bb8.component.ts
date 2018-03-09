import { Component, OnInit } from '@angular/core';
import { DroidControlService } from '../droid-control.service';

import { Droid } from '../../lib/droid';

@Component({
  selector: 'app-drive-bb8',
  templateUrl: './drive-bb8.component.html',
  styleUrls: ['./drive-bb8.component.css']
})
export class DriveBb8Component implements OnInit {

  droids: Droid[];
  speed: number = 100;

  constructor(private droidControl: DroidControlService) {
  }

  ngOnInit() {
    this.droids = [];
  }

  connectToBB8() {
    this.droidControl.connectToDroid().then(droid => {
      this.droids.push(droid);
    });
  }

  setColor(color, droid) {
    switch (color) {
      case 'r': 
        droid.setColour(255, 0, 0);
        droid.colour = "red";
        break;
      case 'g': 
        droid.setColour(0, 255, 0);
        droid.colour = "green";
        break;
      case 'b': 
        droid.setColour(0, 0, 255);
        droid.colour = "blue";
        break;
    }
  }

  droidIs(stringColour, droidColour) {
    if (stringColour === droidColour) {
      return droidColour;
    }

    return "";
  }

  move(direction, droid) {
    droid.roll(this.speed, direction);
  }

  stop(droid) {
    droid.stop();
  }
}

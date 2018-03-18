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
        droid.setColour(255, 0, 0).then(_ => droid.colour = "red");
        break;
      case 'g':
        droid.setColour(0, 255, 0).then(_ => droid.colour = "green");
        break;
      case 'b':
        droid.setColour(0, 0, 255).then(_ => droid.colour = "blue");
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
    if (droid.currentDir !== direction) {
      droid.roll(direction);
    } else {
      console.log("We're already going that way!!!")
    }
  }

  stop(droid) {
    if (droid.currentDir >= 0) {
      droid.stop().then(_ => {
        droid.currentDir = -1;
      });
    }
  }

  setHeading(droid) {
    droid.setHeading().then(_ => {
      droid.heading = 0;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DroidControlService } from '../droid-control.service';

import { Droid } from '../../lib/droid';

@Component({
  selector: 'app-drive-bb8',
  templateUrl: './drive-bb8.component.html',
  styleUrls: ['./drive-bb8.component.css']
})
export class DriveBb8Component implements OnInit {

  private resolution = {
    width: { exact: 1920 },
    height: { exact: 1080 }
  };
  videoAdded: boolean;
  showVideo: boolean;

  droids: Droid[];

  constructor(private droidControl: DroidControlService) {
    this.showVideo = false;
  }

  ngOnInit() {
    this.droids = [];
  }

  addVideoElement() {
    this.videoAdded = true;
    const video: any = document.getElementById("video");

    navigator.mediaDevices
      .getUserMedia({ video: this.resolution, audio: false })
      .then(function (s) {
        video.srcObject = s;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occured! " + err);
      });
  }

  connectToBB8() {
    this.droidControl.connectToDroid().then(droid => {
      this.droids.push(droid);
      console.log(this.showVideo);
      if (this.showVideo && !this.videoAdded) {
        this.addVideoElement();
      }
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

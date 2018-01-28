import { Component, OnInit } from '@angular/core';
import { DroidControlService } from '../droid-control.service';

@Component({
  selector: 'app-drive-bb8',
  templateUrl: './drive-bb8.component.html',
  styleUrls: ['./drive-bb8.component.css']
})
export class DriveBb8Component implements OnInit {

  constructor(private droidControl: DroidControlService) { }

  ngOnInit() {
  }

  connectToBB8() {
    this.droidControl.connectToDroid();
  }

  setColor(color) {
    switch (color) {
      case 'r': this.droidControl.setColor(250, 0, 0);
      break;
      case 'g': this.droidControl.setColor(0, 250, 0);
      break;
      case 'b': this.droidControl.setColor(0, 0, 250);
      break;
    }
  }
}

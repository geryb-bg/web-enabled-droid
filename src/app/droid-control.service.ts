import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Observable } from 'rxjs/Observable';

import { Droid } from '../lib/droid';

import { connectToDroid, getDroid } from '../lib/connect.js';

@Injectable()
export class DroidControlService {

  connectToDroid() {
    let gattProfile;

    return connectToDroid()
      .then(gatt => {
        gattProfile = gatt;
        return getDroid(gatt);
      })
      .then(controlChar => new Droid(gattProfile, controlChar));
  }
}
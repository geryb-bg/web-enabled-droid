import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Droid } from '../lib/droid';

import { connectToDroid, getControlChar } from '../lib/connect.js';

@Injectable()
export class DroidControlService {

  connectToDroid() {
    let gattProfile;

    return connectToDroid()
      .then(gatt => {
        gattProfile = gatt;
        return getControlChar(gatt);
      })
      .then(controlChar => new Droid(gattProfile, controlChar));
  }
}
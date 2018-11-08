import React, { Component } from 'react';
import './App.css';

import { connectToDroid, getControlChar } from './lib/connect.js';
import { DroidCard } from './DroidCard.js'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Droid } from './lib/droid';

class App extends Component {
  state = {
    droids: []
  }

  connectToBb8() {
    let gattProfile;

    connectToDroid().then(gatt => {
      gattProfile = gatt;
      return getControlChar(gatt);
    })
    .then(controlChar => {
      let droid = new Droid(gattProfile, controlChar)
      let droids = [...this.state.droids, droid];
      this.setState({ droids });
    });
  }

  render() {
    return (
      <div className="root">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className="grow">
              BB8 Driver
            </Typography>
            <Button variant="contained" color="primary" onClick={() => this.connectToBb8()}>
              Connect
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          {this.state.droids.map((droid) =>
            <DroidCard droid={droid} key={droid.gattProfile.device.name} />
          )}
        </div>
      </div>
    );
  }
}

export default App;

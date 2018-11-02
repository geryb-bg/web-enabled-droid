import React, { Component } from 'react';
import './App.css';

import { connectToDroid } from './lib/connect.js';
import { DroidCard } from './DroidCard.js'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';

class App extends Component {
  state = {
    droids: [],
    value: 0
  }

  connectToBb8() {
    connectToDroid().then(droid => {
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
            <Button color="primary" onClick={() => this.connectToBb8()}>
              Connect
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          {this.state.droids.map((droid) =>
            <DroidCard droid={droid} value={this.state.value} />
          )}
        </div>
      </div>
    );
  }
}

export default App;

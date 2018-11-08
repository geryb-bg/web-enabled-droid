import React, { Component } from 'react';

import { Button, Card, CardHeader, Avatar, CardContent, Tabs, Tab, Icon, CardActions, TextField, Snackbar } from '@material-ui/core';

export class DroidCard extends Component {
    state = {
        value: 0,
        speed: 60,
        direction: 0,
        open: false,
        invalidField: ""
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    setColour = (colour, droid) => {
        switch (colour) {
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

    move = (direction, droid) => {
        if (this.state.speed >= 50 && this.state.speed <= 250) {
            droid.speed = this.state.speed;
            if (droid.currentDir !== direction) {
                droid.roll(direction);
            } else {
                console.log("We're already going that way!!!")
            }
        } else {
            droid.speed = 60;
            this.setState({ speed: 60, open: true, invalidField: "Speed", value: 1 });
        }
    }

    stop = (droid) => {
        if (droid.currentDir >= 0) {
            droid.stop().then(_ => {
                droid.currentDir = -1;
            });
        }
    }

    changeSpeed = (event) => {
        this.setState({ speed: event.target.value })
    }

    changeDirection = (event) => {
        this.setState({ direction: event.target.value })
    }

    setDirection = (droid) => {
        if (this.state.direction >= 0 && this.state.direction < 360) {
            droid.heading = this.state.direction;
            droid.setHeading().then(_ => {
                droid.heading = 0;
                this.setState({ direction: 0 });
            });
        } else {
            droid.heading = 0;
            this.setState({ direction: 0, open: true, invalidField: "Direction" });
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false, invalidField: "" });
    };

    render() {
        let droid = this.props.droid;
        return (
            <div>
                <Card className="droid-card">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="BB-8 Droid">
                                <Icon>bluetooth_connected</Icon>
                            </Avatar>
                        }
                        title={droid.gattProfile.device.name}
                        subheader="Connected"
                    />
                    <CardContent>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label="Drive" />
                            <Tab label="Settings" />
                        </Tabs>
                        {
                            this.state.value === 0 &&
                            <div>
                                <div className="mid-button">
                                    <Button variant="fab" mini color="secondary" aria-label="Forward" onClick={() => this.move(0, droid)}>
                                        <Icon>keyboard_arrow_up</Icon>
                                    </Button>
                                </div>
                                <div className="mid-button">
                                    <Button variant="fab" mini color="secondary" aria-label="Left" className="floatLeft" onClick={() => this.move(270, droid)}>
                                        <Icon>keyboard_arrow_left</Icon>
                                    </Button>
                                    <Button variant="fab" mini color="primary" aria-label="Stop" onClick={() => this.stop(droid)}>
                                        STOP
                                </Button>
                                    <Button variant="fab" mini color="secondary" aria-label="Right" className="floatRight" onClick={() => this.move(90, droid)}>
                                        <Icon>keyboard_arrow_right</Icon>
                                    </Button>
                                </div>
                                <div className="mid-button">
                                    <Button variant="fab" mini color="secondary" aria-label="Down" onClick={() => this.move(180, droid)}>
                                        <Icon>keyboard_arrow_down</Icon>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            this.state.value === 1 &&
                            <div>
                                <TextField id="speed-val" className="full-width" label="Speed" value={this.state.speed} onChange={this.changeSpeed} type="number" InputLabelProps={{ shrink: true }} margin="normal" variant="outlined" />
                                <TextField id="dir-val" className="full-width" label="Direction" value={this.state.direction} onChange={this.changeDirection} type="number" InputLabelProps={{ shrink: true }} margin="normal" variant="outlined" />
                                <Button variant="contained" className="full-width" onClick={() => this.setDirection(droid)} color="primary">Set Direction</Button>
                            </div>
                        }
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.setColour('r', droid)}>Red</Button>
                        <Button onClick={() => this.setColour('b', droid)}>Blue</Button>
                        <Button onClick={() => this.setColour('g', droid)}>Green</Button>
                    </CardActions>
                </Card>
                <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={this.state.open} autoHideDuration={6000}
                    message={<span>Invalid {this.state.invalidField}!</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </Button>
                    ]} />
            </div>
        )
    }
}
import React, { Component } from 'react';

import { Droid } from './lib/droid.js';
import { Button, Card, CardHeader, Avatar, CardContent, Tabs, Tab, Icon, CardActions } from '@material-ui/core';

export class DroidCard extends Component {

    handleChange = (event, value) => {
        this.setState({ value });
      };

    render(props) {
        const { droid, value } = props;
        return (
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
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Drive" />
                        <Tab label="Settings" />
                    </Tabs>
                    {
                        value === 0 &&
                        <div>
                            <div className="mid-button">
                                <Button variant="fab" mini color="secondary" aria-label="Forward">
                                    <Icon>keyboard_arrow_up</Icon>
                                </Button>
                            </div>
                            <div className="mid-button">
                                <Button variant="fab" mini color="secondary" aria-label="Left" className="floatLeft">
                                    <Icon>keyboard_arrow_left</Icon>
                                </Button>
                                <Button variant="fab" mini color="primary" aria-label="Stop">
                                    STOP
                                </Button>
                                <Button variant="fab" mini color="secondary" aria-label="Right" className="floatRight">
                                    <Icon>keyboard_arrow_right</Icon>
                                </Button>
                            </div>
                            <div className="mid-button">
                                <Button variant="fab" mini color="secondary" aria-label="Down">
                                    <Icon>keyboard_arrow_down</Icon>
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        value === 1 &&
                        <div>
                            Settings
                        </div>
                    }
                </CardContent>
                <CardActions>
                    <Button>Red</Button>
                    <Button>Blue</Button>
                    <Button>Green</Button>
                </CardActions>
            </Card>
        )
    }
}
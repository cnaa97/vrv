import React, { Component } from 'react';

require('aframe');
// import {Entity, Scene} from 'aframe-react';

export default class AframePano extends Component {
    render() {
        return (
            <Scene>
                <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
                <Entity light={{type: 'point'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>
            </Scene>
        );
    }
}
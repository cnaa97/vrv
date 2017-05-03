/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, AppRegistry, StyleSheet, Text, WebView, ImagePickerIOS, Image, Button, CameraRoll, ImageStore} from 'react-native';

// import 'aframe';
// import {Entity, Scene} from 'aframe-react';
// import ReactDOM from 'react-dom';

export default class vrv extends Component {
    constructor() {
        super();
        this.state = {image: null, msg: '.....'};
    }

    componentDidMount() {

    }

    pickImage() {
        // openSelectDialog(config, successCallback, errorCallback);
        ImagePickerIOS.openSelectDialog({}, imageUri => {
            this.setState({image: imageUri});
        }, error => console.error(error));
    }


    onMessage(e){
        this.setState({
            messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
            message: e.nativeEvent.data,
        });
    }

    postMessage(){
        if(this.webView){

            ImagePickerIOS.openSelectDialog({}, imageUri => {

                this.webView.postMessage(imageUri);
                // this.setState({image: imageUri});
                // this.webView.postMessage(imageUri);
            }, error => {});

            // ImageStore.addImageFromBase64({}, img=>{
            //     this.webView.postMessage(this.webView);
            // }, error => {})
        }
    }

    //source={require('../index.html')}

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Button
                    onPress={this.postMessage.bind(this)}
                    title="Pick Image"
                    color="#841584"
                    accessibilityLabel=""
                />
                <Text>{this.state.message}</Text>
                <WebView ref={webView => { this.webView = webView; }}
                         source={{uri: 'https://cnaa97.github.io/vrv'}}
                         scrollEnabled={true}
                         bounces={false}
                         onMessage={this.onMessage.bind(this)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('vrv', () => vrv);

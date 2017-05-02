/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, AppRegistry, StyleSheet, Text, WebView, ImagePickerIOS, Image, Button} from 'react-native';

// source={{uri: 'https://cnaa97.github.io/vr_series_01'}}
// source={require('./src/views/AframePano.html')}
export default class vrv extends Component {
    constructor() {
        super();
        this.state = {image: null, msg: '.....'};
    }

    componentDidMount() {
        // this.pickImage();
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
        })
    }

    postMessage(){
        if (this.webview) {
            this.webview.postMessage('"Hello" from React Native!');
        }
    }

    /*{this.state.image?
     <Image style={{ flex: 1 }} source={{ uri: this.state.image }} /> :
     null
     }*/
    render() {
        let html = `
      <html>
        <script>
          var pinID = 0;
          function ping() {
            var message = 'hello ' + Date.now();
            document.title = message;
            window.location.hash = pinID++;
            return false;
          }
        </script>
        <body>
          This is a HTML Page inside WebView
          <hr />
          <button onClick="window.location.hash = ping()">ping</button>
          <div id="test">asdfasd</div>
        </body>
      </html>
`;

        // let jsCode = `document.querySelector('#test').style.backgroundColor = 'red';`;
        let jsCode = this.state.image ? `document.getElementById('panoImage').setAttribute('src', ${this.state.image});` : null;

        return (
            <View style={{ flex: 1 }}>
                <Button
                    onPress={this.pickImage.bind(this)}
                    title="Pick Image"
                    color="#841584"
                    accessibilityLabel=""
                />
                <Text>{this.state.image}</Text>
                <WebView
                    ref={webview => { this.webview = webview; }}
                    source={require('./src/views/AframePano.html')}
                    scrollEnabled={false}
                    bounces={false} />

            </View>
        );
    }

}
/*
 <WebView
 ref={webview => { this.webview = webview; }}
 automaticallyAdjustContentInsets={false}
 style={{height: 400}}
 source={{html:html}}
 onNavigationStateChange={this.onNavigationStateChange}
 startInLoadingState={false}
 onMessage={this.onMessage.bind(this)}
 injectedJavaScript={jsCode}
 />
 * */

/*

 />*/

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

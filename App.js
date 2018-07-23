
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SwitchNavigation from './StackNavigation/MainStack';
import { Provider } from "react-redux";
import store from "./src/js/store/index";

export default class App extends Component<Props> {

  initFirebase(){
    const firebase = require("firebase");
     var config = {
     apiKey: "AIzaSyBD7puCyujPuSXl7mQwTgM63Qzd4IAt0hM",
     authDomain: "apptenis-28286.firebaseapp.com",
     databaseURL: "https://apptenis-28286.firebaseio.com",
     projectId: 'apptenis-28286',
     storageBucket: "apptenis-28286.appspot.com"
     };
     firebase.initializeApp(config);
  }

  componentWillMount(){
    this.initFirebase();
  }

  render() {
    return (
        <Provider store={store}>
            <SwitchNavigation />
        </Provider>
    );
  }
}

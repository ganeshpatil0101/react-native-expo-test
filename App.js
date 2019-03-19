
import React, {Component} from 'react';

import { Container, Header, Content, Footer, FooterTab, Button, Text, StyleProvider } from 'native-base';

import { Font, AppLoading } from "expo";

import Setup from "./src/boot/setup";
import * as firebase from 'firebase';


type Props = {};
export default class App extends Component<Props> {
  state = {
    fontLoaded: false
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("./assets/fonts/Roboto.ttf"),
      Roboto_medium: require("./assets/fonts/Roboto_medium.ttf")
    });
      // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAPwoCXgRZiDRb09yAvT9tQ_ePQu6PoxRw",
    authDomain: "trackdirectmf.firebaseapp.com",
    databaseURL: "https://trackdirectmf.firebaseio.com",
    storageBucket: "trackdirectmf.appspot.com"
  };

  firebase.initializeApp(firebaseConfig);
    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return <Setup />;
  }
}
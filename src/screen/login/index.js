import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Container, Button, Toast , Text, Form , Item, Input,Label, Separator, H1 } from "native-base";
import {NavigationActions} from 'react-navigation';
import styles from "./styles";
import * as firebase from 'firebase';
import NavigateService from '../../services/navigate.service';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            userName:'',
            password:'',
            showToast: false
        }
      this.nservice = new NavigateService();
    }
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
          this.setState({
            loading: false,
            user,
          });
        });
      }
      componentWillUnmount() {
        this.authSubscription();
      }
    onLogin = () => {
        const { userName, password } = this.state;
        
        firebase.auth().signInWithEmailAndPassword(userName, password)
            .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the 
            // `onAuthStateChanged` listener we set up in App.js earlier
            Toast.show({
                text: "User Logged In Succssfully ... ",
                buttonText: "Okay",
                duration: 10000,
                type:'success'
              });

              this.nservice.navigateTo('MfList', {}, this.props.navigation);
             // this.props.navigation.dispatch(navigateAction);
              //this.props.navigation.dispatch(DrawerActions.closeDrawer())
            })
            .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
              Toast.show({
                text: message,
                position:'top',
                duration: 10000,
                type:'danger'
              });
            });
    }
    onRegister = () => {
    const { userName, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(userName, password)
        .then((user) => {
        Toast.show({
            text: "User Registerd succssfully ... ",
            buttonText: "Okay",
            duration: 10000,
            type:"success"
          });
        console.log("User Registerd succssfully ... ");
        })
        .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        Toast.show({
            text: "User Registration Failed ... "+message,
            buttonText: "Okay",
            duration: 10000,
            type:'danger',
            position:'top'
          });
        });
    }
  render() {
    return (
      <Container >
        <StatusBar barStyle="light-content" />
        <View style={styles.loginContainer}>
          <View style={styles.loginHeader}>
            <H1>  TrackDirectMf </H1>
          </View>
            <Form >
                <Item floatingLabel>
                <Label>Email</Label>
                <Input keyboardType='email-address' textContentType='emailAddress' onChangeText= {(text)=> this.setState({userName: text})} />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input secureTextEntry={true} onChangeText= {(password)=> this.setState({password: password})} />
                </Item>
            </Form>
            <Button block onPress={()=>{this.onLogin()}} style={styles.topSpace}>
                <Text>Login</Text>
            </Button>
            <Button block onPress={()=>{this.onRegister()}} style={styles.topSpace} >
                <Text>Register</Text>
            </Button>
        </View>
      </Container>
    );
  }
}

export default Login;

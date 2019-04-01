import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Container, Button, Toast , Text, Form , Item, Input,Label } from "native-base";
import {NavigationActions} from 'react-navigation';
import styles from "./styles";
import * as firebase from 'firebase';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            userName:'',
            password:'',
            showToast: false
        }
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
        const navigateAction = NavigationActions.navigate({
            routeName: "Home"
          });
          this.props.navigation.dispatch(navigateAction);
        // firebase.auth().signInWithEmailAndPassword(userName, password)
        //     .then((user) => {
        //     // If you need to do anything with the user, do it here
        //     // The user will be logged in automatically by the 
        //     // `onAuthStateChanged` listener we set up in App.js earlier
        //     Toast.show({
        //         text: "User Logged In Succssfully ... ",
        //         buttonText: "Okay",
        //         duration: 10000
        //       });
        //       const navigateAction = NavigationActions.navigate({
        //         routeName: route
        //       });
        //      // this.props.navigation.dispatch(navigateAction);
        //       //this.props.navigation.dispatch(DrawerActions.closeDrawer())
        //     })
        //     .catch((error) => {
        //     const { code, message } = error;
        //     // For details of error codes, see the docs
        //     // The message contains the default Firebase string
        //     // representation of the error
        //     console.error("=====>",error);
        //     console.error("reason ==> ",error.getReason());
        //     });
    }
    onRegister = () => {
    // const { userName, password } = this.state;
    // firebase.auth().createUserWithEmailAndPassword(userName, password)
    //     .then((user) => {
    //     Toast.show({
    //         text: "User Registerd succssfully ... ",
    //         buttonText: "Okay",
    //         duration: 10000
    //       });
    //     console.log("User Registerd succssfully ... ");
    //     })
    //     .catch((error) => {
    //     const { code, message } = error;
    //     // For details of error codes, see the docs
    //     // The message contains the default Firebase string
    //     // representation of the error
    //     Toast.show({
    //         text: "Login Error ... "+message,
    //         buttonText: "Okay",
    //         duration: 10000
    //       });
    //       console.error("=====>",error);
    //       console.error("reason ==> ",error.getReason());
    //     });
    }
  render() {
    return (
      <Container >
        <StatusBar barStyle="light-content" />
        <View style={styles.loginContainer}>
            <Form >
                <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText= {(text)=> this.setState({userName: text})} />
                </Item>
                <Item floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText= {(password)=> this.setState({password: password})} />
                </Item>
            </Form>
            <Button block onPress={()=>{this.onLogin()}}>
                <Text>Login</Text>
            </Button>
            <Button block onPress={()=>{this.onRegister()}}>
                <Text>Register</Text>
            </Button>
        </View>
      </Container>
    );
  }
}

export default Login;

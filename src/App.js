import React from "react";
import { Root } from "native-base";
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import Home from './screen/home';
import Card from './screen/card';
import SideBar from './screen/sidebar';
import Login from  './screen/login';
import MfList from './screen/mf/mfList';
import MfDetails from './screen/mf/mfDetails';
import MfAddEdit from './screen/mf/mfAddEdit';
// TODO
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


const Drawer = createDrawerNavigator(
     {
      Home: { screen: Home },
      Login: { screen: Login },
      MfList:{screen:MfList},
      MfDetails:{screen:MfDetails},
      MfAddEdit:{screen:MfAddEdit}
    },
    {
      initialRouteName: "Login",
      // contentOptions: {
      //   activeTintColor: "#e91e63"
      // },
      contentComponent: props => <SideBar {...props} />
    }
  );
const AppNavigator = createStackNavigator(
    {
      Drawer: { screen: Drawer },
      Card: { screen: Card},
    },
    {
      initialRouteName: "Drawer",
      headerMode: "none"
    }
);
  
  const AppContainer = createAppContainer(AppNavigator);
  
  export default () =>
    <Root>
      <AppContainer />
    </Root>;
  
const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  loginContainer: {
    flex: 1,
    walignItems:'center',
    justifyContent:'center',
    padding : 20
  },
  loginHeader:{
    justifyContent:'center',
    alignItems: "center"
  },
  topSpace:{
    marginTop: 20
  }
  };

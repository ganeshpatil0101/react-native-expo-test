import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";
import NavigateService from "../../services/navigate.service";
import Service from '../../services/service';
const drawerCover = require("../../../assets/drawer-cover.png");
const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "home",
    bg: "#477EEA"
  },
  {
    name: "Mutual Fund List",
    route: "MfList",
    icon: "grid",
    bg: "#48525D"
  },
  {
    name: " Add Mutual Fund",
    route: "MfAddEdit",
    icon: "ios-add-circle",
    bg: "#48525D"
  },
  {
    name: " Logout ",
    route: "logout",
    icon: "ios-log-out",
    bg: "#48525D"
  }
];
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
    this.nservice = new NavigateService();
    this.service = Service.getInstance();
  }
  navigateTo(route) {
    if(route == 'logout') {
      this.service.logout().then(()=> {
        console.log('User Logout');
        this.nservice.navigateTo('Login', {}, this.props.navigation);
        alert('Logged out successfully.');
      }).catch(e=>console.error(e));
    } else {
      this.nservice.navigateTo(route, {}, this.props.navigation);
    }
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.navigateTo(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;

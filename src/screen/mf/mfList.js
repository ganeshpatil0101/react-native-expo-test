import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right
} from "native-base";
import styles from "./styles.js";
import { AppLoading } from "expo";

import * as firebase from 'firebase';

class MfList extends Component {
    state = {
        dataLoaded: false,
        mfData:[]
      };
    componentWillMount() {
        // firebase.database().ref('mfListTest').set(
        //     {
        //         name: 'MF Name'
        //     }
        // ).then(() => {
        //     console.log('INSERTED !');
        //     alert("Inserted");
        // }).catch((error) => {
        //     console.log(error);
        // });
        firebase.database().ref('MfList').on('value', (data)=>{
            this.setState({ dataLoaded: true });
            var pdata = [];
            pdata = this._prepareData(data.val());
            this.setState({mfData : pdata});
        }, (err) => {console.error(err)} );
    }
    _prepareData(data) {
        var pdata = [];
        Object.keys(data).forEach(key => {
            pdata.push(data[key]);
          });
          return pdata;
    }
  render() {
        if (!this.state.dataLoaded) {
            return <AppLoading />;
        }
      return (<Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Mutual Funds List</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={this.state.mfData}
            renderRow={data =>
              <ListItem >
                {/* <Left>
                </Left> */}
                <Body>
                  <Text>
                    {data.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.type}
                  </Text>
                </Body>
                <Right>
                <Text>View</Text>
                  {/* <Button>
                    <Text>View</Text>
                  </Button> */}
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default MfList;
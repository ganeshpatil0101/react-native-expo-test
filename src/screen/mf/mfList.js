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
  Right,
  View
} from "native-base";
import { BackHandler } from 'react-native';
import styles from "./styles.js";
import { AppLoading } from "expo";
import {NavigationActions} from 'react-navigation';
import Service from "../../services/service.js";

import NumberFormat from 'react-number-format';
class MfList extends Component {
    state = {
        dataLoaded: false,
        mfData:[]
      };
    componentWillMount() {
      this.setState({dataLoaded : false});
      this.service = Service.getInstance();
      this.mfIds = [];
      this.service.getAllMfList((data)=>{
        this.setState({ dataLoaded: true });
        if(data) {
          var pdata = [];
          pdata = this._prepareData(data.val());
          this.setState({mfData : pdata});
        }
      },  (err) => {console.error(err)} );

      this.backHandler =  BackHandler.addEventListener('hardwareBackPress', function() {return true})
    }
    componentWillUnmount() {
      this.backHandler();
    }
    _prepareData(data) {
        var pdata = [];
        this.mfIds = [];
        if(data){
          Object.keys(data).forEach(key => {
            pdata.push(data[key]);
            this.mfIds.push(data[key].id);
          });
        }
        return pdata;
    }
    gotToDetailsPage(data) {
      const navigateAction = NavigationActions.navigate({
        routeName: "MfDetails",
        params: {
          data:data,
        },
      });
      this.props.navigation.dispatch(navigateAction);
    }
    refreshNav() {
      this.setState({ dataLoaded: false });
      this.service.getLatestNav(this.mfIds, this.state.mfData).then(()=>{
        this.setState({ dataLoaded: true });
      });
    }
    _renderNoData() {
      if (this.state.mfData.length == 0) {
          return (
                  <View>
                      <Text style={{ alignSelf: "center" }}> No Data Available. </Text>
                  </View>
          );
      } else {
          return null;
      }
  }
  render() {
        if (!this.state.dataLoaded) {
            return <AppLoading />;
        }
      return (<Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{paddingRight:10, flex: 3}}>
            <Title>Mutual Funds List</Title>
          </Body>
          <Right >
          <Button transparent onPress={()=>{this.refreshNav()}}>
                <Icon type="AntDesign" name="reload1" />
              </Button>
          </Right>
        </Header>
        <Content>
          {this._renderNoData()}
          <List
            dataArray={this.state.mfData}
            renderRow={data =>
              <ListItem>
                <Body>
                  <Text>
                    {data.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.type}
                  </Text>
                </Body>
                <Right>
                  <NumberFormat value={data.profitOrLoss} displayType={'text'} thousandSeparator={true} decimalScale={2}
                    fixedDecimalScale= {true} renderText={value => <Text style={value <= 0 ? styles.red : styles.green}>
                    {value}</Text>} />
              <Button transparent onPress={() => this.gotToDetailsPage(data) }>
                  <Icon name="arrow-forward" />
                </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default MfList;
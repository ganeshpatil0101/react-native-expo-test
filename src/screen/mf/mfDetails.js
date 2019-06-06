import React, { Component } from "react";
import { Alert } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Separator,
  Left,
  Body,
  Right,
  Badge
} from "native-base";
import styles from "./styles.js";
import NumberFormat from 'react-number-format';

import NavigateService from '../../services/navigate.service';
import Service from "../../services/service";
class MfDetails extends Component {
    state = {
        dataLoaded: false,
        mfData:{}
      };
    componentWillMount() {
      this.nservice = new NavigateService();
      this.service = new Service();
    }
    editMf(data) {
      const { navigation } = this.props;
      const _data = navigation.getParam('data', 'NO-ID');
      this.nservice.navigateTo('MfAddEdit', {
        data:_data,
        action:'edit'
      },navigation);
    }
    deleteMf(data) {
      Alert.alert(
        'Delete Mutual Fund',
        'Do you want to delete '+data.name,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            this.service.deleteMf(data.id).then(()=>{
              console.log("mf deleted  ");
              this.nservice.navigateTo('MfList', {}, this.props.navigation);
            });
          }
        },
        ],
        {cancelable: false},
      );
    }
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'NO-ID');
      return (<Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{paddingRight:10, flex: 3}}>
            <Title>{data.name}</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <ListItem>
            <Left>
              <Text>{data.name}</Text>
            </Left>
            <Right>
              <Button transparent onPress={()=>{this.editMf(data)}}>
              <Icon type="AntDesign" name="edit" />
              </Button>
              
            </Right>
            <Right>
            <Button transparent onPress={()=>{this.deleteMf(data)}}>
                <Icon type="AntDesign" name="delete" />
              </Button>
            </Right>
        </ListItem>
        <Separator bordered />
        <ListItem>
            <Left>
                <Text>Type</Text>
            </Left>
            <Body>
              <Text>{data.type}</Text>
            </Body>
        </ListItem>
        <ListItem>
            <Left>
              <Text>Purchase Type</Text>
            </Left>
            <Body>
                <Text>{data.mfType}</Text>
            </Body>
        </ListItem>
        <ListItem>
            <Left>
                <Text>Units</Text>
            </Left>
            <Body>
            <Badge primary>
                    <CommonNumberFormat nvalue={data.closingUnits}/>
            </Badge>
              
            </Body>
        </ListItem>

        <ListItem>
            <Left>
                <Text>Current Nav</Text>
            </Left>
            <Body>
            <Badge info>
                <CommonNumberFormat nvalue={data.currentNav}/>
            </Badge>
            </Body>
        </ListItem>

        <ListItem>
            <Left>
                <Text>Current Value</Text>
            </Left>
            <Body>
            <Badge success>
            <CommonNumberFormat nvalue={data.currentValue}/>
            </Badge>
              
            </Body>
        </ListItem>

        <ListItem>
            <Left>
                <Text>Total Inv. Amount</Text>
            </Left>
            <Body>
            <Badge success>
              <CommonNumberFormat nvalue={data.totalInvAmount}/>
              </Badge>
            </Body>
        </ListItem>

        <ListItem>
            <Left>
                <Text>Profit/Loss</Text>
            </Left>
            <Body>
                <Badge success={data.profitOrLoss>=0 ? true : false}  >
                <CommonNumberFormat nvalue={data.profitOrLoss}/>
                </Badge>
            </Body>
        </ListItem>
        </Content>
      </Container>
    );
  }
}
const CommonNumberFormat = ({ nvalue }) =><NumberFormat value={nvalue} 
displayType={'text'} 
thousandSeparator={true}
decimalScale={2}
fixedDecimalScale= {true}
renderText={value => <Text>{value}</Text>} />;
export default MfDetails;
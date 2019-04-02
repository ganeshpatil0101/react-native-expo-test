import React, { Component } from "react";
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

class MfDetails extends Component {
    state = {
        dataLoaded: false,
        mfData:{}
      };
    componentWillMount() {
        // firebase.database().ref('MfList/'+id).on('value', (data)=>{
        //     this.setState({ dataLoaded: true });
        //     var pdata = [];
        //     pdata = this._prepareData(data.val());
        //     this.setState({mfData : pdata});
        // }, (err) => {console.error(err)} );
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
          <Body>
            <Title>{data.name}</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <ListItem>
            <Left>
              <Text>{data.name}</Text>
            </Left>
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
                <Text>Total Invested Amount</Text>
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
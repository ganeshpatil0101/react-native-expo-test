import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Form,
  Text,
  Item,
  Left,
  Body,
  Right,
  Label,
  Input,
  Picker,
  Separator,
  Spinner
} from "native-base";
import {clone} from  'lodash';
import styles from "./styles.js";
import NumberFormat from 'react-number-format';
import Service from '../../services/service';
import NavigateService from '../../services/navigate.service';
class MfAddEdit extends Component {
    state = {
        
      };
      constructor(props) {
        super(props);
        this.fService = Service.getInstance();
        this.nservice = new NavigateService();
      }
    componentWillMount() {
      this.clearState();
      const didFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
          const params = payload.action.params ;
          const data = (params && params.data) ? params.data : {};
          const action = (params && params.action) ? params.action : "";
          this.clearState();
          data.action = action;
          if(action === 'edit') {
            this.setState(data);
          }
        }
      );
    }
    _getCurrentAction() {
      const { navigation } = this.props;
      return navigation.getParam('action', 'NO-Action');
    }
    onTypeChanged(value) {
        this.setState({
            type: value
        });
    }
    onPurchaseTypeChanged(value) {
        this.setState({
            mfType: value
        });
    }
    saveMf() {
      let currentValue = this.state.closingUnits * this.state.currentNav;
      let profitLoss =  currentValue - this.state.totalInvAmount;
      this.state.currentValue = currentValue;
      this.state.profitOrLoss = profitLoss;
      let data = clone(this.state);
      delete data.dataLoaded;
      delete data.action;
      this.setState({dataLoaded:false});
      this.fService.saveMfData(data).then(()=>{
        alert("Saved Successfully");
        this.clearState();
        if(this._getCurrentAction() === 'edit') {
          this.nservice.navigateTo('MfList', {}, this.props.navigation);
        }
      });
    }
    clearState() {
      this.setState({
        dataLoaded: true,
        id:"",
        name:"",
        mfType:"",
        type:"",
        closingUnits:"",
        currentNav:"",
        currentValue:"",
        totalInvAmount:"",
        profitOrLoss:"",
        action:""
      });
    }
  render() {

    let titleName = "Add New Mutual Fund";
    if(this.state.action === 'edit') {
      titleName = "Edit Mutual Fund";
    }
      if (!this.state.dataLoaded) {
        return <Spinner color="blue" />;
    }

      return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.nservice.navigateTo('MfList', {}, this.props.navigation)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{paddingRight:10, flex: 3}}>
            <Title>{titleName}</Title>
          </Body>
          <Right />
        </Header>

        <Content enableOnAndroid>
            <Form>
            <Item floatingLabel>
                    <Label>MF Id</Label>
                    <Input value={this.state.id} onChangeText= {(text)=> this.setState({id: text})}/>
                </Item>
                <Item floatingLabel>
                    <Label>Name</Label>
                    <Input value={this.state.name} onChangeText= {(text)=> this.setState({name: text})}/>
                </Item>
                <Item picker style={{paddingLeft:10,paddingRight:10, paddingTop:10}}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        placeholder="Select Type"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.type}
                        onValueChange={this.onTypeChanged.bind(this)}
                    >
                        <Picker.Item label="Select Type" value="" />
                        <Picker.Item label="Equity" value="Equity" />
                        <Picker.Item label="Tax Saving" value="Tax Saving" />
                    </Picker>
                </Item>
                <Item picker style={{paddingLeft:10,paddingRight:10, paddingTop:10}}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        placeholder="Select Purchase Type"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.mfType}
                        onValueChange={this.onPurchaseTypeChanged.bind(this)}
                    >
                        <Picker.Item label="Select Purchase Type" value="" />
                        <Picker.Item label="Direct" value="Direct" />
                        <Picker.Item label="In-Direct" value="InDirect" />
                    </Picker>
                </Item>
                <Item floatingLabel>
                    <Label>Total Units</Label>
                    <Input value={this.state.closingUnits} onChangeText= {(text)=> this.setState({closingUnits: text})}/>
                </Item>
                <Item floatingLabel>
                    <Label>Current Nav</Label>
                    <Input value={this.state.currentNav} onChangeText= {(text)=> this.setState({currentNav: text})}/>
                </Item>
                {/* <Item floatingLabel>
                    <Label>Current Value</Label>
                    <Input value={this.state.currentValue} onChangeText= {(text)=> this.setState({currentValue: text})}/>
                </Item> */}
                <Item floatingLabel>
                    <Label>Total Invested Amount</Label>
                    <Input value={this.state.totalInvAmount} onChangeText= {(text)=> this.setState({totalInvAmount: text})}/>
                </Item>
                  <Button block onPress={()=>{this.saveMf()}}>
                    <Text>Save</Text>
                  </Button>
            </Form>
        </Content>

      </Container>
    );
  }
}
const CommonNumberFormat = ({ nvalue, onChangeText }) =><NumberFormat value={nvalue} 
displayType={'text'} 
thousandSeparator={true}
decimalScale={2}
fixedDecimalScale= {true}
onChangeText={onChangeText}
renderText={value => <Text>{value}</Text>} />;
export default MfAddEdit;
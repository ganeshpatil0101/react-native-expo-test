import * as firebase from 'firebase';
import {find} from 'lodash';
const DATABASE = Object.freeze({
  MfStore:'MfData',
  MfList: 'MfList',
  NAV_API:'https://www.amfiindia.com/spages/NAVAll.txt'
});
export default class Service{
  static myInstance = null; 
  constructor() {
    this.arrData = [];
    this.rawData = '';
  }
  static getInstance() {
    if (Service.myInstance == null) {
      Service.myInstance = new Service();
    }
    return this.myInstance;
  }
  
  logout() {
    try{
      console.log("===>destroy ",this.dbRef);
      if(this.dbRef) {
        this.dbRef.off('value', this.successCb);
      }
    }catch(e){
      console.error(e);
    }
    return firebase.auth().signOut();
  }
  saveMfData(dataWrapper) {
    return firebase.database().ref(this.getDBCollectionPath(dataWrapper.id)).set(dataWrapper).then((res) => {
        console.log('INSERTED !');
    }).catch((error) => {
        console.log(error);
    });
  }
  initlizeMfStore(uid) {
    return firebase.database().ref(DATABASE.MfStore + '/'+ uid +'/defaults/').set({'initilized':true}).then((res) => {
        console.log('Initilzed !');
    }).catch((error) => {
        console.log(error);
    });
  }
  deleteMf(mfId) {
    return firebase.database().ref(this.getDBCollectionPath(mfId)).remove().then((res) => {
      console.log('deleted succsufully !');
      return res;
    }).catch((error) => {
        console.log(error);
    });
  }
  getAllMfList(successCb, errorCb) {
    this.successCb = successCb;
    this.dbRef = this.getDbRef();
    return this.dbRef.on('value', this.successCb , errorCb);
  }
  getDbRef() {
    this.dbRef = firebase.database().ref(DATABASE.MfStore + '/'+ this.getUserUId()+'/'+ DATABASE.MfList);
    return this.dbRef;
  }
  getDBCollectionPath(dataUid) {
    return DATABASE.MfStore + '/'+ this.getUserUId()+'/'+ DATABASE.MfList + "/" + dataUid;
  }
  getUserUId() {
    return firebase.auth().currentUser.uid;
  }
  getLatestNav(mfIds, mfData) {
    // add caching here
    if(this.arrData && this.rawData) {
      this.processData(this.arrData, this.rawData, mfIds, mfData);
    } else {
      return fetch(DATABASE.NAV_API).then((res) => {
        this.rawData = res._bodyText;
        this.arrData = this.rawData.split('\n');
        this.processData(this.arrData, this.rawData, mfIds, mfData);
      }).catch((e)=>console.error(e));
    }
  }
  processData(arrData, rawData, mfIds, mfData) {
    for(let m=0;m<mfIds.length; m++) {
      let mfId = mfIds[m];
      let latestNav = this._getNavFor(mfId, arrData, rawData);
      let data = find(mfData, {id: mfId});
      latestNav =  latestNav.split(';')[4];
      console.log("lastestNav for ", mfId , ' latestNav ',latestNav, ' OldNav = ', data.currentNav);
      if(latestNav != data.currentNav) {
        let udata = this.getCalculatedValues(mfId, latestNav, data);
        if(udata) {
          this.saveMfData(udata).then((res)=> {
            console.log('Updated Nav Value ', mfId);
          });
        }
      }
    }
  }
  getCalculatedValues(mfId, nav, data) {
    data.currentNav = nav;
    data.currentValue = data.closingUnits * nav;
    data.profitOrLoss =  data.currentValue - data.totalInvAmount;
    return data;
  }
   _getLine(rawData, charOrString) {
    if (!rawData) return false;
    if (!charOrString) return false;
    var char = (typeof charOrString === 'string') ? rawData.indexOf(charOrString) : charOrString
    var subBody = rawData.substring(0, char);
    if (subBody === '') return false;
    var match = subBody.match(/\n/gi);
    if (match) return match.length;
    return 0;
  }
  _getNavFor(mfId, arrData, rawData) {
    let index = this._getLine(rawData, mfId);
    if(index && arrData[index]) {
      console.log("found data -> ",arrData[index]);
      return arrData[index];
    }
  }
}
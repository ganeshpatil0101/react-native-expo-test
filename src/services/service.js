import * as firebase from 'firebase';
import {find} from 'lodash';
const DATABASE = Object.freeze({
  MfStore:'MfList',
  NAV_API:'https://www.amfiindia.com/spages/NAVAll.txt'
});
export default class Service{

  constructor() {
    this.arrData = [];
    this.rawData = '';
  }

  saveMfData(dataWrapper) {
   return firebase.database().ref(DATABASE.MfStore+"/"+dataWrapper.id).set(dataWrapper).then((res) => {
        console.log('INSERTED !');
    }).catch((error) => {
        console.log(error);
    });
  }
  deleteMf(mfId) {
    return firebase.database().ref(DATABASE.MfStore+"/"+mfId).remove().then((res) => {
      console.log('deleted succsufully !');
      return res;
    }).catch((error) => {
        console.log(error);
    });
  }
  getAllMfList() {
    return firebase.database().ref(DATABASE.MfStore);
  }
  getLatestNav(mfIds, mfData) {
    // add caching here
    return fetch(DATABASE.NAV_API).then((res) => {
      this.rawData = res._bodyText;
      this.arrData = this.rawData.split('\n');
      for(let m=0;m<mfIds.length; m++) {
        let mfId = mfIds[m];
        let latestNav = this._getNavFor(mfId, this.arrData, this.rawData);
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
    }).catch((e)=>console.error(e));
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
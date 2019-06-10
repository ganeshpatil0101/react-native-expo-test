import * as firebase from 'firebase';

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
   return firebase.database().ref(DATABASE.MfStore+"/"+dataWrapper.id).set(dataWrapper).then(() => {
        console.log('INSERTED !');
    }).catch((error) => {
        console.log(error);
    });
  }
  deleteMf(mfId) {
    return firebase.database().ref(DATABASE.MfStore+"/"+mfId).remove().then(() => {
      console.log('deleted succsufully !');
    }).catch((error) => {
        console.log(error);
    });
  }
  getAllMfList() {
    return firebase.database().ref(DATABASE.MfStore);
  }
  getLatestNav(mfIds) {
    // add caching here
    return fetch(DATABASE.NAV_API).then((res)=>{
      this.rawData = res._bodyText;
      this.arrData = this.rawData.split('\n');
      for(let m=0;m<mfIds.length; m++) {
        console.log('===> mfId ',mfIds[m]);
        let latestNav = this._getNavFor(mfIds[m], this.arrData, this.rawData);
        console.log("lastestNav for ",mfIds[m], ' value ', latestNav);
      }
    }).catch((e)=>console.error(e));
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
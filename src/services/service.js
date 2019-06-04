import * as firebase from 'firebase';

const DATABASE = Object.freeze({
  MfStore:'MfList'
});
export default class Service{

  constructor() {
    
  }

  saveMfData(dataWrapper) {
   return firebase.database().ref(DATABASE.MfStore+"/"+dataWrapper.id).set(dataWrapper).then(() => {
      console.log('INSERTED !');
  }).catch((error) => {
      console.log(error);
  });
  }
  getAllMfList() {
    return firebase.database().ref(DATABASE.MfStore);
  }
}
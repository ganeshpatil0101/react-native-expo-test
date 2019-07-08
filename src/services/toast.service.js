import { Toast } from 'native-base'


export default class ToastService{

    constructor() {
      
    }

    static showToast(msg, type, duration=10000, buttonText="Ok") {
        Toast.show({
            text: msg,
            type:type,
            buttonText: "Okay",
            duration: 10000,
            
          });
    }
}
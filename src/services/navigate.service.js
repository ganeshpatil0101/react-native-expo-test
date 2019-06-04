
import {NavigationActions} from 'react-navigation';

export default class NavigateService{

  constructor() {
    
  }
  navigateTo(routeName, param, navigation) {
    const navigateAction = NavigationActions.navigate({
        routeName: routeName,
        params: param,
      });
      navigation.dispatch(navigateAction);
  }
}
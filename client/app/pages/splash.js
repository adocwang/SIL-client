import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager
  } from 'react-native';

import LoginContainer from '../containers/LoginContainer';
import MainContainer from '../containers/MainContainer';
import {loadLocalUser} from '../actions/auth'
import realm from '../components/realm'

var {height, width} = Dimensions.get('window');

class Splash extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    let user = realm.objects('User');
    if(user.length >0 && user[0].id !=0){
      const {dispatch} = this.props;
      InteractionManager.runAfterInteractions(() => {
        dispatch(loadLocalUser(user[0]));
      });
      const {navigator} = this.props;
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          navigator.resetTo({
            component: MainContainer,
            name: 'Main'
          });
        });
      }, 1000);
    }else {
      const {navigator} = this.props;
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          navigator.resetTo({
            component: LoginContainer,
            name: 'Login'
          });
        });
      }, 1000);
    }
    console.log('User',user);
  }

  render () {
    return (
      <Image
        style={{flex: 1, width: width, height: height}}
        source={require('../img/splash.png')}
      />
    );
  }
}

export default Splash;
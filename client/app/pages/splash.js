import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager
  } from 'react-native';

import LoginContainer from '../containers/LoginContainer';

var {height, width} = Dimensions.get('window');

class Splash extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const {navigator} = this.props;
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: LoginContainer,
          name: 'Login'
        });
      });
    }, 1500);
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
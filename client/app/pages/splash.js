import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
    StatusBar
  } from 'react-native';

import LoginContainer from '../containers/LoginContainer';
import ActiveContainer from '../containers/ActiveContainer';
import MainContainer from '../containers/MainContainer';
import {loadLocalUser} from '../actions/auth'
//import realm from '../components/realm'

var {height, width} = Dimensions.get('window');

class Splash extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // 读取
    storage.load({
      key: 'user',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: false,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
      // 你只能在then这个方法内继续处理ret数据
      // 而不能在then以外处理
      // 也没有办法“变成”同步返回
      // 你也可以使用“看似”同步的async/await语法
      const {dispatch} = this.props;
      InteractionManager.runAfterInteractions(() => {
        dispatch(loadLocalUser(ret));
      });
      const {navigator} = this.props;
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          navigator.resetTo({
            component: MainContainer,
            name: 'Main'
          });
        });
      }, 500);
      console.log(ret);
    }).catch(err => {
      console.log(err);
      const {navigator} = this.props;
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          navigator.resetTo({
            component: LoginContainer,
            name: 'Login'
          });
        });
      }, 500);
    })


  }

  render () {
    return (
      <Image
        style={{flex: 1, width: width, height: height}}
        source={require('../img/splash.png')}
      >
        <StatusBar
            backgroundColor='#2133A7'
            translucent={true}
            hidden={false}
            animated={true}
        />
      </Image>
    );
  }
}

export default Splash;
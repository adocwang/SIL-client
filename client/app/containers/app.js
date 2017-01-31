/**
 * Created by kiefer on 2017/1/21.
 */
import React from 'react';
import LoadingViewAndroid from  '../components/LoadingView';
import {ToastShort} from '../utils/ToastUtils';

import Splash from '../pages/splash';
import Login from '../pages/Login';
import Active from '../pages/Active';
import Main from '../pages/Main';
import MainContainer from '../containers/MainContainer';
import ResetPwd from '../pages/ResetPwd';
import Test from '../pages/Test';
import {NaviGoBack} from '../utils/CommonUtils';

import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    View
    } from 'react-native';

var _navigator, isRemoved = false;

class App extends React.Component {
    constructor (props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goBack = this.goBack.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    goBack () {
        return NaviGoBack(_navigator);
    }

    renderScene (route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        if (route.name === 'WebViewPage') {
            BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
            isRemoved = true;
        } else {
            if (isRemoved) {
                BackAndroid.addEventListener('hardwareBackPress', this.goBack);
            }
        }
        return (
            <Component navigator={navigator} route={route}/>
        );
    }

    configureScene (route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="#000000"
                    barStyle="default"
                />
                <Navigator
                    ref='navigator'
                    style={styles.navigator}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute={{
            component: Active,
            name: 'Active'
          }}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

export default App;

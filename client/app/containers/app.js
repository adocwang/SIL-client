/**
 * Created by kiefer on 2017/1/21.
 */
import React from 'react';
import LoadingViewAndroid from  '../components/LoadingView';
import {ToastShort} from '../utils/ToastUtils';

import SplashContainer from '../containers/SplashContainer';
import LoginContainer from '../containers/LoginContainer';
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

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

//init localStorage
var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    sync: null
})

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用


global.storage = storage;

// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了



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
            component: SplashContainer,
            name: 'Splash'
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

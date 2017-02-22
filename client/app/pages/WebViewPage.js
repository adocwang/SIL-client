/**
 * Created by kiefer on 2017/2/21.
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    PropTypes,
    WebView,
    BackAndroid,
    Dimensions,
    Text,
    Image,
    Platform,
    TouchableOpacity,
    View
    } from 'react-native';

import CustomToolbar from '../components/CustomToolbar';
import {ToastShort} from '../utils/ToastUtils';
import Loading from '../components/Loading';
import {NaviGoBack} from '../utils/CommonUtils';

let tag;
var canGoBack = false;

class WebViewPage extends React.Component {
    constructor (props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
        this.onActionSelected = this.onActionSelected.bind(this);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.goBack = this.goBack.bind(this);
        console.log(this.state);
    }

    componentWillMount () {

    }

    componentDidMount () {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    onActionSelected () {

    }

    onNavigationStateChange (navState) {
        canGoBack = navState.canGoBack;
    }

    goBack () {
        if (canGoBack) {
            this.refs.webview.goBack();
            return true;
        }
        return NaviGoBack(this.props.navigator);
    }

    renderLoading () {
        return <Loading />;
    }

    render () {
        const {navigator, route} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    onActionSelected={this.onActionSelected}
                    title={this.state.title}
                    navigator={navigator}
                />
                <WebView
                    ref='webview'
                    automaticallyAdjustContentInsets={false}
                    style={{flex: 1,backgroundColor:'#ffffff'}}
                    source={{uri:this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={(event) => {return true;}}
                    onNavigationStateChange={this.onNavigationStateChange}
                    renderLoading={this.renderLoading.bind(this)}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#ffffff'
    },
});

export default WebViewPage;
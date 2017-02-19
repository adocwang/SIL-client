import React from 'react';
import {
    Image,
    View,
    Text,Dimensions,
    StyleSheet,
    ScrollView,
    ListView,
    RefreshControl,
    TouchableOpacity,
    ProgressBarAndroid,
    InteractionManager,
    NativeModules,
    DeviceEventEmitter,
    StatusBar
} from 'react-native';
import ScrollableTabView , {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import MainTabBar from '../components/MainTabBar';
import CustomTabBar from '../components/CustomTabBar';
import TabNavigator from '../components/bottomtabbar/TabNavigator';
import CustomBadgeView from '../components/bottomtabbar/Badge'
import LoadingView from '../components/LoadingView';
import Spanner from 'react-native-spinkit'
import ClaimContainer from '../containers/ClaimContainer'
import ApplicationContainer from '../containers/ApplicationContainer'
import HomeContainer from '../containers/HomeContainer'
import PersonContainer from '../containers/PersonContainer'
import UserEnterpriseContainer from '../containers/UserLoanContainer'
import EnterpriseDetailContainer from '../containers/enterprise/EnterpriseDetailContainer'
import MessageContainer from '../containers/MessageContainer'
import realm from '../components/realm'
import BasePage from './BasePage'
import {ToastShort} from '../utils/ToastUtils';
import {fetchUnReadMessageList,fetcMessageSet} from '../actions/message'
import _ from 'lodash'
import * as types from '../constants/ActionTypes';
class Main extends BasePage {
    constructor() {
        super()

        this.state = {
            selectedTab:'home',
            messageTips:false
        };

    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.message.messageList && nextProps.message.messageList.length > 0){
                var unread = _.find(nextProps.message.messageList, function (item) {
                    return item.state == 0 ;
                })
            if(unread!=undefined){
                this.setState({messageTips:true})
            }else {
                this.setState({messageTips:false})
            }
        }
    }

    componentDidMount () {
        console.log('Main componentDidMount');

        const {dispatch} = this.props;
       DeviceEventEmitter.addListener('MiPushMessage', this.onReceivePushMessage);
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchUnReadMessageList(this.props.auth.token));
        });
    }
    onReceivePushMessage = (e)=> {
        const {navigator} = this.props;
        const {auth} = this.props;
        const {dispatch} = this.props;
        console.log('Main MiPushMessage receive',e);
        var message = JSON.parse(e.content);
        if(e.type=='1'){
            InteractionManager.runAfterInteractions(() => {
                dispatch({type:types.RECEIVE_PUSH_MESSAGE,data:message});
            });
        }else {
            if(message.type && message.type.page && message.type.param && message.type.param.id){
                dispatch(fetcMessageSet(message.id,auth.token));
                if(message.type.page == 'enterprise_operation'){
                    InteractionManager.runAfterInteractions(() => {
                        navigator.push({
                            component: ClaimContainer,
                            name: 'Claim',
                            params: {
                                item:{id:message.type.param.id},
                            },
                        });
                    });
                }else if(message.type.page == 'enterprise_detail'){
                    InteractionManager.runAfterInteractions(() => {
                        navigator.push({
                            component: EnterpriseDetailContainer,
                            name: 'EnterpriseDetail',
                            params: {
                                id: message.type.param.id,
                            },
                        });
                    });
                }
            }
        }
    }

    componentWillUnmount(){
        DeviceEventEmitter.removeListener('MiPushMessage',this.onReceivePushMessage);//移除扫描监听
    }

    render () {
        const selectedPerson=(this.state.selectedTab === 'person')
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#2133A7'
                    translucent={true}
                    hidden={false}
                    animated={true}
                    barStyle='light-content'
                />
                <Image source={require('../img/toolbar_bg.png')}  style={{height:100,  width:null, flexDirection: 'row', resizeMode: Image.resizeMode.stretch}}>
                    <View style={{height:100,flexDirection: 'row', alignItems: 'center',justifyContent: 'center',marginBottom:40,marginLeft:25}}>
                    <Image
                        style={{ width: 28, height: 28}}
                        source={require('../img/default_avatar.png')}
                    />
                        <Text  style={{fontSize: 14, color: '#ffffff',marginLeft:10,backgroundColor:'transparent'}}>您好,{this.props.auth.true_name}</Text>
                    </View>



                </Image>
                {selectedPerson && <View style={styles.headerBg}>
                    <Image style={styles.headerImg} source={require("../img/header_default.png")}/>
                </View>}

                <TabNavigator  style={{marginTop: 20, }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="主页"
                        renderIcon={() => <Image source={require("../img/home_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/home_icon.png")} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <HomeContainer navigator={this.props.navigator} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'company'}
                        title="我的企业"
                        renderIcon={() => <Image source={require("../img/company_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/company_icon.png")} />}
                        //renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'company' })}>
                        <UserEnterpriseContainer navigator={this.props.navigator} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'app'}
                        title="应用"
                        renderIcon={() => <Image source={require("../img/app_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/app_icon.png")} />}
                        //renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'app' })}>
                        <ApplicationContainer navigator={this.props.navigator}/>

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'person'}
                        title="我的"
                        renderIcon={() => <Image source={require("../img/person_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/person_icon.png")} />}
                        renderBadge={this.state.messageTips?() => <CustomBadgeView />:() => <View />}
                        onPress={() => this.setState({ selectedTab: 'person' })}>
                        <PersonContainer navigator={this.props.navigator}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        flex: 3,
        fontSize: 18,
        textAlign: 'left',
        color: 'black'
    },
    listView: {
        backgroundColor: '#eeeeec'
    },
    no_data: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    },
    drawerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    drawerIcon: {
        width: 30,
        height: 30,
        marginLeft: 5
    },
    drawerText: {
        fontSize: 18,
        marginLeft: 15,
        textAlign: 'center',
        color: 'black'
    },
    headerBg: {
        alignItems:"center",
        height: 50,
        top: 50,
        width: Dimensions.get('window').width,
        position:"absolute",

    },

    headerImg: {
            width: 80,
            height: 80,
            borderRadius: 44,
    },
});

export default Main;

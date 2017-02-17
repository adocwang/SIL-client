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

class Main extends BasePage {
    constructor() {
        super()

        this.state = {
            selectedTab:'home',
        };

    }
    componentDidMount () {
        console.log('Main componentDidMount');
        const {navigator} = this.props;
       DeviceEventEmitter.addListener('MiPushMessage', function(e: Event) {
            console.log('Main MiPushMessage receive',e);
            if(e.type=='1'){

            }else if(e.type=='2'){
                navigator.push({
                    component: EnterpriseDetailContainer,
                    name: 'EnterpriseDetail',
                    params: {
                        item: '1',
                    },
                });
            }else if(e.type=='3'){
                try {
                    realm.write(() => {
                        realm.create('Message', {
                            img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
                            title:'深圳能源集团股份有限公司',
                            desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
                            cat:'能源  投资  >>',
                            status:'已分配',
                            read:false
                        });
                    });
                    let messages = realm.objects('Message');
                    console.log('messages length',messages.length)
                }catch (err){
                    console.log('realm error',err);
                }
                navigator.push({
                    component: EnterpriseDetailContainer,
                    name: 'EnterpriseDetail',
                    params: {
                        item: '1',
                    },
                });
            }

        });
    }


    componentWillReceiveProps (nextProps) {
        //const {reddit} = this.props;
        //if (reddit.isLoadMore && !nextProps.reddit.isLoadMore && !nextProps.reddit.isRefreshing) {
        //    if (nextProps.reddit.noMore) {
        //        ToastShort('没有更多数据了');
        //    }
        //}
        // 读取

    }


    componentWillUpdate(){
    }

    componentDidUpdate(){
    }

    searchCompany(){
        console.log('search');
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
                        //renderBadge={() => <CustomBadgeView />}
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

import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    RefreshControl,
    TouchableOpacity,
    ProgressBarAndroid,
    InteractionManager
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
import UserEnterpriseContainer from '../containers/UserEnterpriseContainer'


class Main extends React.Component {
    constructor() {
        super()

        this.state = {
            selectedTab:'company',
        };

    }

    componentDidMount () {
        //console.log(this.props);
        //const {dispatch} = this.props;
        //InteractionManager.runAfterInteractions(() => {
        //    _typeIds = [1, 2, 3, 4];
        //    _typeIds.forEach((typeId) => {
        //        dispatch(fetchReddit(false, true, typeId));
        //    });
        //});
        console.log('first componentDidMount is here');
    }

    componentWillReceiveProps (nextProps) {
        //const {reddit} = this.props;
        //if (reddit.isLoadMore && !nextProps.reddit.isLoadMore && !nextProps.reddit.isRefreshing) {
        //    if (nextProps.reddit.noMore) {
        //        ToastShort('没有更多数据了');
        //    }
        //}
        console.log('Main componentWillReceiveProps is here');
        console.log(nextProps);
    }

    shouldComponentUpdate(){
        return true;
    }
    componentWillUpdate(){
    }

    componentDidUpdate(){
    }

    searchCompany(){
        console.log('search');
    }

    render () {
        return (
            <View style={styles.container}>
                <Image source={require('../img/toolbar_bg.png')}  style={{height:100,  width:null, flexDirection: 'row', resizeMode: Image.resizeMode.stretch}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start',justifyContent: 'center',marginLeft:26,marginRight:26}}>
                    <Image
                        style={{ width: 28, height: 28,marginTop:25}}
                        source={require('../img/default_avatar.png')}
                    />
                        <Text  style={{fontSize: 14, color: '#ffffff',marginTop:30,marginLeft:10,backgroundColor:'transparent'}}>您好,{this.props.auth.true_name}</Text>
                    </View>
                </Image>

                <TabNavigator  style={{marginTop: 20, }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="主页"
                        renderIcon={() => <Image source={require("../img/home_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/home_icon.png")} />}
                        badgeText="1"
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
    }
});

export default Main;

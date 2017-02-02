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
import SearchBar from '../components/SearchBar';
import TabNavigator from '../components/bottomtabbar/TabNavigator';
import LoadingView from '../components/LoadingView';
import Spanner from 'react-native-spinkit'
import ClaimContainer from '../containers/ClaimContainer'
import ApplicationContainer from '../containers/ApplicationContainer'

var canLoadMore;
var loadMoreTime = 0;

class Main extends React.Component {
    constructor() {
        super()

        this.state = {
            selectedTab:'home',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
        this.renderItem = this.renderItem.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onScroll = this.onScroll.bind(this);
        canLoadMore = false;
    }
    componentDidMount () {
        console.log(this.props);
        //const {dispatch} = this.props;
        //InteractionManager.runAfterInteractions(() => {
        //    _typeIds = [1, 2, 3, 4];
        //    _typeIds.forEach((typeId) => {
        //        dispatch(fetchReddit(false, true, typeId));
        //    });
        //});
    }

    componentWillReceiveProps (nextProps) {
        //const {reddit} = this.props;
        //if (reddit.isLoadMore && !nextProps.reddit.isLoadMore && !nextProps.reddit.isRefreshing) {
        //    if (nextProps.reddit.noMore) {
        //        ToastShort('没有更多数据了');
        //    }
        //}
    }

    searchCompany(){
        console.log('search');
    }

    onRefresh (typeId) {
        const {dispatch} = this.props;
        canLoadMore = false;
        //dispatch(fetchReddit(true, false, typeId));
    }

    onScroll () {
        if (!canLoadMore) {
            canLoadMore = true;
        }
    }

    onEndReached (typeId) {
        let time = Date.parse(new Date()) / 1000;
        const {home} = this.props;
        if (canLoadMore && time - loadMoreTime > 1) {
            const {dispatch} = this.props;
            //dispatch(fetchReddit(false, false, typeId, true, 25, reddit.redditAfter[typeId]));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }


    onPress (item) {
        const {navigator} = this.props;
        console.log(item);
        let _this = this;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ClaimContainer,
                name: 'Claim',
                params: {
                    item: item,
                    //回调!从SecondPageComponent获取user
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
                    }
                },
            });
        });
    }

    //渲染每页内容
    renderContent (dataSource, typeId) {
        const {home} = this.props;
        if (home.loading) {
            return <LoadingView/>;
        }
        let isEmpty = home.pageList[typeId] == undefined || home.pageList[typeId].length == 0;
        if (isEmpty) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.no_data}
                    style={{flex: 1}}
                    refreshControl={
            <RefreshControl
              refreshing={home.isRefreshing}
              onRefresh={this.onRefresh.bind(this, typeId)}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
                >
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16}}>
                            正在与网络撕扯...
                        </Text>
                    </View>
                </ScrollView>
            );
        }
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={styles.listView}
                onEndReached={this.onEndReached.bind(this, typeId)}
                onEndReachedThreshold={10}
                onScroll={this.onScroll}
                renderFooter={this.renderFooter}
                refreshControl={
          <RefreshControl
            refreshing={home.isRefreshing}
            onRefresh={this.onRefresh.bind(this, typeId)}
            title="Loading..."
            colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000']}
          />
        }
            />
        );
    }


    renderItem (item, sectionID, rowID) {
        const thumbnail = item.img.lastIndexOf("http") >= 0 ? item.img : 'https://www.redditstatic.com/reddit404b.png';

        return (
            <TouchableOpacity onPress={this.onPress.bind(this, item)}>
                <View style={styles.containerItem}>
                    <Image
                        style={{width: 88, height: 88, marginRight: 10,borderRadius:44}}
                        source={{uri: thumbnail}}
                    />
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{flex: 1, fontSize: 14, color: '#ff0000', marginTop: 5, marginRight: 5}}>
                                    {item.desc}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderFooter () {
        const {home} = this.props;
        if (home.isLoadMore) {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Spanner size={30} type='ThreeBounce' color='#c8c8c8'/>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        加载中…
                    </Text>
                </View>
            );
        }
    }

    render () {
        const {home} = this.props;
        console.log(this.props);
        var lists = [];
        home.catList.forEach((cat) => {
            lists.push(
                <View
                    key={cat.id}
                    tabLabel={cat.name}
                    style={{flex: 1}}
                >
                    {this.renderContent(this.state.dataSource.cloneWithRows(home.pageList[cat.id] == undefined ? [] : home.pageList[cat.id]), cat.id)}
                </View>);
        });

        return (
            <View style={styles.container}>
                <Image source={require('../img/toolbar_bg.png')}  style={{height:100,  flexDirection: 'row', resizeMode: Image.resizeMode.stretch}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start',justifyContent: 'center',marginLeft:26,marginRight:26}}>
                    <Image
                        style={{ width: 28, height: 28,marginTop:25}}
                        source={require('../img/default_avatar.png')}
                    />
                        <Text  style={{fontSize: 14, color: '#ffffff',marginTop:30,marginLeft:10}}>您好,唐万兵</Text>
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
                        <View style={{flex:1}}>
                            <SearchBar
                                onSearchChange={() => console.log('On Focus')}
                                onSearch={this.searchCompany.bind(this)}
                                height={30}
                                onFocus={() => console.log('On Focus')}
                                onBlur={() => console.log('On Blur')}
                                placeholder={'Search...'}
                                autoCorrect={false}
                                padding={3}
                                returnKeyType={'search'}
                            />
                            <ScrollableTabView
                                style={{marginTop: 20,flex:1}}
                                renderTabBar={() => <CustomTabBar />}
                            >

                                {lists}
                            </ScrollableTabView>
                    </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'company'}
                        title="我的企业"
                        renderIcon={() => <Image source={require("../img/company_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/company_icon.png")} />}
                        //renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'company' })}>
                        <Text>profile</Text>
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
                        <Text>profile</Text>
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

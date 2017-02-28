/**
 * Created by kiefer on 2017/1/31.
 */
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
import MainTabBar from '../../components/MainTabBar';
import CustomTabBar from '../../components/CustomTabBar';
import Loading from '../../components/Loading';
import Spanner from 'react-native-spinkit'
import ClaimContainer from '../../containers/ClaimContainer'
import EnterpriseDetailContainer from '../../containers/enterprise/EnterpriseDetailContainer'
import ApplicationContainer from '../../containers/ApplicationContainer'
import SearchContainer from '../../containers/SearchContainer'
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import CompanyInfoItem from '../../components/home/CompanyInfoItem'
import RiskInfoItem from '../../components/home/RiskInfoItem'
import RongZiInfoItem from '../../components/home/RongZiInfoItem'
import BasePage from  '../BasePage'
import {fetchHomeEnterpriseList} from '../../actions/home'
import {ToastShort} from '../../utils/ToastUtils'
import * as types from '../../constants/ActionTypes';

var canLoadMore;
var loadMoreTime = 0;

class Home extends BasePage {
    constructor() {
        super()

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
        this.renderFooter = this.renderFooter.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onSearchCompany = this.onSearchCompany.bind(this);
        canLoadMore = false;
    }
    componentDidMount () {
        const {dispatch} = this.props;
        const {home} = this.props;
        InteractionManager.runAfterInteractions(() => {
             dispatch(fetchHomeEnterpriseList(true,false,false,{page:1,only_mine:1}, this.props.auth.token));
        });
        console.log('Home componentDidMount');
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch({type:types.CLEAR_HOME_ENTERPRISE_LIST});
        });
        console.log('Home componentWillUnmount is here');
    }



    onSearchCompany(){
        const {navigator} = this.props;
        navigator.push({
            component: SearchContainer,
            name: 'Search',
        });

    }

    onRefresh (typeId) {
        const {dispatch} = this.props;
        canLoadMore = false;
        dispatch(fetchHomeEnterpriseList(true,false,false,{page:1,only_mine:1}, this.props.auth.token));
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
            dispatch(fetchHomeEnterpriseList(false,false,true,{page:home.pageAfter[1],only_mine:1}, this.props.auth.token));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }


    onPress (item) {
        const {navigator} = this.props;
            navigator.push({
                component: ClaimContainer,
                name: 'Claim',
                params: {
                    item: {id:item.id},
                },
            });
        //navigator.push({
        //    component: EnterpriseDetailContainer,
        //    name: 'EnterpriseDetail',
        //    params: {
        //        id: 21,
        //    },
        //});
    }

    //渲染每页内容
    renderContent (dataSource, typeId) {
        const {home} = this.props;
        if (home.loading[typeId]) {
            return <Loading/>;
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
              refreshing={home.isRefreshing[typeId]}
              onRefresh={this.onRefresh.bind(this, typeId)}
              title="加载中..."
              colors={['#15499A', '#15499A', '#15499A', '#15499A']}
            />
          }
                >
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16}}>
                            暂无数据
                        </Text>
                    </View>
                </ScrollView>
            );
        }else{
            return (
                <ListView
                    initialListSize={1}
                    dataSource={dataSource}
                    renderRow={(item)=>{
                    if(typeId=='1'){
                        return <CompanyInfoItem  {...item} auth={this.props.auth} onClicked={this.onPress.bind(this, item)}/>
                    }else if(typeId=='2'){
                        return <RiskInfoItem  {...item} onClicked={this.onPress.bind(this, item)}/>
                    }else if(typeId=='3'){
                        return <RongZiInfoItem  {...item} onClicked={this.onPress.bind(this, item)}/>
                    }
                }}
                    style={styles.listView}
                    onEndReached={this.onEndReached.bind(this, typeId)}
                    onEndReachedThreshold={10}
                    onScroll={this.onScroll}
                    renderFooter={this.renderFooter.bind(this, typeId)}
                    refreshControl={
          <RefreshControl
            refreshing={home.isRefreshing[typeId]}
            onRefresh={this.onRefresh.bind(this, typeId)}
            title="加载中..."
            colors={['#15499A', '#15499A', '#15499A', '#15499A']}
          />
        }
                />
            );
        }
    }

    renderFooter (typeId) {
        const {home} = this.props;
        if (home.isLoadMore[typeId]) {
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
                    <TouchableOpacity onPress={this.onSearchCompany}>
                            <View   style={styles.searchBar}>
                                <Text style={styles.searchBarInput}>输入企业名称</Text>
                                <View >
                                    <Image
                                        style={{}}
                                        source={require('../../img/search_icon.png')}
                                    />
                                   </View>
                            </View>
                    </TouchableOpacity>
                            <ScrollableTabView
                                onChangeTab={(item)=>{this.setState({tabIndex:item.i})}}
                                style={{marginTop: 20,flex:1}}
                                renderTabBar={() => <CustomTabBar  />}
                            >

                                {lists}
                            </ScrollableTabView>
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
        backgroundColor: '#f2f2f2'
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
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: '#2133A7',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius:30,
        height: 35,
        marginLeft: 10,
        marginRight:10
    },
    searchBarInput: {
        flex: 1,
        fontWeight: 'normal',
        color: '#9B9B9B',
        paddingLeft:10,
        backgroundColor: 'transparent',
    },
});

export default Home;

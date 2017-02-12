/**
 * Created by kiefer on 2017/2/3.
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
import MainTabBar from '../components/MainTabBar';
import UserLoanTabBar from '../components/UserLoanTabBar';
import Loading from '../components/Loading';
import Spanner from 'react-native-spinkit'
import ClaimContainer from '../containers/ClaimContainer'
import EnterpriseDetailContainer from '../containers/enterprise/EnterpriseDetailContainer'
import ApplicationContainer from '../containers/ApplicationContainer'
import SearchContainer from '../containers/SearchContainer'
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import UserLoanItem from '../components/loan/UserLoanItem'
import BasePage from  './BasePage'
import {fetchUserLoanList} from '../actions/userloan'
import {ToastShort} from '../utils/ToastUtils'

var canLoadMore;
var loadMoreTime = 0;

class UserLoan extends BasePage {
    constructor() {
        super()

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
        this.state.tabIndex = 0;
        this.renderFooter = this.renderFooter.bind(this);
        this.onScroll = this.onScroll.bind(this);
        canLoadMore = false;
    }
    componentDidMount () {
        const {dispatch} = this.props;
        const {userloan} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchUserLoanList(false,true,false,{page:userloan.pageAfter[1]}, this.props.auth.token,this.state.tabIndex));
        });
    }

    componentWillUpdate(){
    }

    componentDidUpdate(){
    }


    onRefresh (typeId) {
        const {dispatch} = this.props;
        canLoadMore = false;
        dispatch(fetchUserLoanList(true,false,false,{page:1}, this.props.auth.token,this.state.tabIndex));
    }

    onScroll () {
        if (!canLoadMore) {
            canLoadMore = true;
        }
    }

    onEndReached (typeId) {
        let time = Date.parse(new Date()) / 1000;
        const {userloan} = this.props;
        if (canLoadMore && time - loadMoreTime > 1) {
            const {dispatch} = this.props;
            dispatch(fetchUserLoanList(false,false,true,{page:userloan.pageAfter[1]}, this.props.auth.token,this.state.tabIndex));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }

    onTabChanged(index){
        this.setState({tabIndex:index});
        const {userloan} = this.props;
        var tabIndex = index + 1;
        if(userloan.pageList[tabIndex].length ==0 && tabIndex !=1){
            const {dispatch} = this.props;

            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchUserLoanList(false,true,false,{page:userloan.pageAfter[tabIndex]}, this.props.auth.token,this.state.tabIndex));
            });
        }
    }

    onPress (item) {
        const {navigator} = this.props;
            navigator.push({
                component: EnterpriseDetailContainer,
                name: 'EnterpriseDetail',
                params: {
                    id: item.id,
                },
            });

    }

    //渲染每页内容
    renderContent (dataSource, typeId) {
        const {userloan} = this.props;
        if (userloan.loading[typeId]) {
            return <Loading/>;
        }
        let isEmpty = userloan.pageList[typeId] == undefined || userloan.pageList[typeId].length == 0;
        if (isEmpty) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.no_data}
                    style={{flex: 1}}
                    refreshControl={
            <RefreshControl
              refreshing={userloan.isRefreshing[typeId]}
              onRefresh={this.onRefresh.bind(this, typeId)}
              title="Loading..."
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
        }

        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={(item)=>{
                        return <UserLoanItem  {...item.enterprise} onClicked={this.onPress.bind(this, item.enterprise)}/>
                }}
                style={styles.listView}
                onEndReached={this.onEndReached.bind(this, typeId)}
                onEndReachedThreshold={10}
                onScroll={this.onScroll}
                renderFooter={this.renderFooter.bind(this, typeId)}
                refreshControl={
          <RefreshControl
            refreshing={userloan.isRefreshing[typeId]}
            onRefresh={this.onRefresh.bind(this, typeId)}
            title="Loading..."
            colors={['#15499A', '#15499A', '#15499A', '#15499A']}
          />
        }
            />
        );
    }

    renderFooter (typeId) {
        const {userloan} = this.props;
        if (userloan.isLoadMore[typeId]) {
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
        const {userloan} = this.props;
        var lists = [];
        userloan.catList.forEach((cat) => {
            lists.push(
                <View
                    key={cat.id}
                    tabLabel={cat.name}
                    style={{flex: 1}}
                >
                    {this.renderContent(this.state.dataSource.cloneWithRows(userloan.pageList[cat.id] == undefined ? [] : userloan.pageList[cat.id]), cat.id)}
                </View>);
        });

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    onChangeTab={(item)=>{this.onTabChanged(item.i)}}
                    style={{flex:1}}
                    renderTabBar={() => <UserLoanTabBar  />}
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
        height: 40,
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

export default UserLoan;

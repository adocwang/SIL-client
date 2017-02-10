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
import UserEnterpriseTabBar from '../components/UserEnterpriseTabBar';
import LoadingView from '../components/LoadingView';
import Spanner from 'react-native-spinkit'
import ClaimContainer from '../containers/ClaimContainer'
import EnterpriseDetailContainer from '../containers/enterprise/EnterpriseDetailContainer'
import CompanyInfoItem from '../components/home/CompanyInfoItem'
import BasePage from './BasePage'

var canLoadMore;
var loadMoreTime = 0;

class UserEnterprise extends BasePage {
    constructor() {
        super()

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
        this.renderFooter = this.renderFooter.bind(this);
        this.onScroll = this.onScroll.bind(this);
        canLoadMore = false;
    }
    componentDidMount () {
    }

    componentWillReceiveProps (nextProps) {

    }


    componentWillUpdate(){
    }

    componentDidUpdate(){
    }


    onScroll () {
        if (!canLoadMore) {
            canLoadMore = true;
        }
    }

    onEndReached (typeId) {
        let time = Date.parse(new Date()) / 1000;
        const {userenterprise} = this.props;
        if (canLoadMore && time - loadMoreTime > 1) {
            const {dispatch} = this.props;
            //dispatch(fetchReddit(false, false, typeId, true, 25, reddit.redditAfter[typeId]));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }


    onPress (item) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: EnterpriseDetailContainer,
                name: 'EnterpriseDetail',
                params: {
                    id: 21,
                },
            });
        });
    }

    //渲染每页内容
    renderContent (dataSource, typeId) {
        const {userenterprise} = this.props;
        if (userenterprise.loading) {
            return <LoadingView/>;
        }
        let isEmpty = userenterprise.pageList[typeId] == undefined || userenterprise.pageList[typeId].length == 0;
        if (isEmpty) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.no_data}
                    style={{flex: 1}}
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
                renderRow={(item)=>{  return <CompanyInfoItem  {...item} onClicked={this.onPress.bind(this, item)}/> }}
                style={styles.listView}
                onEndReached={this.onEndReached.bind(this, typeId)}
                onEndReachedThreshold={10}
                onScroll={this.onScroll}
                renderFooter={this.renderFooter}/>
        );
    }



    renderFooter () {
        const {userenterprise} = this.props;
        if (userenterprise.isLoadMore) {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        加载中…
                    </Text>
                </View>
            );
        }
    }

    render () {
        const {userenterprise} = this.props;
        var lists = [];
        userenterprise.catList.forEach((cat) => {
            lists.push(
                <View
                    key={cat.id}
                    tabLabel={cat.name}
                    style={{flex: 1}}
                >
                    {this.renderContent(this.state.dataSource.cloneWithRows(userenterprise.pageList[cat.id] == undefined ? [] : userenterprise.pageList[cat.id]), cat.id)}
                </View>);
        });

        return (
            <View style={styles.container}>

                <ScrollableTabView
                    style={{flex:1}}
                    renderTabBar={() => <UserEnterpriseTabBar redCounts={[1,2,3]} />}
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

export default UserEnterprise;

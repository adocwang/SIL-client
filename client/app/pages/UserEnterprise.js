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

var canLoadMore;
var loadMoreTime = 0;

class UserEnterprise extends React.Component {
    constructor() {
        super()

        this.state = {
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
    }

    componentWillReceiveProps (nextProps) {

    }

    shouldComponentUpdate(){
        return true;
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
        // console.log(item);
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
                renderRow={this.renderItem}
                style={styles.listView}
                onEndReached={this.onEndReached.bind(this, typeId)}
                onEndReachedThreshold={10}
                onScroll={this.onScroll}
                renderFooter={this.renderFooter}/>
        );
    }


    renderItem (item) {
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
        const {userenterprise} = this.props;
        if (userenterprise.isLoadMore) {
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

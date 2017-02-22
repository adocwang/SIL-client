/**
 * Created by kiefer on 2017/2/7.
 */
import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    InteractionManager
} from 'react-native';
import EnterpriseDetailContainer from '../containers/enterprise/EnterpriseDetailContainer'
import ClaimContainer from '../containers/ClaimContainer'
import {ToastShort} from '../utils/ToastUtils';
import MessageItem from '../components/home/MessageItem';
import BasePage from './BasePage'
import CustomToolbar from '../components/CustomToolbar'
import * as types from '../constants/ActionTypes';
import {fetcMessageSet,fetchMessageList} from  '../actions/message'
import Spanner from 'react-native-spinkit'
var canLoadMore;
var loadMoreTime = 0;

class Message extends BasePage {
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

    componentDidMount() {
        const {dispatch} = this.props;
        const {auth} = this.props;
        canLoadMore = false;
        setTimeout(function() {
            dispatch(fetchMessageList(true,false,false,{page:1,page_limit:50}, auth.token));
        },500);
    }

    refreshList(){
        const {dispatch} = this.props;
        canLoadMore = false;
        dispatch(fetchMessageList(true,false,false,{page:1,page_limit:50}, this.props.auth.token));
    }


    onPress (item) {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetcMessageSet(item.id,this.props.auth.token));
        });

        const {navigator} = this.props;
        if(item.type && item.type.page && item.type.param && item.type.param.id){
            if(item.type.page == 'enterprise_operation'){
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: ClaimContainer,
                        name: 'Claim',
                        params: {
                            item:{id:item.type.param.id},
                        },
                    });
                });
            }else if(item.type.page == 'enterprise_detail'){
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: EnterpriseDetailContainer,
                        name: 'EnterpriseDetail',
                        params: {
                            id: item.type.param.id,
                        },
                    });
                });
            }
        }

    }


    renderItem (item) {
        return <MessageItem  {...item} onClicked={this.onPress.bind(this, item)}/>
    }

    onScroll () {
        if (!canLoadMore) {
            canLoadMore = true;
        }
    }

    onEndReached () {
        let time = Date.parse(new Date()) / 1000;
        const {message} = this.props;
        if (canLoadMore && time - loadMoreTime > 1) {
            const {dispatch} = this.props;
            dispatch(fetchMessageList(false,false,true,{page:message.pageAfter,page_limit:50}, this.props.auth.token));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }

    renderFooter () {
        const {message} = this.props;
        if (message.isLoadMore) {
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
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="消息中心"
                    navigator={navigator}/>
                {this.props.message.messageList.length==0?<View style={{alignItems: 'center',flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize: 16}}>
                        暂无数据
                    </Text>
                </View>:
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.message.messageList)}
                    renderRow={this.renderItem}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={10}
                    onScroll={this.onScroll}
                    style={styles.listView}
                    renderFooter={this.renderFooter.bind(this)}
                    refreshControl={
                    <RefreshControl
                    refreshing={this.props.message.isRefreshing}
                    onRefresh={this.refreshList.bind(this)}
                    title="加载中..."
                    colors={['#15499A', '#15499A', '#15499A', '#15499A']}
                    />}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
    listView: {
        marginTop:20,
    },

});

export default Message;
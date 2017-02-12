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
import {ToastShort} from '../utils/ToastUtils';
import MessageItem from '../components/home/MessageItem';
import BasePage from './BasePage'
import CustomToolbar from '../components/CustomToolbar'
import * as types from '../constants/ActionTypes';

class Message extends BasePage {
    constructor() {
        super()
        this.state = {
            enterprise:'测试1科技有限公司',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };

        this.renderItem = this.renderItem.bind(this);
    }

    refreshList(){
        const {dispatch} = this.props;
        dispatch({type:types.FETCH_MESSAGE_LIST});
        dispatch({type:types.RECEIVE_MESSAGE_LIST});
    }


    onPress (item) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: EnterpriseDetailContainer,
                name: 'EnterpriseDetail',
                params: {
                    id: item.item_id,
                },
            });
        });
    }


    renderItem (item) {
        return <MessageItem  {...item} onClicked={this.onPress.bind(this, item)}/>
    }



    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="消息中心"
                    navigator={navigator}/>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.message.messageList)}
                    renderRow={this.renderItem}
                    refreshControl={
                    <RefreshControl
                    refreshing={this.props.message.isRefreshing}
                    onRefresh={this.refreshList.bind(this)}
                    title="Loading..."
                    colors={['#15499A', '#15499A', '#15499A', '#15499A']}
                    />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },

});

export default Message;
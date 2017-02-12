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
    InteractionManager
} from 'react-native';
import EnterpriseDetailContainer from '../containers/enterprise/EnterpriseDetailContainer'
import {ToastShort} from '../utils/ToastUtils';
import MessageItem from '../components/home/MessageItem';
import BasePage from './BasePage'
import CustomToolbar from '../components/CustomToolbar'

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
    componentDidMount () {
    }

    componentWillReceiveProps (nextProps) {

    }


    componentWillUpdate(){
    }

    componentDidUpdate(){
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
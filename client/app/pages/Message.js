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
import CompanyInfoItem from '../components/home/CompanyInfoItem';

class Message extends React.Component {
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
        console.log(this.props);
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



    onPress (item) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: EnterpriseDetailContainer,
                name: 'EnterpriseDetail',
                params: {
                    item: item,
                },
            });
        });
    }


    renderItem (item) {
        return <CompanyInfoItem  {...item} onClicked={this.onPress.bind(this, item)}/>
    }



    render () {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.message.messageList)}
                    renderRow={this.renderItem}
                    style={styles.listView}
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
    listView: {
        backgroundColor: '#f2f2f2',
        paddingTop:5
    },

});

export default Message;
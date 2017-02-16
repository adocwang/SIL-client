/**
 * Created by kiefer on 2017/2/16.
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
import Markdown from '../../components/markdown/Markdown';
import CustomToolbar from '../../components/CustomToolbar';
import EnterpriseDetailContainer from '../../containers/enterprise/EnterpriseDetailContainer'
import {ToastShort} from '../../utils/ToastUtils';
import {fetchResponseList,fetchResponseDetail} from '../../actions/application';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading'
import BasePage from  '../BasePage'

class Response extends BasePage {
    constructor() {
        super()
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };

        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount () {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchResponseList({page:1,page_limit:100}, this.props.auth.token));
        });
    }

    componentWillReceiveProps (nextProps) {

    }

    onPress (item) {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchResponseDetail(item.id, this.props.auth.token));
        });
    }

    renderItem (item) {
        return (
            <TouchableOpacity onPress={this.onPress.bind(this, item)}>
                <View style={styles.containerItem}>
                        <Text style={styles.itemText}>
                            {item.title}
                        </Text>
                </View>
            </TouchableOpacity>
        );
    }



    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="话术"
                    navigator={navigator}/>
                <View style={{flex:1}}>
                {this.props.response.responseList.length >0&&
                <View style={{flex:1,flexDirection:'row'}}>
                    <ListView
                        style={styles.listView}
                        dataSource={this.state.dataSource.cloneWithRows(this.props.response.responseList)}
                        renderRow={this.renderItem}
                    />
                    <View style={styles.detailContainer}>
                        <Markdown>
                            {this.props.response.responseDetail}
                        </Markdown>
                    </View>
                </View>
                }
                {this.props.response.loading&&<Loading backgroundColor = 'rgba(255,255,255,0.5)'/>
                }</View>
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
        flex: 1,//可拉伸
        backgroundColor:'#f7f7f7'
    },
    containerItem: {
        flex: 1,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText:{
        fontSize:14,
        color:'#9B9B9B',
    },
    responseDetail:{
        color:'#9B9B9B',
        fontSize:12
    },
    detailContainer:{
        flex:4,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20
    }
});

export default Response;

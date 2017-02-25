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
    WebView,
    Platform,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import Markdown from '../../components/markdown/Markdown';
import CustomToolbar from '../../components/CustomToolbar';
import ResponseSearchContainer from '../../containers/ResponseSearchContainer'
import {ToastShort} from '../../utils/ToastUtils';
import {fetchResponseList,fetchResponseDetail} from '../../actions/application';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading'
import BasePage from  '../BasePage'
import * as types from '../../constants/ActionTypes';
import marked from 'marked'

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

    componentWillUnmount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch({type:types.CLEAR_RESPONSE});
        });
    }

    componentWillReceiveProps (nextProps) {

    }

    gotoSearch(){
        const {navigator} = this.props;
        navigator.push({
            component: ResponseSearchContainer,
            name: 'ResponseSearch',
        });
    }

    onPress (item) {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchResponseDetail(item.id, this.props.auth.token));
        });
    }

    renderItem (item) {
        const {response} = this.props;
        return (
            <TouchableOpacity key = {item.id} onPress={this.onPress.bind(this, item)}>
                <View style={response.chooseItem.id == item.id?styles.containerChooseItem:styles.containerItem}>
                        <Text style={response.chooseItem.id == item.id?styles.itemChooseText:styles.itemText}>
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
                    searchIcon={true}
                    onOperateClicked = {()=>this.gotoSearch()}
                    navigator={navigator}/>
                <View style={{flex:1,marginTop:30}}>
                {this.props.response.responseList.length >0&&
                <View style={{flex:1,flexDirection:'row'}}>
                    <ListView
                        style={styles.listView}
                        dataSource={this.state.dataSource.cloneWithRows(this.props.response.responseList)}
                        renderRow={this.renderItem}
                    />
                    <View style={styles.detailContainer}>

                        <WebView
                            ref='webview'
                            automaticallyAdjustContentInsets={false}
                            style={{flex: 1,backgroundColor: 'transparent'}}
                            source={{html: Platform.OS === 'android'?marked(this.props.response.chooseItem.content):
                            ("<div style='font-size: 50px'>" + marked(this.props.response.chooseItem.content) + "</div>")}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            scalesPageToFit={true}
                            decelerationRate="normal"
                            onShouldStartLoadWithRequest={(event) => {return true;}}
                        />
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
        backgroundColor:'#f7f7f7'
    },
    containerChooseItem: {
        flex: 1,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffffff'
    },
    itemText:{
        fontSize:14,
        color:'#9B9B9B',
    },
    itemChooseText:{
        fontSize:14,
        color:'#4a4a4a',
    },
    responseDetail:{
        color:'#9B9B9B',
        fontSize:12
    },
    detailContainer:{
        flex:3,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20
    }
});

export default Response;

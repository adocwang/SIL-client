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
import CustomToolbar from '../../components/CustomToolbar';
import {ToastShort} from '../../utils/ToastUtils';
import {fetchSearchResponse} from '../../actions/application';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading'
import BasePage from  '../BasePage'
import * as types from '../../constants/ActionTypes';

class ResponseSearch extends BasePage {
    constructor() {
        super()
        this.state = {
            keyword:'',
        };

        this.searchResponse = this.searchResponse.bind(this);
    }


    componentWillUnmount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch({type:types.CLEAR_RESPONSE_SEARCH});
        });
    }

    searchResponse(){
        if(this.state.keyword==''){
            ToastShort('请输入话术关键词');
            return false;
        }
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchSearchResponse(this.state.keyword,this.props.auth.token));
        });
    }



    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="搜索"
                    navigator={navigator}/>
                <View   style={styles.searchBar}>
                    <TextInput   onChangeText={(keyword) => this.setState({keyword})} keyboardType="web-search" onSubmitEditing={this.searchResponse}
                                 value={this.state.keyword} style = {styles.searchBarInput}
                                 placeholder='话术关键词' underlineColorAndroid="transparent" />
                    <TouchableOpacity onPress={this.searchResponse}>
                        <View >
                            <Image
                                style={{width:78,height:40}}
                                source={require('../../img/search_icon.png')}
                            />
                        </View></TouchableOpacity>
                </View>

                <View style={{flex:1,padding:10}}>
                    {this.props.responsesearch.searchResult !=''&&
                    <WebView
                        ref='webview'
                        automaticallyAdjustContentInsets={false}
                        style={{flex: 1}}
                        source={{html: Platform.OS === 'android'?this.props.responsesearch.searchResult:
                            ("<div style='font-size: 50px'>" + this.props.responsesearch.searchResult + "</div>")}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        scalesPageToFit={true}
                        decelerationRate="normal"
                        onShouldStartLoadWithRequest={(event) => {return true}}
                    />
                    }
                    {this.props.responsesearch.loading&&<Loading backgroundColor = 'rgba(255,255,255,0.5)'/>
                    }
                </View>
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
        padding:20
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
    },
    itemText:{
        fontSize:14
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
        marginLeft: 20,
        marginRight:20,
        marginTop:30,

    },
    searchBarInput: {
        flex: 1,
        fontWeight: 'normal',
        color: '#9B9B9B',
        paddingLeft:10,
        backgroundColor: 'transparent',
        fontSize:14
    },
});

export default ResponseSearch;

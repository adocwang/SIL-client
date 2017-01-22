/**
 * Created by kiefer on 2017/1/22.
 */
import React from 'react';
import {fetchTest} from '../actions/test';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    View
    } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import CustomToolbar from '../components/CustomToolbar';
import Button from '../components/Button';

class Login extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(fetchTest());
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchTest());
        });
       console.log(this.props)
    }


    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="登录"
                    navigator={navigator}
                />
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Image
                            style={{width: 110, height: 110, marginTop: 50}}
                            source={require('../img/about_logo.png')}
                        />
                     </View>
                <Text style={{fontSize: 16, textAlign: 'center', color: '#aaaaaa', marginTop: 5}}>
                    {this.props.test.data}
                </Text>
                <View style={styles.inputview}>
                    <View style={styles.rowview}>
                    <TextInput style = {styles.textinput} placeholder='请输入手机号码' underlinecolorandroid='transparent'/>
                        <View style={{alignItems:'center',flex:1,justifyContent:'center'}}><Text style={styles.sendMsg}>发送验证码</Text></View>
                        </View>
                    <TextInput style = {styles.textinput} placeholder='请输入四位验证码' underlinecolorandroid='transparent'/>
                    <TextInput style = {styles.textinput} placeholder='请输入密码' secureTextEntry ={true} underlinecolorandroid='transparent'/>
                </View>

                <View style={styles.buttomview}>
                    <View style={styles.buttonview}>
                        <Text style={styles.logintext}>登 录</Text>
                    </View>

                    <View style={styles.emptyview}></View>

                    <View style={styles.bottombtnsview}>
                        <View style={styles.bottomleftbtnview}>
                            <Text style={styles.bottombtn}>无法登录？</Text>
                        </View>
                        <View style={styles.bottomrightbtnview}>
                            <Text style={styles.bottombtn}>新用户</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#F5FCFF',
    },
    header: {//头部高度
        height: 50,
        justifyContent:'center',//水平方向
    },
    headtitle: {//头部标题
        alignSelf:'center',
        fontSize: 18,
        color:'#000000',
    },
    avatarview: {//登录图标区域
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {//登录图标
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    inputview: {//用户名/密码区域
        height: 150,
    },
    rowview:{
        flexDirection:'row'
    },
    textinput: {//用户名/密码输入框
        flex: 2,
        borderWidth: 0,
        fontSize: 16,
    },
    sendMsg: {//用户名/密码输入框
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical:'center',
    },
    dividerview: {//分割线区域
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    buttomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
    },
    buttonview: {
        flexDirection: 'row',
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        alignSelf:'center',
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    },
});

export default Login;
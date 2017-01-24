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
    TouchableHighlight,
    View
    } from 'react-native';
import PageToolbar from '../components/PageToolBar';
import MainContainer from '../containers/MainContainer';
import ResetPwdContainer from '../containers/ResetPwdContainer';

class Login extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
       // const {dispatch} = this.props;
       // dispatch(fetchTest());
       // InteractionManager.runAfterInteractions(() => {
       //     dispatch(fetchTest());
       // });
       console.log(this.props)
    }

    onSubmitBtnClick(){
        console.log(this.props);
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({
                component: MainContainer,
                name: 'Main'
            });
        });
    }

    onResetPwdBtnClick(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ResetPwdContainer,
                name: 'ResetPwd'
            });
        });
    }

    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <PageToolbar
                    title="登录"
                    navigator={navigator}
                />
                <View style={{height:1}}>
                    <Text style={{flex:1, flexDirection: 'row',backgroundColor:'#ECEDF1'}}></Text>
                </View>

                <View style={{height:105,alignItems: 'center'}}>
                    <Image
                        style={{ width: 134, height: 45,marginTop:30}}
                        source={require('../img/login_logo.png')}
                    />
                </View>
                <View style={{height:2, flexDirection:'row'}}>
                    <View
                        style={{flex:3, backgroundColor:'#15499A'}}
                    />
                    <View
                        style={{flex:1, backgroundColor:'#D93741'}}
                    />
                </View>

                <View style={styles.inputview}>
                    <TextInput style = {styles.textinput} placeholder='请输入手机号码' underlinecolorandroid='transparent'/>
                    <TextInput style = {styles.textinput} placeholder='请输入密码' secureTextEntry ={true} underlinecolorandroid='transparent'/>
                </View>

                <View style={styles.buttomview}>
                    <TouchableHighlight onPress={this.onResetPwdBtnClick.bind(this)}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <Text style={styles.lightblue}>忘记密码？</Text>
                    </View>
                        </TouchableHighlight>
                    <TouchableHighlight onPress={this.onSubmitBtnClick.bind(this)}>
                    <View style={styles.buttonview} >
                        <Text style={styles.logintext} >登录</Text>
                    </View>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
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
        justifyContent: 'center',
    },
    avatarimage: {//登录图标
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    inputview: {//用户名/密码区域
        height: 140,
        marginTop:30,
        marginLeft:10,
        marginRight:10
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
        color:'#15499A'
    },
    dividerview: {//分割线区域
        flexDirection: 'row',
    },
    divider: {
        backgroundColor: '#ECEDF1'
    },
    buttomview: {
        flex: 1,
        marginTop:30
    },
    buttonview: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#15499A',
        borderWidth: 1,
    },
    logintext: {
        alignSelf:'center',
        fontSize: 17,
        color: '#15499A',
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
    lightblue:{
        fontSize: 14,color: '#4A90E2',
        marginBottom:10
    },
    redtxt:{
        fontSize: 14,color: '#D0021B',marginLeft:5
    }
});

export default Login;
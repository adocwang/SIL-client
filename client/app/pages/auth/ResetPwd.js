/**
 * Created by kiefer on 2017/1/24.
 */

import React from 'react';
import {fetchTest} from '../../actions/test';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';
import PageToolbar from '../../components/PageToolBar';
import MainContainer from '../../containers/MainContainer';
import CountDown from '../../components/CountDown'
import {fetchSmsCode,fetchSmsLogin,fetchUserSet} from  '../../actions/auth'
import Loading from '../../components/Loading'
import {ToastShort} from '../../utils/ToastUtils';

class ResetPwd extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            phone:'13547926578',
            code:'6666',
            password:'111111',
            loading:false,
            showTips:false
        };
    }

    componentDidMount () {
        // const {dispatch} = this.props;
        // dispatch(fetchTest());
        // InteractionManager.runAfterInteractions(() => {
        //     dispatch(fetchTest());
        // });

    }

    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps',nextProps);
        this.setState({loading:nextProps.auth.loading})
        if(this.props.auth.id == 0 && nextProps.auth.id!=0 && nextProps.auth.token!=''){
            const {dispatch} = this.props;
            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchUserSet({user_id:nextProps.auth.id,password:this.state.password},nextProps.auth.token));
            });
        }else if(this.props.auth.id != 0 && this.props.auth.token !=''){
            const {navigator} = this.props;
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: MainContainer,
                    name: 'Main'
                });
            });
        }
    }

    onShowTipsBtnClick(){
        this.setState({showTips:true})
    }

    onActiveBtnClick(){
        if(!(/^1[34578]\d{9}$/.test(this.state.phone))){
            ToastShort('手机号码有误，请重填');
            return false;
        }
        if(this.state.password==''){
            ToastShort('密码不能为空');
            return false;
        }
        if(this.state.code==''){
            ToastShort('验证码不能为空');
            return false;
        }

        this.setState({loading: true});
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchSmsLogin({phone:this.state.phone,code:this.state.code}));
        });


        //const {navigator} = this.props;
        //InteractionManager.runAfterInteractions(() => {
        //    navigator.resetTo({
        //        component: MainContainer,
        //        name: 'Main'
        //    });
        //});
    }

    onSendMsgCode(){
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchSmsCode(this.state.phone));
        });
    }

    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <PageToolbar
                    title="激活账户"
                    navigator={navigator}
                />
                <View style={{height:1}}>
                    <Text style={{flex:1, flexDirection: 'row',backgroundColor:'#ECEDF1'}}></Text>
                </View>

                <ScrollView>
                    <View style={styles.inputview}>
                        <View style={styles.rowview}>
                            <View style={{ borderBottomColor: '#15499A', borderBottomWidth: 1,flex:1}}>
                                <TextInput  underlineColorAndroid='transparent'  onChangeText={(phone) => this.setState({phone})} value={this.state.phone} style = {styles.textinput} placeholder='请输入手机号码' underlinecolorandroid='transparent'/>
                            </View>
                            <CountDown
                                onPress={this.onSendMsgCode.bind(this)} //default null
                                text={'发送验证码'} //default ''
                                time={60} //default 60
                                buttonStyle={{marginTop:10}}
                                textStyle={{color:'#15499A'}} //default black
                                disabledTextStyle={{color:'#15499A'}} //default gray
                            />
                        </View>
                        <View style={{ borderBottomColor: '#15499A', borderBottomWidth: 1,flex:1}}>
                            <TextInput underlineColorAndroid='transparent'  onChangeText={(code) => this.setState({code})} value={this.state.code} style = {styles.textinput} placeholder='请输入四位验证码' underlinecolorandroid='transparent'/>
                        </View>
                        <View style={{ borderBottomColor: '#15499A', borderBottomWidth: 1,flex:1}}>
                            <TextInput underlineColorAndroid='transparent'  onChangeText={(password) => this.setState({password})} value={this.state.password} style = {styles.textinput} placeholder='请输入密码' secureTextEntry ={true} underlinecolorandroid='transparent'/>
                        </View>
                    </View>

                    <View style={styles.buttomview}>
                        <TouchableOpacity onPress={this.onActiveBtnClick.bind(this)}>
                            <View style={styles.buttonview} >
                                <Text style={styles.logintext} >激活账户</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onShowTipsBtnClick.bind(this)}>
                            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                                <Text style={styles.lightblue}>没有收到验证码？</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.showTips? <View style={{alignItems:'center',marginTop:20}}>
                        <Text style={{fontSize:12,color:'#626262'}}>1.手机号码输入错误。</Text>
                        <Text style={{fontSize:12,color:'#626262'}}>2.手机号未被预设置为账号，请联系管理员。</Text>
                    </View>:<View/>}
                </ScrollView>
                {
                    this.state.loading?<Loading/>:<View></View>
                }
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
        height: 200,
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
        fontSize: 14,color: '#4A90E2'
    },
    redtxt:{
        fontSize: 14,color: '#D0021B',marginLeft:5
    }
});

export default ResetPwd;

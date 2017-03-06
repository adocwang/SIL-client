/**
 * Created by kiefer on 2017/1/24.
 */

import React from 'react';
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
import LoginContainer from '../../containers/LoginContainer';
import CountDown from '../../components/CountDown'
import {fetchSmsCode,fetchSmsLogin,fetchUserSet} from  '../../actions/auth'
import Loading from '../../components/Loading'
import {ToastShort} from '../../utils/ToastUtils';
import styles from '../../style/CommonStyle'

class Active extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            phone:'',
            code:'',
            password:'',
            loading:false,
            showTips:false
        };
        if (this.props.route.params && this.props.route.params.type) {
            this.state.type  = this.props.route.params.type;
        }
    }

    componentDidMount () {
        // const {dispatch} = this.props;
        // dispatch(fetchTest());
        // InteractionManager.runAfterInteractions(() => {
        //     dispatch(fetchTest());
        // });

    }

    componentWillReceiveProps (nextProps) {
        this.setState({loading:false});

        if(this.props.auth.id == 0 && nextProps.auth.id!=0 && nextProps.auth.token!=''){
            const {dispatch} = this.props;
            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchUserSet({user_id:nextProps.auth.id,new_password:this.state.password},nextProps.auth.token));
            });
        }else if(this.props.auth.id != 0 && this.props.auth.token !='' && nextProps.auth.code!=undefined && nextProps.auth.code==0){
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

    onLoginBtnClick(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({
                component: LoginContainer,
                name: 'Login',
            });
        });
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

            <Image source={require('../../img/auth_bg.png')}
                   style={{resizeMode: Image.resizeMode.stretch,flex:2,justifyContent:'center',alignItems:'center',}}>
                <Image source = {require('../../img/espe_logo.png')} style={{marginBottom:60}}/>
                <TextInput underlineColorAndroid='transparent' onChangeText={(phone) => this.setState({phone})}
                           value={this.state.phone} style={styles.authInput} placeholder='请输入手机号码'/>
                <CountDown
                    onPress={this.onSendMsgCode.bind(this)} //default null
                    text={'发送验证码'} //default ''
                    time={60} //default 60
                    buttonStyle={{marginTop:10}}
                    textStyle={{color:'#000000'}} //default black
                />
                <TextInput underlineColorAndroid='transparent'  onChangeText={(code) => this.setState({code})} value={this.state.code} style ={[styles.authInput,{marginTop:20}]} placeholder='请输入四位验证码' underlinecolorandroid='transparent'/>
                <TextInput underlineColorAndroid='transparent'
                           onChangeText={(password) => this.setState({password})} value={this.state.password}
                           style={[styles.authInput,{marginTop:40}]} placeholder='请输入密码' secureTextEntry={true}/>
            </Image>

            <View style={{paddingTop:30,flex:1,alignItems:'center'}}>

                <TouchableOpacity onPress={this.onActiveBtnClick.bind(this)}>
                    <View style={styles.btnBorderBule} >
                        {this.state.type=='active'? <Text style={styles.textWhite14} >激活账户</Text>: <Text style={styles.textWhite14} >重置密码</Text>}

                    </View>
                </TouchableOpacity>
                {this.state.type=='active'&&
                    <View style={{flexDirection:'row',marginTop:20}}><Text style={styles.textGray14}>已经激活,直接</Text>
                <TouchableOpacity onPress={this.onLoginBtnClick.bind(this)}>
                    <View >
                        <Text style={[styles.textBlue14,{marginTop:1}]}>登录</Text>
                    </View>
                </TouchableOpacity></View>}

                <TouchableOpacity onPress={this.onShowTipsBtnClick.bind(this)}>
                    <View style={{marginTop:20}}>
                        <Text style={styles.textBlue14}>没有收到验证码？</Text>
                    </View>
                </TouchableOpacity>
                {this.state.showTips&& <View style={{alignItems:'center',marginTop:20}}>
                    <Text style={styles.textGray10}>1.手机号码输入错误。</Text>
                    <Text style={styles.textGray10}>2.手机号未被预设置为账号，请联系管理员。</Text></View>
                }
            </View>
            {
                this.state.loading ? <Loading backgroundColor='rgba(255,255,255,0.5)'/> : <View></View>
            }
        </View>
        );
    }
}




export default Active;
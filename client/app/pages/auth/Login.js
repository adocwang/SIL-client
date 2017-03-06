/**
 * Created by kiefer on 2017/1/22.
 */
import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import PageToolbar from '../../components/PageToolBar';
import MainContainer from '../../containers/MainContainer';
import ResetPwdContainer from '../../containers/ResetPwdContainer';
import {ToastShort} from '../../utils/ToastUtils';
import {fetchLogin} from '../../actions/auth'
import Spanner from 'react-native-spinkit'
import ActiveContainer from '../../containers/ActiveContainer'
import Loading from '../../components/Loading'
import {setPushAlias} from '../../utils/NativeBridge'
import styles from '../../style/CommonStyle'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            phone: '',
            loading: false
        };
        this.setUserPushAlias = this.setUserPushAlias.bind(this)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

        this.setState({loading: false});

        if (nextProps.auth.phone != '' && nextProps.auth.token != '') {
            this.setUserPushAlias()
            const {navigator} = nextProps;
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: MainContainer,
                    name: 'Main'
                });
            });
        }
    }

    setUserPushAlias() {
        setPushAlias(this.state.phone)
    }


    onSubmitBtnClick() {
        if (!(/^1[34578]\d{9}$/.test(this.state.phone))) {
            ToastShort('手机号码有误，请重填');
            return false;
        }
        if (this.state.password == '') {
            ToastShort('密码不能为空');
            return false;
        }

        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            this.setState({loading: true});
            dispatch(fetchLogin(this.state));
        });

    }

    onResetPwdBtnClick() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ActiveContainer,
                name: 'Active',
                params: {
                    type: 'reset',
                },
            });
        });
    }

    onActiveBtnClick() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ActiveContainer,
                name: 'Active',
                params: {
                    type: 'active',
                },
            });
        });
    }


    render() {
        const {navigator} = this.props;
        var textPhone = '';
        var textCode = '';
        var textPwd = '';
        if(this.props.auth.code==2003){
            textPwd = '密码错误';
        }else if(this.props.auth.code==2005){
            textCode = '短信验证码错误';
        }else if(this.props.auth.code==2006){
            textCode = '短信验证码已用';
        }else if(this.props.auth.code==2007){
            textPhone = '用户不存在';
        }
        return (
            <View style={styles.container}>

                <Image source={require('../../img/auth_bg.png')}
                       style={{resizeMode: Image.resizeMode.stretch,flex:2,justifyContent:'center',alignItems:'center',}}>
                    <Image source = {require('../../img/espe_logo.png')} style={{marginBottom:60}}/>

                    <TextInput underlineColorAndroid='transparent' onChangeText={(phone) => this.setState({phone})}
                               value={this.state.phone} style={styles.authInput} placeholder='请输入手机号码'/>
                    <Text style={{marginTop:10,color:'black',backgroundColor:'transparent'}} >{textPhone}</Text>
                    <TextInput underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})} value={this.state.password}
                               style={[styles.authInput,{marginTop:20}]} placeholder='请输入密码' secureTextEntry={true}/>
                    <Text style={{marginTop:10,color:'black',backgroundColor:'transparent'}}>{textPwd}</Text>
                </Image>

                <View style={{paddingTop:30,flex:1,alignItems:'center'}}>

                    <TouchableOpacity onPress={this.onSubmitBtnClick.bind(this)}>
                        <View style={styles.btnBorderBule}>
                            <Text style={styles.textWhite14}>登录</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:1,flexDirection:'row',width:240,justifyContent: 'space-between',marginTop:20}}>
                        <TouchableOpacity onPress={this.onActiveBtnClick.bind(this)}>
                            <View >
                                <Text style={styles.textBlue14}>激活账户</Text>
                            </View>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={this.onResetPwdBtnClick.bind(this)}>
                        <View >
                            <Text style={styles.textBlue14}>忘记密码？</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.loading ? <Loading backgroundColor='rgba(255,255,255,0.5)'/> : <View></View>
                }
            </View>
        );
    }
}


export default Login;

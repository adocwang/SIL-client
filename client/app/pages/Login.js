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
    TouchableOpacity,
    View
    } from 'react-native';
import PageToolbar from '../components/PageToolBar';
import MainContainer from '../containers/MainContainer';
import ResetPwdContainer from '../containers/ResetPwdContainer';
import {ToastShort} from '../utils/ToastUtils';
import {fetchLogin} from '../actions/auth'
import Spanner from 'react-native-spinkit'
import ActiveContainer from '../containers/ActiveContainer'

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            password:'12348765',
            phone:'15828516285',
            loading:false
        };
    }

    componentDidMount () {
       // const {dispatch} = this.props;
       // dispatch(fetchTest());
       // InteractionManager.runAfterInteractions(() => {
       //     dispatch(fetchTest());
       // });
      //  const {navigator} = this.props;
      //  InteractionManager.runAfterInteractions(() => {
      //      navigator.resetTo({
      //          component: MainContainer,
      //          name: 'Main'
      //      });
      //  });
    }

    componentWillReceiveProps (nextProps) {
        //const {reddit} = this.props;
        //if (reddit.isLoadMore && !nextProps.reddit.isLoadMore && !nextProps.reddit.isRefreshing) {
        //    if (nextProps.reddit.noMore) {
        //        ToastShort('没有更多数据了');
        //    }
        //}
        if(nextProps.auth.phone!='' && nextProps.auth.token!=''){
            this.setState({loading:false});
            const {navigator} = nextProps;

            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: MainContainer,
                    name: 'Main'
                });
            });
        }
    }

    shouldComponentUpdate(){
        return true;
    }
    componentWillUpdate(){
    }

    componentDidUpdate(){
    }


    onSubmitBtnClick(){
        console.log(this.state);
        if(!(/^1[34578]\d{9}$/.test(this.state.phone))){
            ToastShort('手机号码有误，请重填');
            return false;
        }
        if(this.state.password==''){
            ToastShort('密码不能为空');
            return false;
        }

        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            this.setState({loading:true});
            dispatch(fetchLogin(this.state));
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

    onActiveBtnClick(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ActiveContainer,
                name: 'Active'
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
                    <TextInput   onChangeText={(phone) => this.setState({phone})} value={this.state.phone} style = {styles.textinput} placeholder='请输入手机号码' underlinecolorandroid='transparent'/>
                    <TextInput   onChangeText={(password) => this.setState({password})} value={this.state.password} style = {styles.textinput} placeholder='请输入密码' secureTextEntry ={true} underlinecolorandroid='transparent'/>
                </View>

                <View style={styles.buttomview}>

                    <TouchableOpacity onPress={this.onResetPwdBtnClick.bind(this)}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <Text style={styles.lightblue}>忘记密码？</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onSubmitBtnClick.bind(this)}>
                    <View style={styles.buttonview} >
                        <Text style={styles.logintext} >登录</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onActiveBtnClick.bind(this)}>
                        <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                            <Text style={styles.lightblue}>激活账户</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                {
                    this.state.loading?<View style={styles.overlay} >
                        <Spanner size={50} type='ThreeBounce' color='#15499A'/>
                    </View>:<View></View>
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
        height: 140,
        marginTop:30,
        marginLeft:10,
        marginRight:10
    },
    rowview:{
        flexDirection:'row'
    },
    textinput: {//用户名/密码输入框
        flex: 1,
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
        marginTop:10
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
    },
    overlay:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'

    }
});

export default Login;

/**
 * Created by kiefer on 2017/2/1.
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
import LoginContainer from '../containers/LoginContainer';
import {ToastShort} from '../utils/ToastUtils';
import {fetchLogout} from '../actions/auth'
import Spanner from 'react-native-spinkit'

class Person extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loading:false
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
        //const {reddit} = this.props;
        //if (reddit.isLoadMore && !nextProps.reddit.isLoadMore && !nextProps.reddit.isRefreshing) {
        //    if (nextProps.reddit.noMore) {
        //        ToastShort('没有更多数据了');
        //    }
        //}

    }

    shouldComponentUpdate(){
        console.log('first shouldComponentUpdate is here');
        return true;
    }
    componentWillUpdate(){
        console.log('first componentWillUpdate is here');
    }

    componentDidUpdate(){
        console.log('first componentDidUpdate is here');
    }


    onLogoutBtnClick(){
        const {dispatch} = this.props;
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchLogout(this.props.auth.token));
            navigator.resetTo({
                component: LoginContainer,
                name: 'Login'
            });
            // 删除单个数据
            storage.remove({
                key: 'user'
            });
        });
    }


    render () {
        return (
            <View style={styles.container}>

                <View style={styles.buttomview}>
                    <TouchableOpacity onPress={this.onLogoutBtnClick.bind(this)}>
                        <View style={styles.buttonview} >
                            <Text style={styles.logintext} >退出登录</Text>
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

export default Person;
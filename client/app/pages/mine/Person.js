/**
 * Created by kiefer on 2017/2/1.
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
    View,
    Navigator,
    Dimensions
} from 'react-native';

import * as Color from '../../utils/CommonColor';
import AccountManagerContainer from "../../containers/AccountManagerContainer"
import MyStoreContainer from "../../containers/MyStoreContainer"
import MessageContainer from "../../containers/MessageContainer"
import {fetchUserGet} from '../../actions/auth'
import {ToastShort} from '../../utils/ToastUtils';

class Person extends React.Component {
    constructor(props) {
        super(props)
        this.state = {user: {}}
        this.didClickedAccountManager = this.didClickedAccountManager.bind(this)
        this.didClickedMyStore = this.didClickedMyStore.bind(this)
        this.didClickedMessage = this.didClickedMessage.bind(this)
        this.fetchUserInfo = this.fetchUserInfo.bind(this)
    }

    componentDidMount() {
        this.fetchUserInfo()
    }



    didClickedAccountManager() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: AccountManagerContainer,
                name: 'AccountManagerContainer',
                params: {
                    dispatch: this.props.dispatch
                }
            });
        });
    }

    fetchUserInfo() {
        const {dispatch,auth} = this.props
        dispatch(fetchUserGet({id:auth.id,phone:auth.phone},auth.token))
    }

    didClickedMyStore() {
        // const {navigator} = this.props;
        // InteractionManager.runAfterInteractions(() => {
        //     navigator.push({
        //         component: MyStoreContainer,
        //         name: 'MyStoreContainer',
        //     });
        // });
    }

    didClickedMessage() {
         const {navigator} = this.props;
         InteractionManager.runAfterInteractions(() => {
             navigator.push({
                 component: MessageContainer,
                 name: 'Message',
             });
         });
    }

    render() {
        var headerImg = null
        headerImg = require("../../img/header_default.png")
        var helloWord = null
        helloWord = "您好," + this.props.auth.true_name;
        return (
            <View style={styles.container}>
                    <Image style={styles.headerImg} source={headerImg}/>
                <Text style={styles.helloWord}>{helloWord}</Text>
                <View style={styles.contentBg}>
                    <TouchableOpacity onPress={this.didClickedAccountManager}>
                        <View style={styles.contentChild}>
                            <Image style={styles.childImg} source={require("../../img/account_manager.png")}/>
                            <Text style={styles.childWord}>账户管理</Text>
                            <Image style={styles.rightArrow} source={require("../../img/right_arrow2.png")}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.lineView}></View>
                    <TouchableOpacity onPress={this.didClickedMyStore}>
                    <View style={styles.contentChild}>
                        <Image style={styles.childImg} source={require("../../img/mine_store.png")}/>
                        <Text style={styles.childWord}>我的收藏</Text>
                        <Image style={styles.rightArrow} source={require("../../img/right_arrow2.png")}/>
                    </View>
                    </TouchableOpacity>
                    <View style={styles.lineView}></View>
                    <TouchableOpacity onPress={this.didClickedMessage}>
                        <View style={styles.contentChild}>
                            <Image style={styles.childImg} source={require("../../img/msg_icon.png")}/>
                            <Text style={styles.childWord}>消息中心</Text>
                            <Image style={styles.rightArrow} source={require("../../img/right_arrow2.png")}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 100,
        backgroundColor: Color.defaultBgColor,
        position:'relative',
        bottom: 15,
    },
    headerImg: {
        width: 80,
        height: 80,
        bottom: 45,
        borderRadius:40,
        position:'relative',
        alignSelf:"center",
    },
    helloWord: {
        textAlign: "center",
        color: Color.defaultBlackColor,
        width: 200,
        height: 30,
        alignSelf: "center",
        marginTop: -35,
        fontSize: 14
    },
    contentBg: {
        height: 162,
        alignSelf: "stretch",
        backgroundColor: "white",
        marginTop: 15
    },
    lineView: {
        marginLeft: 65,
        alignSelf: "stretch",
        height: 1,
        backgroundColor: Color.defaultDarkLineColor,
    },
    contentChild: {
        flexDirection: "row",
        height: 54,
        alignSelf: "stretch",
        alignItems: "center",
    },
    childImg: {
        width: 20,
        height: 20,
        marginLeft: 38,
    },
    childWord: {
        marginLeft: 15,
        flex: 1,
        height: 20,
        fontSize: 15,
        marginTop: 5,
    },
    rightArrow: {
        width: 12,
        height: 12,
        marginRight: 10,
    }
})

// class Person extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false
//         };
//     }
//
//     componentDidMount() {
//         // const {dispatch} = this.props;
//         // dispatch(fetchTest());
//         // InteractionManager.runAfterInteractions(() => {
//         //     dispatch(fetchTest());
//         // });
//
//     }
//
//     componentWillReceiveProps(nextProps) {
//         //const {reddit} = this.props;
//         //if (reddit.isLoadMore && !nextProps.reddit.isLoadMore && !nextProps.reddit.isRefreshing) {
//         //    if (nextProps.reddit.noMore) {
//         //        ToastShort('没有更多数据了');
//         //    }
//         //}
//
//     }
//
//     shouldComponentUpdate() {
//         console.log('first shouldComponentUpdate is here');
//         return true;
//     }
//
//     componentWillUpdate() {
//         console.log('first componentWillUpdate is here');
//     }
//
//     componentDidUpdate() {
//         console.log('first componentDidUpdate is here');
//     }
//
//
//     onLogoutBtnClick() {
//         const {dispatch} = this.props;
//         const {navigator} = this.props;
//         InteractionManager.runAfterInteractions(() => {
//             dispatch(fetchLogout(this.props.auth.token));
//             navigator.resetTo({
//                 component: LoginContainer,
//                 name: 'Login'
//             });
//
//             // 删除单个数据
//             storage.remove({
//                 key: 'user'
//             });
//             //realm.write(() => {
//             //    let user = realm.objects('User');
//             //    realm.delete(user); // Deletes all books
//             //    console.log('User',user);
//             //});
//         });
//     }
//
//
//     render() {
//         return (
//             <View style={styles.container}>
//
//                 <View style={styles.buttomview}>
//                     <TouchableOpacity onPress={this.onLogoutBtnClick.bind(this)}>
//                         <View style={styles.buttonview}>
//                             <Text style={styles.logintext}>退出登录</Text>
//                         </View>
//                     </TouchableOpacity>
//
//                 </View>
//                 {
//                     this.state.loading ? <View style={styles.overlay}>
//                             <Spanner size={50} type='ThreeBounce' color='#15499A'/>
//                         </View> : <View></View>
//                 }
//             </View>
//         );
//     }
// }
//
//
// let styles = StyleSheet.create({
//     container: {
//         flex: 1,//可拉伸
//         backgroundColor: '#FFFFFF',
//     },
//
//
//     dividerview: {//分割线区域
//         flexDirection: 'row',
//     },
//     divider: {
//         backgroundColor: '#ECEDF1'
//     },
//     buttomview: {
//         flex: 1,
//         marginTop: 30
//     },
//     buttonview: {
//         flexDirection: 'row',
//         margin: 10,
//         borderRadius: 6,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderColor: '#15499A',
//         borderWidth: 1,
//     },
//     logintext: {
//         alignSelf: 'center',
//         fontSize: 17,
//         color: '#15499A',
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     emptyview: {
//         flex: 1,
//     },
//     bottombtnsview: {
//         flexDirection: 'row',
//     },
//     bottomleftbtnview: {
//         flex: 1,
//         height: 50,
//         paddingLeft: 10,
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//     },
//     bottomrightbtnview: {
//         flex: 1,
//         height: 50,
//         paddingRight: 10,
//         alignItems: 'flex-end',
//         justifyContent: 'center',
//     },
//     bottombtn: {
//         fontSize: 15,
//         color: '#1DBAF1',
//     },
//     lightblue: {
//         fontSize: 14, color: '#4A90E2',
//         marginBottom: 10
//     },
//     redtxt: {
//         fontSize: 14, color: '#D0021B', marginLeft: 5
//     },
//     overlay: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         alignItems: 'center',
//         justifyContent: 'center'
//
//     }
// });

export
default
Person;
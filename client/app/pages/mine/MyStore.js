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
    View
} from 'react-native';
import LoginContainer from '../../containers/LoginContainer';
import {ToastShort} from '../../utils/ToastUtils';
import {fetchLogout} from '../../actions/auth'
import * as Color from '../../utils/CommonColor';

export default class MyStore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {user: {}}
    }

    render(){
        var headerImg = null
        headerImg = require("../../img/header_default.png")
        var helloWord = null
        helloWord = "您好," + this.props.auth.true_name;
        return (
            <View style={styles.container}>
                <View style={styles.headerImgBg}>
                    <Image style={styles.headerImg} source={headerImg}/>
                </View>
                <Text style={styles.helloWord}>{helloWord}</Text>
                <View style={styles.contentBg}>
                    <View style={styles.contentChild}>
                        <Image style={styles.childImg} source={require("../../img/account_manager.png")}/>
                        <Text style={styles.childWord}>账户管理</Text>
                        <Image style={styles.rightArrow} source={require("../../img/right_arrow2.png")}/>

                    </View>
                    <View style={styles.lineView}></View>
                    <View style={styles.contentChild}>
                        <Image style={styles.childImg} source={require("../../img/mine_store.png")}/>
                        <Text style={styles.childWord}>我的收藏</Text>
                        <Image style={styles.rightArrow} source={require("../../img/right_arrow2.png")}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.defaultBgColor,
    },
    headerImgBg: {
        position: 'absolute',
        top: -60,left:0,right:0,
        height:76,
    },
    headerImg: {
        width: 76,
        height: 76,
        alignSelf: "center",
        borderRadius: 38,
    },
    helloWord: {
        textAlign: "center",
        color: Color.defaultBlackColor,
        width: 200,
        height: 30,
        alignSelf: "center",
        marginTop: 25,
        fontSize: 14
    },
    contentBg: {
        height: 108,
        alignSelf:"stretch",
        backgroundColor:"white",
        marginTop: 15
    },
    lineView: {
        marginLeft: 65,
        alignSelf:"stretch",
        height: 1,
        backgroundColor:Color.defaultDarkLineColor,
    },
    contentChild: {
        flexDirection:"row",
        flex: 1,
        alignSelf:"stretch",
        alignItems:"center",
    },
    childImg: {
        width: 20,
        height: 20,
        marginLeft:38,
    },
    childWord: {
        marginLeft: 15,
        flex: 1,
        height: 20,
        fontSize: 15,
        marginTop:5,
    },
    rightArrow: {
        width: 12,
        height:12,
        marginRight: 10,
    }
})



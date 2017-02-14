/**
 * Created by kiefer on 2017/2/1.
 */
import React from 'react';
import CustomToolbar from '../../components/CustomToolbar';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as Color from '../../utils/CommonColor';
import Button from '../../components/Button.ios.js'
import {fetchLogout} from '../../actions/auth'
import LoginContainer from '../../containers/LoginContainer'
import ResetPwdContainer from '../../containers/ResetPwdContainer'
export default class AccountManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {headerImg: require("../../img/header_default.png")}
        this.didClickedCell = this.didClickedCell.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setGesturePassword = this.setGesturePassword.bind(this)
        this.setHeaderImg = this.setHeaderImg.bind(this)
        this.didClickedLogOut = this.didClickedLogOut.bind(this)
    }

    didClickedCell(index) {
        switch (index) {
            case 5:
                this.setPassword()
                break
            case 6:
                this.setGesturePassword()
                break
            default:
        }
    }

    setHeaderImg() {

    }


    setPassword() {
        const {navigator} = this.props;

        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ResetPwdContainer,
                name: 'ResetPwd'
            });
        });
    }

    setGesturePassword() {

    }

    didClickedLogOut() {
        const {dispatch} = this.props
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchLogout(this.props.auth.token));
            navigator.resetTo({
                component: LoginContainer,
                name: 'Login'
            });

            storage.remove({
                key: 'user'
            });

        });
    }

    render() {
        const {auth} = this.props
        const headerImg = this.state.headerImg
        const realName = auth.true_name
        const company = auth.bank_name
        const phoneNumber = auth.phone
        const work = auth.role_name
        const password = "******"
        return (
            <View style={styles.container}>
                <CustomToolbar title="账户管理" navigator={this.props.navigator}/>
                <TouchableWithoutFeedback onPress={this.setHeaderImg}>
                    <View style={styles.headerBg}>
                        <Image source={headerImg} style={styles.headerImg}/>
                    </View>
                </TouchableWithoutFeedback>
                <ContentCell tip="姓名" value={realName} secondColor={Color.defaultBlackColor}/>
                <ContentCell tip="单位" value={company} secondColor={Color.defaultBlackColor}/>
                <ContentCell tip="手机号" value={phoneNumber} secondColor={Color.defaultBlackColor}/>
                <ContentCell tip="职位" value={work} secondColor={Color.defaultBlackColor}/>
                <ContentCell index={5} tip="密码" value={password} secondColor={Color.defaultShallowBlueColor} canClick
                             onPress={this.didClickedCell}/>

                <View style={{backgroundColor: Color.defaultBgColor, flex: 1}}>
                    <Button style={styles.exitBg} titleStyle={styles.exitTitle} title="退出登录"
                            onPress={this.didClickedLogOut}/>
                </View>

            </View>

        );
    }
}

class ContentCell extends React.Component {
    constructor(props) {
        super(props)
        this.clicked = this.clicked.bind(this)
    }

    clicked() {
        const {canClick} = this.props
        if(canClick) {
            const {index, onPress} = this.props
            onPress(index)
        }
    }

    render() {
        var arrowImg = null
        const {tip, value, secondColor, canClick} = this.props
        if (canClick) {
            arrowImg = require("../../img/right_arrow.png")
        }
        return (
            <TouchableWithoutFeedback onPress={this.clicked}>
                <View style={styles.cellBg}>
                    <Text style={styles.cellTip}>{tip}</Text>
                    <View style={styles.rightBg}>
                        <Text style={[styles.cellValue, {color: secondColor}]}>{value}</Text>
                        <Image style={styles.rightArrow} source={arrowImg}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },
    headerBg: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: "stretch",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    headerImg: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    blueWord: {
        color: Color.defaultShallowBlueColor,
        fontSize: 13,
        marginRight: 13,
    },
    cellBg: {
        marginLeft: 20,
        marginRight: 20,
        alignSelf: "stretch",
        height: 44,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: Color.defaultDarkLineColor,

    },
    cellTip: {
        color: Color.defaultLightGray,
        fontSize: 13,
        marginTop: 5,
    },
    rightBg: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },
    cellValue: {
        color: Color.defaultBlackColor,
        fontSize: 13,
        marginTop: 5,
        marginRight: 2,

    },
    rightArrow: {
        width: 7,
        height: 12,
        marginTop: 5,

    },
    exitBg: {
        marginTop: 20,
        alignSelf:"center",
        width: 120,
        height: 40,
        borderRadius:5,
        backgroundColor:Color.defaultShallowBlueColor
    },
    exitTitle: {
        color: "white",
        fontSize: 15
    }

})



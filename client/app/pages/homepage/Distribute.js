/**
 * Created by kiefer on 2017/1/25.
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
    Button,
    ScrollView,
    View
} from 'react-native';
import CustomToolbar from '../../components/CustomToolbar'
import CheckBox from 'react-native-check-box'
import {fetchUserList,fetchEnterpiseSet} from '../../actions/home'
import BasePage from  '../BasePage'
import Loading from '../../components/Loading'
import * as types from '../../constants/ActionTypes';
import CustomCheckBox from '../../components/CustomCheckBox'
import {ToastShort} from '../../utils/ToastUtils';
import MainContainer from  '../../containers/MainContainer'

class Distribute extends BasePage {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
        this.state.zhuli={};
        this.state.xieli={};
    }

    componentDidMount() {
         const {dispatch} = this.props;
         InteractionManager.runAfterInteractions(() => {
             dispatch(fetchUserList(this.props.auth.token));
         });
    }

    componentWillReceiveProps (nextProps) {
        const {navigator} = this.props;
        const {dispatch} = this.props;
        if(nextProps.claimdistribute.setEnterpriseInfoSuccess){

            navigator.resetTo({
                component: MainContainer,
                name: 'Main'
            });
        }
    }

    onZhuliClick(item){
        const {dispatch} = this.props;
        dispatch({type:types.USER_LIST_CHANGE,data:{item:item,type:'zhuli'}})
        this.setState({zhuli:item});
    }

    onXieliClick(item){
        const {dispatch} = this.props;
        dispatch({type:types.USER_LIST_CHANGE,data:{item:item,type:'xieli'}})
        this.setState({xieli:item});
    }

    onSubmit() {
        if(this.state.zhuli.id){
            const {navigator} = this.props;
            const {dispatch} = this.props;
            InteractionManager.runAfterInteractions(() => {
                var map = {}
                map.id = this.state.enterprise.id;
                map.bank_id = this.state.item.id;
                map.role_a_id = this.state.zhuli.id;
                if(this.state.xieli.id){
                    map.role_b_id = this.state.xieli.id;
                }
                dispatch(fetchEnterpiseSet(map,this.props.auth.token));
            });
        }else {
            ToastShort('请选择主理');
        }

    }

    renderZhuliCheckBox(item){
        return <CustomCheckBox
            style={{ padding: 10}}
            onClick={()=>this.onZhuliClick(item)}
            isChecked={item.isChecked}
            key={item.id}
            rightText={item.true_name}
            checkedImage={<Image source={require('../../img/check_box_icon.png')} />}
            unCheckedImage={<Image source={require('../../img/check_box_icon_d.png')} />}
        />;
    }

    renderXieliCheckBox(item){
        return <CustomCheckBox
            style={{ padding: 10}}
            onClick={()=>this.onXieliClick(item)}
            isChecked={item.isChecked}
            key={item.id}
            rightText={item.true_name}
            checkedImage={<Image source={require('../../img/check_box_icon.png')} />}
            unCheckedImage={<Image source={require('../../img/check_box_icon_d.png')} />}
        />;
    }

    render() {
        const {navigator} = this.props;
        const {claimdistribute} = this.props;
        var checkBoxListLeft = [];
        var checkBoxListRight = [];
        claimdistribute.zhuliUserList.forEach((item)=>{
            checkBoxListLeft.push(this.renderZhuliCheckBox(item));
        });
        claimdistribute.xieliUserList.forEach((item)=>{
            checkBoxListRight.push(this.renderXieliCheckBox(item));
        });

        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="分配"
                    operate="确认"
                    onOperateClicked={()=>this.onSubmit()}
                    navigator={navigator}/>
                <View style={{flex:1}}>
                <View style={{height:55,justifyContent:'center',paddingLeft:20}}>
                    <Text style={{color:'#000000',fontSize:16}}>选择客户经理</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.checkboxlist}>
                        <View style={styles.title_left}>
                            <Text style={styles.title_text}>主理</Text>
                        </View>

                        {checkBoxListLeft}
                    </View>
                    <View style={{backgroundColor:'#DFDFDF',width:1}}></View>
                    <View style={styles.checkboxlist}>
                        <View style={styles.title_right}>
                            <Text style={styles.title_text}>协理</Text>
                        </View>
                        {checkBoxListRight}
                    </View>
                </View>
                    {this.props.claimdistribute.loadingUserList&&<Loading backgroundColor = 'rgba(255,255,255,0.5)'/>
                    }
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
    content: {
        flex:1,
        flexDirection:'row',
    },
    title_left:{
        backgroundColor:'#4A90E2',
        height:34,
        alignItems:'center',
        justifyContent:'center'
    },
    title_right:{
        backgroundColor:'#91C25B',
        height:34,
        alignItems:'center',
        justifyContent:'center'
    },
    title_text:{
        color:'#ffffff',
        fontSize:14
    },
    checkboxlist:{
        flex:1,
    },
    checkbox: {
        paddingLeft:20,
        paddingBottom:10,
        paddingTop:10,
        paddingRight:10
    },

});

export default Distribute;
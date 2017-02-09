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
import {fetchUserList} from '../../actions/home'
import BasePage from  '../BasePage'
import Loading from '../../components/Loading'

class Distribute extends BasePage {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }

    }

    componentDidMount() {
         const {dispatch} = this.props;
         InteractionManager.runAfterInteractions(() => {
             dispatch(fetchUserList(this.props.auth.token));
         });
    }

    onZhuliClick(item){

    }

    onXieliClick(item){

    }

    onSubmit() {
        const {navigator} = this.props;
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(notifyUpdate({companyInfoUpdate: true}));
            navigator.popToTop();
        });
    }

    renderZhuliCheckBox(item){
        return <CheckBox
            style={{ padding: 10}}
            onClick={()=>this.onZhuliClick(item)}
            isChecked={false}
            key={item.id}
            rightText={item.true_name}
            checkedImage={<Image source={require('../../img/check_box_icon.png')} />}
            unCheckedImage={<Image source={require('../../img/check_box_icon_d.png')} />}
        />;
    }

    renderXieliCheckBox(item){
        return <CheckBox
            style={{ padding: 10}}
            onClick={()=>this.onXieliClick(item)}
            isChecked={false}
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
        claimdistribute.userList.forEach((item)=>{
            checkBoxListLeft.push(this.renderZhuliCheckBox(item));
            checkBoxListRight.push(this.renderXieliCheckBox(item));
        });

        console.log(this.props);
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
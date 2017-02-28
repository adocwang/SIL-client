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
import DistributeContainer from '../../containers/DistributeContainer'
import MainContainer from '../../containers/MainContainer'
import EnterpriseDetailContainer from '../../containers/enterprise/EnterpriseDetailContainer'

import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    DefaultAnimation,
} from 'react-native-popup-dialog';
import BasePage from  '../BasePage'
import {GapYear,isRole} from '../../utils/CommonUtils'
import Loading from '../../components/Loading'
import {fetchBankList,fetchEnterpiseSet,fetchEnterprise,fetchEnterpiseSetDistribute} from '../../actions/home'
import * as types from '../../constants/ActionTypes';
import {ToastShort} from '../../utils/ToastUtils';


class Claim extends BasePage {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
        this.openChooseConfirmAnimationDialog = this.openChooseConfirmAnimationDialog.bind(this);
        this.openChooseBankScaleAnimationDialog = this.openChooseBankScaleAnimationDialog.bind(this);
        this.openChooseScaleAnimationDialog = this.openChooseScaleAnimationDialog.bind(this);
        this.openRefuseConfirmAnimationDialog = this.openRefuseConfirmAnimationDialog.bind(this);
        this.openEnterpriseDetail = this.openEnterpriseDetail.bind(this);
        this.onClaimBtnClick = this.onClaimBtnClick.bind(this);
        this.onRefuseClaimBtnClick = this.onRefuseClaimBtnClick.bind(this);
        this.onBankChoose = this.onBankChoose.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if(!this.state.item.name && nextProps.claimdistribute.enterprise.id){
            this.setState({item:nextProps.claimdistribute.enterprise});
            const {dispatch} = this.props;
            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchBankList(this.props.auth.token));
            });
        }

        if(nextProps.claimdistribute.claimEnterprise){
            const {navigator} = this.props;
            navigator.resetTo({
                component: MainContainer,
                name: 'Main',
            });
        }

    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch({type:types.CLEAR_STATUS});
        });
    }

    openEnterpriseDetail() {
        const {navigator} = this.props;
        navigator.push({
            component: EnterpriseDetailContainer,
            name: 'EnterpriseDetail',
            params: {
                id: this.state.item.id,
            },
        });
    }

    openChooseConfirmAnimationDialog() {
        this.confirmDialog.openDialog();
    }

    openRefuseConfirmAnimationDialog() {
        this.refuseDialog.openDialog();
    }

    openChooseBankScaleAnimationDialog() {
        this.chooseBankScaleAnimationDialog.openDialog();
    }

    openChooseScaleAnimationDialog() {
        if (this.state.item.bank && this.state.item.bank.id) {
            const {navigator} = this.props;
            navigator.push({
                component: DistributeContainer,
                name: 'Distribute',
                params: {
                    item: this.state.item,
                },
            });
        } else {
            ToastShort('请先分配银行');
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if(this.state.item && this.state.item.id && !this.state.item.name){
            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchEnterprise(this.state.item.id,this.props.auth.token));
            });
        }else {
            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchBankList(this.props.auth.token));
            });
        }

    }

    onClaimBtnClick() {
        this.confirmDialog.closeDialog();
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchEnterpiseSetDistribute({id:this.state.item.id,accept:1},this.props.auth.token));
        });
    }

    onRefuseClaimBtnClick() {
        this.refuseDialog.closeDialog();
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchEnterpiseSetDistribute({id:this.state.item.id,accept:-1},this.props.auth.token));
        });
    }

    onBankChoose(item) {

        this.chooseBankScaleAnimationDialog.closeDialog();
        const {dispatch} = this.props;
        if (this.state.item && this.state.item.id && item.id) {
            var map = {}
            map.id = this.state.item.id;
            map.bank_id = item.id;
            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchEnterpiseSet(map, this.props.auth.token));
            });
        } else {
            ToastShort('暂时无法分配,退出重试')
        }
    }

    renderOperate() {
        if(this.props.claimdistribute.enterprise.id){
            return(
                <View style={styles.containerOption}>
                    {this.props.claimdistribute.enterprise.operation_enable.indexOf('distribute_bank')!=-1&& <TouchableOpacity onPress={this.openChooseBankScaleAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>分配银行</Text>
                        </View>
                    </TouchableOpacity> }

                    {this.props.claimdistribute.enterprise.operation_enable.indexOf('distribute_cm')!=-1 && <TouchableOpacity onPress={ this.openChooseScaleAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>分配人员</Text>
                        </View>
                    </TouchableOpacity>}

                    {this.props.claimdistribute.enterprise.operation_enable.indexOf('accept')!=-1 && <TouchableOpacity onPress={ this.openChooseConfirmAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>认领企业</Text>
                        </View>
                    </TouchableOpacity>}

                    {this.props.claimdistribute.enterprise.operation_enable.indexOf('refuse')!=-1 && <TouchableOpacity onPress={ this.openRefuseConfirmAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>拒绝认领</Text>
                        </View>
                    </TouchableOpacity>}
                </View>);
        }else {
            return (<View></View>);
        }


    }

    renderCheckBox(item) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>this.onBankChoose(item)}
            isChecked={false}
            key={item.id}
            rightText={item.name}
            checkedImage={<Image source={require('../../img/check_box_icon.png')} />}
            unCheckedImage={<Image source={require('../../img/check_box_icon_d.png')} />}
        />;
    }

    render() {
        const {navigator} = this.props;
        const {claimdistribute} = this.props;
        var checkBoxList = []
        if(claimdistribute.bankList && claimdistribute.bankList.length > 0){
            claimdistribute.bankList.forEach((item)=> {
                checkBoxList.push(this.renderCheckBox(item))
            });
        }

        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="分配"
                    navigator={navigator}/>
                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.containerInfoItem} onPress={this.openEnterpriseDetail}>
                        <Image
                            style={styles.img}
                            source={require('../../img/default_avatar.png')}
                        />
                        <View style={styles.content}>
                            <View style={styles.catContainer}>
                                <Text style={styles.title}>
                                    {this.state.item.name}
                                </Text>
                            </View>
                            <Text style={styles.desc}>
                                {this.state.item.legal_man} |
                                成立{GapYear(this.props.start) > 0 ? GapYear(this.props.start) : '不到1'}年
                            </Text>

                            <Text style={styles.cat}>
                                {this.state.item.address}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {this.renderOperate()}
                    {this.props.claimdistribute.loadingBankList && <Loading backgroundColor='rgba(255,255,255,0.5)'/>
                    }
                </View>
                <PopupDialog
                    ref={(popupDialog) => {this.confirmDialog = popupDialog;}}
                    height={170}
                    dialogTitle={<DialogTitle style={{fontSize:18}} title="确认认领" />}

                >
                    <View style={{flex:1}}>
                        <Text style={{fontSize:18,marginTop:10,marginLeft:10}}>是否认领{this.state.item.title}?</Text>
                        <View style={{flexDirection:'row',flex:1,marginTop:10,justifyContent:'flex-end'}}>
                            <DialogButton style={{fontSize:18}}
                                          text='确认'
                                          onPress={()=>this.onClaimBtnClick()}/>
                            <DialogButton style={{fontSize:18}}
                                          text='取消'
                                          onPress={() => {
                                        this.confirmDialog.closeDialog();
                                        }}/>
                        </View>
                    </View>
                </PopupDialog>

                <PopupDialog
                    ref={(popupDialog) => {this.refuseDialog = popupDialog;}}
                    height={170}
                    dialogTitle={<DialogTitle style={{fontSize:18}} title="拒绝认领" />}

                >
                    <View style={{flex:1}}>
                        <Text style={{fontSize:18,marginTop:10,marginLeft:10}}>是否拒绝认领{this.state.item.title}?</Text>
                        <View style={{flexDirection:'row',flex:1,marginTop:10,justifyContent:'flex-end'}}>
                            <DialogButton style={{fontSize:18}}
                                          text='确认'
                                          onPress={()=>this.onRefuseClaimBtnClick()}/>
                            <DialogButton style={{fontSize:18}}
                                          text='取消'
                                          onPress={() => {
                                        this.refuseDialog.closeDialog();
                                        }}/>
                        </View>
                    </View>
                </PopupDialog>


                <PopupDialog
                    ref={(popupDialog) => {this.chooseBankScaleAnimationDialog = popupDialog;}}
                    height={200}
                    dialogTitle={<DialogTitle style={{fontSize:18}} title="选择支行" />}

                >
                    <View style={{flex:1}}>
                        <ScrollView style={{padding:10,marginBottom:20}}>
                            <View>
                                {checkBoxList}
                            </View>
                        </ScrollView>
                    </View>
                </PopupDialog>

            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    containerOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonview: {
        flexDirection: 'row',
        margin: 10,
        width: 90,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#15499A',
        borderWidth: 1,
    },
    btntext: {
        alignSelf: 'center',
        fontSize: 15,
        color: '#15499A',
        marginTop: 10,
        marginBottom: 10,
    },
    containerInfoItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 2,
        height: 100,
        paddingLeft: 20
    },
    img: {
        flex: 1,
        width: 40,
        height: 40,
    },
    content: {
        flex: 7,
        flexDirection: 'column',
        paddingLeft: 10,
    },
    title: {
        color: '#4A4A4A',
        fontSize: 16,
    },
    desc: {
        color: '#9B9B9B',
        fontSize: 14,
        paddingTop: 3
    },
    cat: {
        color: '#4A4A4A',
        fontSize: 12,
        paddingTop: 3
    },
    catContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingRight: 10,
        alignItems: 'center'

    }
});

export default Claim;
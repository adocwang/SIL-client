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

import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    DefaultAnimation,
} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();
import BasePage from  '../BasePage'
import {GapYear} from '../../utils/CommonUtils'
import Loading from '../../components/Loading'
import {fetchBankList} from '../../actions/home'

class Claim extends BasePage {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
        console.log(this.state);
        this.openScaleAnimationDialog = this.openScaleAnimationDialog.bind(this);
        this.openChooseScaleAnimationDialog = this.openChooseScaleAnimationDialog.bind(this);
        this.onClaimBtnClick = this.onClaimBtnClick.bind(this);
        this.onBankChoose = this.onBankChoose.bind(this);
    }

    openScaleAnimationDialog() {
        this.scaleAnimationDialog.openDialog();
    }

    openChooseScaleAnimationDialog() {
        this.chooseScaleAnimationDialog.openDialog();
    }

    componentDidMount() {
         const {dispatch} = this.props;
         InteractionManager.runAfterInteractions(() => {
             dispatch(fetchBankList(this.props.auth.token));
         });
    }

    onClaimBtnClick() {
        this.scaleAnimationDialog.closeDialog();
    }

    onBankChoose(item) {
        this.chooseScaleAnimationDialog.closeDialog();
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: DistributeContainer,
                name: 'Distribute',
                params: {
                    item: item,
                },
            });
        });
        //this.chooseScaleAnimationDialog.closeDialog();
    }

    onDistributeBtnClick() {

    }

    renderCheckBox(item){
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
        claimdistribute.bankList.forEach((item)=>{
            checkBoxList.push(this.renderCheckBox(item))
        });

        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="认领"
                    navigator={navigator}/>
                <View style={{flex:1}}>
                <View style={styles.containerInfoItem}>
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
                </View>

                <View style={styles.containerOption}>
                    {/* <TouchableOpacity onPress={this.openScaleAnimationDialog}>
                            <View style={styles.buttonview}>
                                <Text style={styles.btntext}>认领</Text>
                            </View>
                        </TouchableOpacity>*/}

                    <TouchableOpacity onPress={ this.openChooseScaleAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>分配</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    {this.props.claimdistribute.loadingBankList&&<Loading backgroundColor = 'rgba(255,255,255,0.5)'/>
                    }
                </View>
                <PopupDialog
                    ref={(popupDialog) => {this.scaleAnimationDialog = popupDialog;}}
                    dialogAnimation={scaleAnimation}
                    height={170}
                    dialogTitle={<DialogTitle style={{fontSize:18}} title="确认认领" />}

                >
                    <View style={{flex:1}}>
                        <Text style={{fontSize:18,marginTop:10,marginLeft:10}}>是否认领{this.state.item.title}?</Text>
                        <View style={{flexDirection:'row',flex:1,marginTop:10,justifyContent:'flex-end'}}>
                            <DialogButton style={{fontSize:18}}
                                          text='确认'
                                          onPress={this.onClaimBtnClick}/>
                            <DialogButton style={{fontSize:18}}
                                          text='取消'
                                          onPress={() => {
                                        this.scaleAnimationDialog.closeDialog();
                                        }}/>
                        </View>
                    </View>
                </PopupDialog>

                <PopupDialog
                    ref={(choosePopupDialog) => {this.chooseScaleAnimationDialog = choosePopupDialog;}}
                    dialogAnimation={scaleAnimation}
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
        width: 120,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#15499A',
        borderWidth: 1,
    },
    btntext: {
        alignSelf: 'center',
        fontSize: 17,
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
        height: 90,
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
        paddingTop: 5
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
        paddingTop: 5
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
/**
 * Created by kiefer on 2017/1/25.
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
    Button,
    ScrollView,
    View
} from 'react-native';
import CustomToolbar from '../components/CustomToolbar'
import CheckBox from 'react-native-check-box'
import DistributeContainer from '../containers/DistributeContainer'

import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    DefaultAnimation,
} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();

class Claim extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
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
        // const {dispatch} = this.props;
        // dispatch(fetchTest());
        // InteractionManager.runAfterInteractions(() => {
        //     dispatch(fetchTest());
        // });
        console.log(this.props)
    }

    onClaimBtnClick() {
        this.scaleAnimationDialog.closeDialog();
    }
    onBankChoose(userId) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: DistributeContainer,
                name: 'Distribute'
            });
        });
        //this.chooseScaleAnimationDialog.closeDialog();
    }

    onDistributeBtnClick() {

    }

    render() {
        const {navigator} = this.props;

        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="认领"
                    navigator={navigator}/>
                <View style={styles.containerItem}>
                    <Image
                        style={{width: 88, height: 88, marginRight: 10,borderRadius:44}}
                        source={{uri: this.state.item.img}}
                    />
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.title}>
                            {this.state.item.title}
                        </Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{flex: 1, fontSize: 14, color: '#ff0000', marginTop: 5, marginRight: 5}}>
                                    {this.state.item.desc}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerOption}>
                    <TouchableOpacity onPress={this.openScaleAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>认领</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ this.openChooseScaleAnimationDialog}>
                        <View style={styles.buttonview}>
                            <Text style={styles.btntext}>分配</Text>
                        </View>
                    </TouchableOpacity>
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
                    height={170}
                    dialogTitle={<DialogTitle style={{fontSize:18}} title="选择支行" />}

                >
                    <View style={{flex:1}}>
                        <ScrollView style={{padding:10,marginBottom:20}}>
                          <View>
                              <CheckBox
                                  style={{flex: 1, padding: 10}}
                                  onClick={()=>this.onBankChoose('1')}
                                  isChecked={true}
                                  rightText={'测试支行1'}
                                  checkedImage={<Image source={require('../img/check_box_icon.png')} />}
                                  unCheckedImage={<Image source={require('../img/check_box_icon_d.png')} />}
                              />
                              <CheckBox
                                  style={{flex: 1, padding: 10}}
                                  onClick={()=>this.onBankChoose('1')}
                                  isChecked={false}
                                  rightText={'测试支行2'}
                                  checkedImage={<Image source={require('../img/check_box_icon.png')} />}
                                  unCheckedImage={<Image source={require('../img/check_box_icon_d.png')} />}
                              />
                              <CheckBox
                                  style={{flex: 1, padding: 10}}
                                  onClick={()=>this.onBankChoose('1')}
                                  isChecked={false}
                                  rightText={'测试支行3'}
                                  checkedImage={<Image source={require('../img/check_box_icon.png')} />}
                                  unCheckedImage={<Image source={require('../img/check_box_icon_d.png')} />}
                              />
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

});

export default Claim;
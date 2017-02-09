import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    ListView,
    InteractionManager
} from 'react-native'
import CustomToolbar from '../../components/CustomToolbar'
import {
    defaultSecondBlackColor,
    defaultBgColor,
    defaultDarkLineColor,
    defaultGreenColor,
    defaultBlackColor,
    defaultOrangeColor,
    defaultLightGray,
    defaultLineColor
} from '../../utils/CommonColor'
import dismissKeyboard from 'dismissKeyboard'
import PopupDialog, {
    DialogTitle,
    DialogButton,
    DefaultAnimation,

} from 'react-native-popup-dialog';
import {ToastShort} from '../../utils/ToastUtils';

class LoanCalculator extends Component {

    constructor(props) {
        super(props)
        this.state = {preferentialRateIndex: -1, selecteIndex: 0, showLX: 0.0, money: 0.0,rate: 0,term: 0}
        this.didClickedContainerView = this.didClickedContainerView.bind(this)
        this.didClickedItem = this.didClickedItem.bind(this)
        this.didClickedDialogItem = this.didClickedDialogItem.bind(this)
        this.calculatorResult = this.calculatorResult.bind(this)
        this.textFieldChange = this.textFieldChange.bind(this)
        this.getPerenceialRate = this.getPerenceialRate.bind(this)
    }

    static defaultProps = {
        preferentialRate: ["1.3倍","1.2倍","1.1倍","标准","9折", "8.8折"]
    }

    didClickedContainerView() {
        dismissKeyboard();
    }

    didClickedDialogItem(index) {
        this.popupDialog.closeDialog()
        switch (this.state.selecteIndex) {
            case 0:
                this.setState({preferentialRateIndex: index})
                break;
            default:
        }
        this.calculatorResult()
    }

    textFieldChange(index,text) {
        switch(index){
            case 0:
                if(text == "") {
                    this.setState({money: 0})
                } else {
                    this.setState({money: text})
                }
                break;
            case 1:
                if(text == "") {
                    this.setState({rate: 0})
                } else {
                    this.setState({rate: text})
                }
                break;
            case 2:
                if(text == "") {
                    this.setState({term: 0})
                } else {
                    this.setState({term: text})
                }
                break;
            default:
        }
        this.calculatorResult()
    }

    getPerenceialRate() {
        var preference = 1.0
        const index = parseInt(this.state.preferentialRateIndex)
        switch(index) {
            case 0:
                preference = 1.3
                break;
            case 1:
                preference = 1.2
                break;
            case 2:
                preference = 1.1
                break;
            case 3:
                preference = 1.0
                break;
            case 4:
                preference = 0.9
                break;
            case 5:
                preference = 0.88
                break;
            default:
        }
        return preference
    }

    calculatorResult() {
        setTimeout(() => {
            if (this.state.preferentialRateIndex != -1 && this.state.term != 0 && this.state.rate != 0) {
                const perenceialRate = this.getPerenceialRate()
                const monthRate = this.state.rate / 12 / 100 * perenceialRate
                const result =  this.state.money * (monthRate * this.state.term)
                const showRsult = Math.round(result*Math.pow(10, 2))/Math.pow(10, 2);

                this.setState({showLX: showRsult})
            }

        }, 300)
    }

    didClickedItem(index) {
        this.setState({selecteIndex: index})
        this.popupDialog.openDialog()
    }

    render() {
        var preferentialRateStyle = [styles.textHolder]
        var preferentialRateString = "请输入优惠利率"

        if (this.state.preferentialRateIndex != -1) {
            preferentialRateStyle.push(styles.textHolderS)
            preferentialRateString = this.props.preferentialRate[this.state.preferentialRateIndex]

        }
        const selecteIndex = this.state.selecteIndex
        var data = null

        switch (selecteIndex) {

            case 0:
                data = this.props.preferentialRate
                break;
            default:

        }
        const {navigator} = this.props
        return (
            <TouchableWithoutFeedback onPress={this.didClickedContainerView}>
                <View style={styles.container}>
                    <CustomToolbar title="贷款计算器" navigator={navigator}/>
                    <View style={styles.textInputView}>
                        <TextInput placeholder="请输入贷款金额" style={styles.textInput} onChangeText={this.textFieldChange.bind(this,0)}
                                   keyboardType="decimal-pad" placeholderTextColor={defaultLightGray} underlineColorAndroid="transparent"/>
                        <Text style={styles.textYuan}>元</Text>
                    </View>

                        <View style={styles.textInputView}>
                            <TextInput placeholder="请输入贷款年利率" style={styles.textInput} onChangeText={this.textFieldChange.bind(this,1)}
                                       keyboardType="decimal-pad" placeholderTextColor={defaultLightGray} underlineColorAndroid="transparent"/>
                            <Text style={styles.textYuan}>%</Text>
                        </View>

                        <View style={styles.textInputView}>
                            <TextInput placeholder="请输入贷款期限" style={styles.textInput} onChangeText={this.textFieldChange.bind(this,2)}
                                       keyboardType="number-pad" placeholderTextColor={defaultLightGray} underlineColorAndroid="transparent"/>
                            <Text style={styles.textYuan}>个月</Text>

                        </View>

                    <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this, 0)}>
                        <View style={styles.textInputView}>
                            <View style={styles.textInput2}>

                            <Text style={preferentialRateStyle}>{preferentialRateString}</Text>
                            </View>
                            <View style={styles.downButton}><Image style={styles.downImg}
                                                                   source={require("../../img/arrowDown.png")}/></View>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={styles.interetExpenses}>支出利息</Text>
                    <View style={styles.interetExpensesValue}>
                        <Text style={styles.interetExpensesValue0}>￥</Text>
                        <Text style={styles.interetExpensesValue1}>{this.state.showLX}</Text>
                    </View>

                    <PopupDialog
                        ref={(popupDialog) => {
                            this.popupDialog = popupDialog;
                        }}
                        dialogTitle={<DialogTitle title="选择"/>}
                        width={250} height={300}
                    >
                        <DialogoTableView data={data} closure={this.didClickedDialogItem}/>
                    </PopupDialog>

                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class DialogoTableView extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {dataSource: ds.cloneWithRows(this.props.data)}
    }

    clickedCell(index) {
        this.props.closure(index)
    }

    render() {
        return (
            <ListView style={styles.listView} dataSource={this.state.dataSource}
                      renderRow={(rowData, sectionID, rowID) =>
                          <TouchableWithoutFeedback onPress={this.clickedCell.bind(this, rowID)}>
                              <View style={styles.chooseCell}><Text style={styles.chooseTitle}>{rowData}</Text></View>
                          </TouchableWithoutFeedback>
                      }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    textInputView: {
        width: 300,
        height: 40,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        width: 260,
        alignSelf: "stretch",
        fontSize: 14,
        borderWidth: 1,
        borderColor: defaultDarkLineColor,
        borderRadius: 2,
        paddingLeft: 5,
        backgroundColor: defaultBgColor,
    },
    textInput2: {
        width: 260,
        height: 40,
        borderWidth: 1,
        borderColor: defaultDarkLineColor,
        borderRadius: 2,
        paddingLeft: 5,
        backgroundColor: defaultBgColor,
        justifyContent:"center",
    },
    textYuan: {
        marginLeft: 15,
        color: defaultGreenColor,
        fontSize: 15,
        fontWeight: "800",
    },
    popupDialog: {},
    textHolder: {
       fontSize: 14,
        color: defaultLightGray,
    },
    textHolderS: {
        color: defaultBlackColor
    },
    downButton: {
        flex: 1,
        marginLeft: -1,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: defaultGreenColor,
        borderRadius: 2
    },
    downImg: {
        width: 20,
        height: 20,
    },
    downPercent: {
        color: "white",
    },
    chooseCell: {
        borderBottomColor: defaultLineColor,
        borderBottomWidth: 1,
    },
    chooseTitle: {
        paddingLeft: 10,
        height: 44,
        color: defaultLightGray,
        lineHeight: 44,
    },
    interetExpenses: {
        alignSelf: "stretch",
        textAlign: "center",
        height: 25,
        marginTop: 20,
        color: defaultSecondBlackColor,
        fontSize: 16
    },
    interetExpensesValue: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 20,
    },
    interetExpensesValue0: {
        color: defaultSecondBlackColor,
        fontSize: 18,
    },
    interetExpensesValue1: {
        color: defaultOrangeColor,
        fontSize: 18,
    },
    listView: {
        borderRadius: 5,
    }


})

export default LoanCalculator

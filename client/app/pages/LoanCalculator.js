import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableWithoutFeedback,TextInput,ListView,InteractionManager} from 'react-native'
import CustomToolbar from '../components/CustomToolbar'
import {defaultSecondBlackColor,defaultBgColor,defaultDarkLineColor,defaultGreenColor,defaultBlackColor,defaultOrangeColor,defaultLightGray,defaultLineColor} from '../utils/CommonColor'
import dismissKeyboard from 'dismissKeyboard'
import PopupDialog, {
    DialogTitle,
    DialogButton,
    DefaultAnimation,

} from 'react-native-popup-dialog';

class LoanCalculator extends Component {

  constructor(props){
    super(props)
    this.state={timeIndex: -1,rateIndex: -1,preferentialRateIndex: -1,selecteIndex: 0,showLX:0.0,money:0.0}
    this.didClickedContainerView = this.didClickedContainerView.bind(this)
    this.didClickedItem = this.didClickedItem.bind(this)
    this.didClickedDialogItem = this.didClickedDialogItem.bind(this)
    this.calculatorResult = this.calculatorResult.bind(this)
    this.textFieldChange = this.textFieldChange.bind(this)
  }

  static defaultProps = {
           time: ["1个月","2个月","3个月","4个月"],
           rate: ["3.0%","4.0%","5%"],
           preferentialRate: ["9折","8.8折"]
    }

  didClickedContainerView() {
    dismissKeyboard();
  }

  didClickedDialogItem(index) {
    this.popupDialog.closeDialog()
    switch (this.state.selecteIndex) {
      case 0:
        this.setState({timeIndex: index})
        break;
      case 1:
          this.setState({rateIndex: index})
          break;
      case 2:
        this.setState({preferentialRateIndex: index})
       break;
      default:
    }
    this.calculatorResult()
  }

  textFieldChange(text) {
    console.log(text);
    this.setState({money: text})
    this.calculatorResult()
  }

  calculatorResult() {
    setTimeout(()=>{
      if(this.state.timeIndex != -1 && this.state.rateIndex != -1 && this.state.preferentialRateIndex != -1) {
      this.setState({showLX: this.state.money})
    }

    },100)
  }

  didClickedItem(index) {
    this.setState({selecteIndex: index})
    this.popupDialog.openDialog()
  }

  render() {
    var timeStyle = [styles.textInput,styles.textHolder]
    var rateStyle = [styles.textInput,styles.textHolder]
    var preferentialRateStyle = [styles.textInput,styles.textHolder]
    var timeString = "请输入贷款期限"
    var rateString = "请输入利率"
    var preferentialRateString = "请输入优惠利率"
    if (this.state.timeIndex != -1) {
      timeStyle.push(styles.textHolderS)
      timeString = this.props.time[this.state.timeIndex]
    }
    if(this.state.rateIndex != -1) {
      rateStyle.push(styles.textHolderS)
      rateString = this.props.rate[this.state.rateIndex]
    }
    if(this.state.preferentialRateIndex != -1) {
      preferentialRateStyle.push(styles.textHolderS)
      preferentialRateString = this.props.preferentialRate[this.state.preferentialRateIndex]
    }
    const selecteIndex = this.state.selecteIndex
    var data = null

    switch (selecteIndex) {
      case 0:
        data=this.props.time
        break;
      case 1:
        data=this.props.rate
          break;
      case 2:
        data=this.props.preferentialRate
        break;
      default:

    }
    const {navigator} = this.props
    return(
      <TouchableWithoutFeedback onPress={this.didClickedContainerView}>
      <View style={styles.container}>
        <CustomToolbar title="贷款计算器" navigator={navigator} />
        <View style={styles.textInputView}>
         <TextInput placeholder="请输入贷款金额" style={styles.textInput} onChangeText={this.textFieldChange}
          keyboardType="decimal-pad" placeholderTextColor={defaultLightGray}/>
         <Text style={styles.textYuan}>元</Text>
        </View>

        <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this,0)}>
        <View style={styles.textInputView}>
          <Text style={timeStyle}>{timeString}</Text>
          <View style={styles.downButton}><Image style={styles.downImg} source={require("../img/arrowDown.png")}/></View>
        </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this,1)}>
        <View style={styles.textInputView}>
          <Text style={rateStyle}>{rateString}</Text>
          <View style={styles.downButton}><Image style={styles.downImg} source={require("../img/arrowDown.png")}/></View>
        </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this,2)}>
        <View style={styles.textInputView}>
          <Text style={preferentialRateStyle}>{preferentialRateString}</Text>
          <View style={styles.downButton}><Image style={styles.downImg} source={require("../img/arrowDown.png")}/></View>
        </View>
        </TouchableWithoutFeedback>

          <Text style={styles.interetExpenses}>支出利息</Text>
          <View style={styles.interetExpensesValue}>
                <Text style={styles.interetExpensesValue0}>￥</Text>
                <Text style={styles.interetExpensesValue1}>{this.state.showLX}</Text>
          </View>

        <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
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
    const ds =  new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state= {dataSource: ds.cloneWithRows(this.props.data)}
  }

  clickedCell(index) {
    this.props.closure(index)
  }

  render() {
    return(
      <ListView dataSource={this.state.dataSource}
      renderRow={(rowData,sectionID,rowID)=>
        <TouchableWithoutFeedback onPress={this.clickedCell.bind(this,rowID)}>
        <View style={styles.chooseCell}><Text style={styles.chooseTitle}>{rowData}</Text></View>
        </TouchableWithoutFeedback>
      }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    backgroundColor:"white",
  },
  textInputView: {
    width: 300,
    height: 40,
    marginTop:30,
    flexDirection: "row",
    alignItems:"center",
  },
  textInput: {
    width: 260,
    alignSelf:"stretch",
    fontSize:14,
    borderWidth:1,
    borderColor:defaultDarkLineColor,
    borderRadius: 2,
    paddingLeft: 5,
    backgroundColor:defaultBgColor,
  },
  textYuan: {
    marginLeft: 15,
    color: defaultGreenColor,
    fontSize:20,
    fontWeight: "800",
  },
  popupDialog: {},
  textHolder: {
    color: defaultLightGray,
    lineHeight: 40
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
  chooseCell: {
    borderBottomColor: defaultLineColor,
    borderBottomWidth: 1,
  },
  chooseTitle: {
    paddingLeft: 10,
    height: 44,
    color: defaultLightGray,
    lineHeight:44,
  },
  interetExpenses: {
    alignSelf:"stretch",
    textAlign:"center",
    height: 25,
    marginTop:20,
    color: defaultSecondBlackColor,
    fontSize: 16
  },
  interetExpensesValue: {
    flexDirection:"row",
    marginTop: 10,
    alignItems:"center",
    justifyContent:"center",
    height: 20,
  },
  interetExpensesValue0: {
    color:defaultSecondBlackColor,
    fontSize: 18,
  },
  interetExpensesValue1: {
    color: defaultOrangeColor,
    fontSize:18,
  },



})

export default LoanCalculator

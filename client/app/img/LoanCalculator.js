import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableWithoutFeedback,TextInput} from 'react-native'
import CustomToolbar from '../components/CustomToolbar'
import {defaultBgColor,defaultDarkLineColor,defaultGreenColor,defaultBlackColor,defaultLightGray} from '../utils/CommonColor'
import dismissKeyboard from 'dismissKeyboard'
import PopupDialog, {
    DialogTitle,
    DialogButton,
    DefaultAnimation,
} from 'react-native-popup-dialog';
import { Button } from 'react-native-elements'

class LoanCalculator extends Component {

  constructor(props){
    super(props)
    this.didClickedContainerView = this.didClickedContainerView.bind(this)
    this.didClickedItem = this.didClickedItem.bind(this)
  }

  didClickedContainerView() {
    dismissKeyboard();
  }

  didClickedItem(index) {
    console.log(index);
    this.popupDialog.openDialog()
  }

  render() {

    const {navigator} = this.props
    return(
      <TouchableWithoutFeedback onPress={this.didClickedContainerView}>
      <View style={styles.container}>
        <CustomToolbar title="贷款计算器" navigator={navigator} />
        <View style={styles.textInputView}>
         <TextInput placeholder="请输入贷款金额" style={styles.textInput} keyboardType="decimal-pad"/>
         <Text style={styles.textYuan}>元</Text>
        </View>

        <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this,0)}>
        <View style={styles.textInputView}>
          <Text style={[styles.textInput,styles.textHolder]}>请输入贷款期限</Text>
        </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this,1)}>
        <View style={styles.textInputView}>
          <Text style={styles.textInput}>请输入贷款期限</Text>
        </View>
          </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.didClickedItem.bind(this,2)}>
        <View style={styles.textInputView}>
          <Text style={styles.textInput}>请输入贷款期限</Text>
        </View>
           </TouchableWithoutFeedback>

        <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        dialogTitle={<DialogTitle title="DialogTitle"/>}
        width={250} height={300}
        >
        <Text>Hello word</Text>
        </PopupDialog>

      </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: "orange",
  },
  textInput: {
    width: 250,
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
  }
})

export default LoanCalculator

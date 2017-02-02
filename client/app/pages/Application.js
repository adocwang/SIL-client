import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator} from 'react-native'
import LoanCalculatorContainer from '../containers/LoanCalculatorContainer'
import CollectionContainer from '../containers/CollectionContainer'
class Application extends Component {

 constructor(props) {
   super(props)
   this.didClickedItem = this.didClickedItem.bind(this)
 }

  didClickedItem(index) {
    console.log(index);
    switch (index) {
      case 0:
        this.turnLoadCalculator()
        break;
      case 2:
        this.turnToCollection()
        break
      default:
    }
  }

  turnLoadCalculator() {
    const {navigator} = this.props
    navigator.push({
        component: LoanCalculatorContainer,
        name: 'LoanCalculatorContainer',
    });
  }

  turnToCollection() {
    const {navigator} = this.props
    navigator.push({
      component: CollectionContainer,
      name: 'CollectionContainer'
    })
  }

  render() {
    return (
    <View style={styles.containers}>
      <View style={styles.chooseBox}>
       <View style={[styles.chooseHorView,styles.chooseHorBottomLine]}>
          <View style={[styles.chooseVerView,styles.chooseVerRightLine]}>
            <ApplicationItem index={0} clickClosure={this.didClickedItem}/>
          </View>
          <View style={styles.chooseVerView}><ApplicationItem index={1} clickClosure={this.didClickedItem}/></View>
        </View>
        <View style={styles.chooseHorView}>
          <View style={[styles.chooseVerView,styles.chooseVerRightLine]}><ApplicationItem index={2} clickClosure={this.didClickedItem}/></View>
          <View style={styles.chooseVerView}><ApplicationItem index={3} clickClosure={this.didClickedItem}/></View>
        </View>
      </View>
    </View>
    )
  }
}

class ApplicationItem extends Component {

 constructor(props){
   super(props)
   this.clickedItem = this.clickedItem.bind(this)
 }

  clickedItem() {
    const {clickClosure} = this.props
    clickClosure(this.props.index)
  }

  render() {
    var imgFile = null
    var title = "加载中"
    var itemStyle = ""
    const {index} = this.props.index
  switch (this.props.index) {
    case 0:
        imgFile = require("../img/loanLogo.png")
        title = "贷款计算器"
        itemStyle = {width:35,height:20,marginTop:35}
        break;
    case 1:
        imgFile = require("../img/hsLogo.png")
        title = "话术"
        itemStyle = {width:27,height:20,marginTop:35}
        break;
    case 2:
        imgFile = require("../img/collectLogo.png")
        title = "现场采集"
        itemStyle = {width:30,height:20,marginTop:35}
        break;
    case 3:
        imgFile = require("../img/calculatorLogo.png")
        title = "VL计算器"
        itemStyle = {width:15,height:20,marginTop:35}
        break;
    default:
        console.log(this.props.index);
}
    return(
      <TouchableWithoutFeedback onPress={this.clickedItem}>
      <View style={styles.chooseItem}>
      <Image style={itemStyle} source={imgFile}/>
      <Text style={styles.chooseTitle}>{title}</Text>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    flex:1,
    alignItems:"center",
    justifyContent: "center",
  },
  chooseBox: {
    borderWidth:1,
    borderColor:"#aaa",
    width: 240,
    height: 240,
    marginBottom:100,
  },
  chooseHorView: {
    alignSelf: 'stretch',
    height: 120,
    flexDirection: 'row',
  },
  chooseHorBottomLine: {
    borderBottomWidth:1,
    borderBottomColor:"#aaa",
  },
  chooseVerView: {
    width:120,
    alignSelf:'stretch',
  },
  chooseVerRightLine: {
    borderRightWidth:1,
    borderRightColor:"#aaa",
  },
  chooseItem: {
    flex:1,
    alignItems:"center"
  },
  chooseImg: {
    marginTop: 30
  },
  chooseTitle: {
    textAlign: "center",
    width: 100,
    height: 20,
    marginTop: 20
  }
})

export default Application

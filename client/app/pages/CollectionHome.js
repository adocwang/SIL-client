import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator,ListView} from 'react-native'
import LoanCalculatorContainer from '../containers/LoanCalculatorContainer'
import CollectionContainer from '../containers/CollectionContainer'
import CustomToolbar from '../components/CustomToolbar'
import CommonColor from '../utils/CommonColor'
import CollectionCertificate from './CollectionCertificate.js'
class CollectionHome extends Component {

    constructor(props) {
      super(props)
      this.data = {companys:[{name: "深圳市英威有限公司",selected:false},{name: "深圳市兰亭科技有限公司",selected:false},
      {name: "深圳市乐牛网络科技有限公司",selected:false}]}
      const ds =  new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      })
      this.state= {dataSource: ds.cloneWithRows(this.data.companys),selectedIndex: -1}
      this.clickedCell = this.clickedCell.bind(this)
      this.rightTitleClicked = this.rightTitleClicked.bind(this)
    }

    clickedCell(index) {
      this.setState({selectedIndex: index})
      let newData = JSON.parse(JSON.stringify(this.data.companys));
      newData[index].selected = true
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData)
      }
      )
    }

    rightTitleClicked() {
       if(this.state.selectedIndex != -1) {
         const {navigator} = this.props
         navigator.push({
           name: "CollectionCertificate",
           component: CollectionCertificate
         })
       }
    }

  render() {
    const {navigator} = this.props
    return(
      <View style={styles.container}>
        <CustomToolbar title="现场采集" navigator={this.props.navigator} operate="保存" onOperateClicked={this.rightTitleClicked}/>
      <Text style={styles.head}>选择采集公司</Text>
        <ListView dataSource={this.state.dataSource} style={styles.listView}
        renderRow={(rowData,sectionID,rowID)=>
            <CompanyCell data={rowData} clickClosure={this.clickedCell} rowID = {rowID}/>
        }
        />
      </View>
    )
  }
}

class CompanyCell extends Component {

  constructor(props) {
    super(props)
    this.clickedSelf = this.clickedSelf.bind(this)
  }

  clickedSelf() {
    const {rowID,clickClosure} = this.props
    clickClosure(rowID)
  }

  render() {
    console.log("更新");
    const {data} = this.props
    var imgFile = null
    if(data.selected) {
      imgFile = require("../img/radioS.png")
    } else {
      imgFile = require("../img/radio.png")
    }
    return(
    <TouchableWithoutFeedback onPress={this.clickedSelf}>
    <View style={styles.cell}>
    <Image source = {imgFile} style={styles.cellImage}/>
     <Text style={styles.cellTitle}>{data.name}</Text>
    </View>
  </TouchableWithoutFeedback>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  head: {
    alignSelf:"stretch",
    height: 45,
    paddingLeft: 50,
    lineHeight: 45,
    color: "black",
  },
  listView: {
    borderTopWidth:1,
    borderTopColor: CommonColor.defaultLineColor,
    marginTop: 10
  },
  cell:{
    height: 36,
    flexDirection:"row",
    alignItems:"center",
  },
  cellImage: {
    width: 13,
    height: 13,
    marginLeft: 60,
    marginTop:1
  },
  cellTitle: {
    marginLeft: 10,
    lineHeight: 40,
    color: CommonColor.defaultBlackColor
  }
})

export default CollectionHome

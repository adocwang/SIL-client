import React,{Component} from 'react';
import {TextInput,Dimensions,ScrollView,View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator,ListView} from 'react-native'
import LoanCalculatorContainer from '../../containers/LoanCalculatorContainer'
import CollectionContainer from '../../containers/CollectionContainer'
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import Takephoto from '../TakePhoto'
import Button from '../../components/Button.ios.js'
import CollectionTrade from './CollectionTrade'
class AccountCertifice extends Component {


  constructor(props){
    super(props)
    this.otherImgPath = [""]

    this.changePhoto = this.changePhoto.bind(this)
    this.didClickedSave = this.didClickedSave.bind(this)
 }


changePhoto(paths) {
  this.otherImgPath = paths
}

didClickedSave() {
  const {navigator} = this.props

  navigator.push({
    name: "CollectionTrade",
    component: CollectionTrade,
  })
}



  render() {
    return(
    <View style={styles.container}>
    <CustomToolbar title="现场采集" navigator={this.props.navigator} />
    <View style={styles.topView}>
    <Text style={styles.title}>营业执照</Text>
    <View style={styles.rightView}>
    <Image source={require("../../img/take_photo_icon.png")} style={styles.cameraImg}/>
    <Image source={require("../../img/write_icon.png")} style={styles.writeImg}/>
    </View>
    </View>
    <ScrollView>

    <AddPhoto changePhoto={this.changePhoto} navigator={this.props.navigator}/>
    <TextInput multiline style={styles.inputView} placeholder="输入文字内容" underlineColorAndroid="transparent"/>
    <Button style={styles.saveButton} titleStyle={styles.saveTitle} title="保存" onPress={this.didClickedSave}/>
    </ScrollView>
    </View>
  )
  }
}



class AddPhoto extends Component {

constructor(props) {
  super(props)

  this.changeIndex = 0
  this.state={otherImgPath:[""]}
  this.firstNotChange = true
  this.addOtherImg = this.addOtherImg.bind(this)
  this.takeOtherPhoto = this.takeOtherPhoto.bind(this)
  this.changeOtherImg = this.changeOtherImg.bind(this)
  this.backPaths = this.backPaths.bind(this)
  this.changePhoto = this.changePhoto.bind(this)
}


takeOtherPhoto() {
  const {navigator} = this.props

  navigator.push({
    name: "Takephoto",
    component: Takephoto,
    params:{
      takephotoClosure: this.addOtherImg,
    }
  })
}

addOtherImg(path) {
  this.setState(prev=>{
    prev.otherImgPath.push(path)
    this.backPaths(prev.otherImgPath)
    return({otherImgPath:prev.otherImgPath})
  })
}

changePhoto(index) {
  const {navigator} = this.props
  this.changeIndex = index
  navigator.push({
    name: "Takephoto",
    component: Takephoto,
    params:{
      takephotoClosure: this.changeOtherImg,
    }
  })
}

changeOtherImg(path) {
  this.setState(prev=>{
    prev.otherImgPath[this.changeIndex] = path
    this.backPaths(prev.otherImgPath)
    if(this.changeIndex==0) {
      this.firstNotChange = false
    }
    return({otherImgPath:prev.otherImgPath})
  })
}

backPaths(paths) {
  const {changePhoto} = this.props
  changePhoto(paths)
}

render(){

  var count = this.state.otherImgPath.length
  var lastCellStyle = [styles.addCellChild]
  if(count%2==1){
    lastCellStyle.push(styles.addCellRight)
  }
const cells = this.state.otherImgPath.map((path,index)=>
  <AddPhotoCell key={index} path={path} index={index} changePhoto={this.changePhoto} firstNotChange={this.firstNotChange}/>
)

  return(
  <View style={styles.addPhoto}>
    {cells}
      <TouchableWithoutFeedback onPress={this.takeOtherPhoto}>
       <View style={styles.addCell}>
         <View style={lastCellStyle}>
         <Image style={styles.addLastCellImg} source={require("../../img/add.png")}/>
         </View>
       </View>
     </TouchableWithoutFeedback >

  </View>
)}
}

class AddPhotoCell extends Component {

constructor(props) {
    super(props)
    this.changePhoto = this.changePhoto.bind(this)
}

changePhoto() {
    const {index, changePhoto} = this.props
    changePhoto(index)
}

  render() {
    const {index} = this.props
    var imgPath = {uri: this.props.path}
    var cellImgStyle = styles.mustCellImgS
    var cellStyle = [styles.addCellChild]
    if(index%2==1){
      cellStyle.push(styles.addCellRight)
    }
    if(index==0&&this.props.firstNotChange) {
      imgPath=require("../../img/default_img.png")
      cellImgStyle= styles.mustCellImg
    }
    return(
      <TouchableWithoutFeedback onPress={this.changePhoto}>
       <View style={styles.addCell}>
         <View style={cellStyle}>
         <Image style={cellImgStyle} source={imgPath}>
         </Image>
         </View>
       </View>
     </TouchableWithoutFeedback >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection:"row",
    height: 50,
    alignItems: "center",
    justifyContent:"space-between"
  },
  listView: {
    backgroundColor: "yellow",
    flex:1,
  },
  title: {
    marginLeft:40,
    color: CommonColor.defaultBlackColor
  },
  rightView: {
    marginRight: 35,
    height: 40,
    width: 80,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:0,
  },

  cameraImg: {
    height: 32,
    width: 32
  },
  writeImg: {
    height:32,
    width: 32,
  },

  takephotoMustCell: {
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    height: 100,
  },
  takephotoMustCell0: {
    height: 90,
    flex: 1,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: CommonColor.defaultLightGray,
    borderRadius: 2,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    padding: 1,
  },
  mustCellImg: {
    width: 40,
    height: 40,
  },
  mustCellImgS: {
    flexDirection:"row",
    flex: 1,
    height: 86,
    justifyContent:"flex-end"
  },
  takephotoMustCell1: {
    marginRight: 40,
  },
  takephotoCell: {
    height: 50,
    width: 50,
  },
  addPhoto: {
    flex: 1,
    alignSelf:"stretch",
    flexDirection:"row",
    flexWrap: "wrap",
  },
  addCell: {
    flexDirection:"row",
    height: 110,
    width: Dimensions.get('window').width/2,
    alignItems:"center",
    justifyContent:"center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  addCellChild: {
    borderWidth: 1,
    borderColor: CommonColor.defaultLightGray,
    borderRadius: 2,
    flexDirection:"row",
    flex: 1,
    height: 90,
    marginLeft: 40,
    marginRight: 20,
    alignItems:"center",
    justifyContent:"center",
    padding: 1,
  },
  addCellRight: {
    marginLeft: 20,
    marginRight: 40,
  },
  addLastCellImg: {
    width: 12,
    height: 12,
  },
  saveButton: {
    width: 160,
    height: 40,
    borderWidth: 1,
    borderColor: CommonColor.defaultBlueColor,
    borderRadius: 20,
    alignSelf:"center",
    marginTop: 40,
  },
  saveTitle: {
    color:CommonColor.defaultBlueColor
  },

  inputView: {

    alignSelf: "stretch",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    height: 80,
    backgroundColor: CommonColor.defaultBgColor,
    borderColor: CommonColor.defaultDarkLineColor,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 14,
    paddingLeft: 5,
  }
})

export default AccountCertifice

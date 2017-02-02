import React,{Component} from 'react';
import {Dimensions,ScrollView,View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator,ListView} from 'react-native'
import LoanCalculatorContainer from '../containers/LoanCalculatorContainer'
import CollectionContainer from '../containers/CollectionContainer'
import CustomToolbar from '../components/CustomToolbar'
import CommonColor from '../utils/CommonColor'
import Takephoto from './TakePhoto'
import Button from '../components/Button.ios.js'
import CollectionTrade from './CollectionTrade'
class CollectionTakephoto extends Component {


  constructor(props){
    super(props)
    this.mustCellImgPath0 = null
    this.mustCellImgPath1 = null
    this.otherImgPath = []

    this.mustCellTakephoto = this.mustCellTakephoto.bind(this)
    this.changePhoto = this.changePhoto.bind(this)
    this.didClickedSave = this.didClickedSave.bind(this)
 }

mustCellTakephoto(index,path) {
  if(index == 0) {
    this.mustCellImgPath0 = path
  } else {
    this.mustCellImgPath1 = path
  }
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
    <Image source={require("../img/take_photo_icon.png")} style={styles.cameraImg}/>
    </View>
    <ScrollView>

    <TakephotoMustCell navigator={this.props.navigator} takephotoClosure={this.mustCellTakephoto}/>
    <AddPhoto changePhoto={this.changePhoto} navigator={this.props.navigator}/>
      <Button style={styles.saveButton} titleStyle={styles.saveTitle} title="保存" onPress={this.didClickedSave}/>
    </ScrollView>
    </View>
  )
  }
}

class TakephotoMustCell extends Component {

  constructor(props){
    super(props)
    this.state={imgPath0: null,imgPath1:null}
    this.takephoto = this.takephoto.bind(this)
    this.takephotoClosure = this.takephotoClosure.bind(this)
    this.selectedIndex = -1
  }

  takephotoClosure(path) {
     const {takephotoClosure} = this.props
     takephotoClosure(this.selectedIndex,path)
     if(this.selectedIndex === 0) {
       this.setState({imgPath0: path})
     }
     if(this.selectedIndex === 1) {
       this.setState({imgPath1: path})
     }

  }

  takephoto(index) {
    this.selectedIndex = index
    const {navigator} = this.props
    console.log("11");

    navigator.push({
      name: "Takephoto",
      component: Takephoto,
      params:{
        takephotoClosure: this.takephotoClosure,
      }
    })
  }

  render() {
    var img0 = null
    var imgStyle0 = null
    if(this.state.imgPath0 == null) {
      img0 = require("../img/default_img.png")
      imgStyle0 = styles.mustCellImg
    } else {
      imgStyle0 = styles.mustCellImgS
      img0 = {uri: this.state.imgPath0}
    }
    var img1 = null
    var imgStyle1 = null
    if(this.state.imgPath1 == null) {
      img1 = require("../img/default_img.png")
      imgStyle1 = styles.mustCellImg
    } else {
      imgStyle1 = styles.mustCellImgS
      img1 = {uri: this.state.imgPath1}
    }
     return(
      <View style={styles.takephotoMustCell}>
        <TouchableWithoutFeedback onPress={this.takephoto.bind(this,0)}>
         <View style={styles.takephotoMustCell0}>
          <Image source={img0} style={imgStyle0}/>
         </View>
        </TouchableWithoutFeedback >

        <TouchableWithoutFeedback onPress={this.takephoto.bind(this,1)}>
         <View style={[styles.takephotoMustCell1,styles.takephotoMustCell0]}>
          <Image source={img1} style={imgStyle1}/>
         </View>
       </TouchableWithoutFeedback >
      </View>
    )
  }
}

class AddPhoto extends Component {

constructor(props) {
  super(props)

  this.changeIndex = 0
  this.state={otherImgPath:[]}
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
    return({otherImgPath:prev.otherImgPath})
  })
}


addOtherImg(path) {
  this.setState(prev=>{
    prev.otherImgPath.push(path)
    this.backPaths(prev.otherImgPath)
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
  <AddPhotoCell key={index} path={path} index={index} changePhoto={this.changePhoto}/>
)

  return(
  <View style={styles.addPhoto}>
    {cells}
      <TouchableWithoutFeedback onPress={this.takeOtherPhoto}>
       <View style={styles.addCell}>
         <View style={lastCellStyle}>
         <Image style={styles.addLastCellImg} source={require("../img/add.png")}/>
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
    const imgPath = {uri: this.props.path}

    var cellStyle = [styles.addCellChild]
    if(index%2==1){
      cellStyle.push(styles.addCellRight)
    }


    return(
      <TouchableWithoutFeedback onPress={this.changePhoto}>
       <View style={styles.addCell}>
         <View style={cellStyle}>
         <Image style={styles.mustCellImgS} source={imgPath}>
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
  cameraImg: {
    marginRight: 40,
    height: 32,
    width: 32
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
  delete: {
    width: 20,
    height:20,
  }
})

export default CollectionTakephoto

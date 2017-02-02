import React,{Component,PropTypes} from 'react';
import {View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator,ListView} from 'react-native'
import CommonColor from '../utils/CommonColor'
import Camera from 'react-native-camera';
import Button from '../components/Button.ios.js'

class Takephoto extends Component {

  constructor(props){
    super(props)
    this.takePicture = this.takePicture.bind(this)
    this.use = this.use.bind(this)
    this.again = this.again.bind(this)
    this.state = {process: "take"} // take over
    this.imgUri = null
 }

 takePicture() {
   this.camera.capture()
      .then((data) => {
        this.imgUri = data.path
        this.setState({process: "over"})
      })
      .catch(err => console.error(err));
  }

  use() {

    const {navigator,route} = this.props
    const {takephotoClosure} = route.params
    takephotoClosure(this.imgUri)
    navigator.pop()
  }

  again() {
    this.setState({process: "take"})

  }

  render() {
    const imgUriValue = this.imgUri
    const pic = {
				uri: imgUriValue
			};
    console.log(imgUriValue);
    return(
    <View style={styles.container}>
    {this.state.process == "take" ?
    <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        captureTarget={Camera.constants.CaptureTarget.disk}
        aspect={Camera.constants.Aspect.fill}>
        <TouchableWithoutFeedback onPress={this.takePicture}>
        <Image style={styles.takeButton} source={require("../img/takeCamera.png")}/>
        </TouchableWithoutFeedback>
      </Camera> :
    <Image style={styles.preview} source={pic}>
     <View style={styles.bottomView}>
       <Button style={styles.againBg} title="重拍" titleStyle={styles.use} onPress={this.again}/>
       <Button style={styles.useBg} title="使用" titleStyle={styles.use} onPress={this.use}/>
     </View>
    </Image>
    }
    </View>
  )
  }
}

export default Takephoto


const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignSelf:"stretch"
},
bottomView: {
  height: 40,
  backgroundColor:"rgba(0,0,0,0.4)",
  alignSelf:"stretch",
  alignItems:"center",
  flexDirection: "row",
  justifyContent:"space-between"

},
takeButton: {
  width: 50,
  height: 50,
  marginBottom: 30,
},
againBg: {
  marginLeft: 15,
},
again: {
  lineHeight: 40,
  color:"white",
},
useBg: {
  marginRight: 15,

},
use: {
  lineHeight: 40,
  color:"white",
}

})

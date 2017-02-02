import React,{Component,PropTypes} from 'react';
import {View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator,ListView} from 'react-native'

class Button extends Component {

 onPress() {
   const {onPress} = this.props
   onPress()
 }

  render() {
    const {style,title,titleStyle,onPress} = this.props
    const bgStyles = [style,styles.bg]
    return(
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={bgStyles}>
          <Text style={titleStyle}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    alignItems: "center",
    justifyContent:"center"
  }
})

export default Button

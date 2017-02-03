import React,{Component} from 'react';
import {TextInput,ScrollView,View,StyleSheet,Text,Image,TouchableWithoutFeedback,Navigator,ListView} from 'react-native'
import CustomToolbar from '../components/CustomToolbar'
import CommonColor from '../utils/CommonColor'
import Button from '../components/Button.ios.js'
import AcountCertifice from './AcountCertifice.js'

export default class VLCalculator extends Component {
  render() {
    return(
      <View style={styles.container}>
      <CustomToolbar title="现场采集" navigator={this.props.navigator} />
      <View style={styles.topView}>
      <Text>融资金额</Text>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection: "row",
    height: 54,
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth: 10,
    borderBottomColor: CommonColor.defaultBgColor,
  },
})

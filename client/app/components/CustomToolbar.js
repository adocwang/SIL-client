/**
 * Created by kiefer on 2017/1/23.
 */
import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {NaviGoBack} from '../utils/CommonUtils';

const styles = StyleSheet.create({
  container: {
  },
  rightView: {
    marginLeft:200,
    width: 100,
    height: 20,
    backgroundColor: "orange",
  },

});

const propTypes = {
  title: PropTypes.string,
  operate: PropTypes.string,
  actions: PropTypes.array,
  navigator: PropTypes.object,
  onIconClicked: PropTypes.func,
  onOperateClicked: PropTypes.func,
  navIcon: PropTypes.number,
  customView: PropTypes.object
}

class CustomToolbar extends React.Component {


  constructor(props) {
    super(props);
    this.onIconClicked = this.onIconClicked.bind(this);
<<<<<<< HEAD
    this.rightClicked = this.rightClicked.bind(this)
=======
    this.onOperateClicked = this.onOperateClicked.bind(this);
>>>>>>> a6598afe2abbd348d855c7a88aa993d0bb7b05a8
  }

  onIconClicked() {
    console.log(this.props);
    if (this.props.onIconClicked) {
      this.props.onIconClicked();
    } else {
      const {navigator} = this.props;
      if (navigator) {
        NaviGoBack(navigator);
      }
    }
  }

<<<<<<< HEAD
  rightClicked() {
    this.props.rightClosure()
  }


=======
  onOperateClicked() {
    if (this.props.onOperateClicked) {
      this.props.onOperateClicked();
    }
  }
>>>>>>> a6598afe2abbd348d855c7a88aa993d0bb7b05a8
  render() {

    return (
          <Image source={require('../img/toolbar_bg.png')}
                 style={{height:100, width:null, flexDirection: 'row',resizeMode: Image.resizeMode.stretch}}>
            <View
<<<<<<< HEAD
                style={{flexDirection: 'row', flex:1,alignItems: 'center',justifyContent: 'flex-start',marginLeft:15}}>
=======
                style={{flexDirection: 'row', alignItems: 'flex-start',justifyContent: 'center',marginLeft:26}}>
>>>>>>> a6598afe2abbd348d855c7a88aa993d0bb7b05a8
              <TouchableOpacity onPress={this.onIconClicked}>
                <Image
                    style={{ width: 10, height: 17}}
                    source={require('../img/back_arrow_white.png')}
                /></TouchableOpacity>
<<<<<<< HEAD
              <Text style={{fontSize: 16,marginLeft:10}}>认领</Text>

              <TouchableOpacity onPress={this.rightClicked}>
              <View style={styles.rightView}>
                <Text>{this.props.rightTitle}</Text>
              </View>
            </TouchableOpacity>

=======
              <Text style={{fontSize: 16, color: '#ffffff',marginTop:22,marginLeft:10}}>{this.props.title}</Text>
            </View>
            <View
                style={{flexDirection: 'row', flex:1,alignItems: 'flex-start',justifyContent: 'flex-end',marginRight:30}}>
              <TouchableOpacity onPress={this.onOperateClicked}>
            <Text style={{fontSize: 16, color: '#ffffff',marginTop:22}}>{this.props.operate}</Text>
                </TouchableOpacity>
>>>>>>> a6598afe2abbd348d855c7a88aa993d0bb7b05a8
            </View>

          </Image>
    );
  }
}

CustomToolbar.propTypes = propTypes;

CustomToolbar.defaultProps = {
  onActionSelected: function () {
  },
  title: '',
  operate:'',
  actions: []
};


export default  CustomToolbar

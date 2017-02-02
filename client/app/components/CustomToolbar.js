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
  actions: PropTypes.array,
  navigator: PropTypes.object,
  onIconClicked: PropTypes.func,
  navIcon: PropTypes.number,
  customView: PropTypes.object
}

class CustomToolbar extends React.Component {


  constructor(props) {
    super(props);
    this.onIconClicked = this.onIconClicked.bind(this);
    this.rightClicked = this.rightClicked.bind(this)
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

  rightClicked() {
    this.props.rightClosure()
  }


  render() {

    return (
        <View style={styles.container}>
          <Image source={require('../img/toolbar_bg.png')}
                 style={{height:100,  flexDirection: 'row', resizeMode: Image.resizeMode.stretch}}>
            <View
                style={{flexDirection: 'row', flex:1,alignItems: 'center',justifyContent: 'flex-start',marginLeft:15}}>
              <TouchableOpacity onPress={this.onIconClicked}>
                <Image
                    style={{ width: 10, height: 17}}
                    source={require('../img/back_arrow_white.png')}
                /></TouchableOpacity>
              <Text style={{fontSize: 16,marginLeft:10}}>认领</Text>

              <TouchableOpacity onPress={this.rightClicked}>
              <View style={styles.rightView}>
                <Text>{this.props.rightTitle}</Text>
              </View>
            </TouchableOpacity>

            </View>

          </Image>
        </View>
    );
  }
}

CustomToolbar.propTypes = propTypes;

CustomToolbar.defaultProps = {
  onActionSelected: function () {
  },
  title: '',
  actions: []
};


export default  CustomToolbar

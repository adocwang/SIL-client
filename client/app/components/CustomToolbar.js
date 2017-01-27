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


  render() {

    return (
        <View style={styles.container}>
          <Image source={require('../img/toolbar_bg.png')}
                 style={{height:100,  flexDirection: 'row', resizeMode: Image.resizeMode.stretch}}>
            <View
                style={{flexDirection: 'row', alignItems: 'flex-start',justifyContent: 'center',marginLeft:26,marginRight:26}}>
              <TouchableOpacity onPress={this.onIconClicked}>
                <Image
                    style={{ width: 10, height: 17,marginTop:25}}
                    source={require('../img/back_arrow_white.png')}
                /></TouchableOpacity>
              <Text style={{fontSize: 16, color: '#ffffff',marginTop:22,marginLeft:10}}>认领</Text>
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
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import Button from './Button'


const CustomTabBar = React.createClass({

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    underlineHeight: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      underlineColor: 'navy',
      backgroundColor: null,
      underlineHeight: 4,
    };
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    var icon ;
    switch (page){
      case 0:
        icon= require('../img/new_company_icon.png');
        break;
      case 1:
        icon= require('../img/risk_icon.png');
        break;
      case 2:
        icon= require('../img/trading_icon.png');
        break
      default:
        icon= require('../img/new_company_icon.png');
    }

    return <Button
        style={{flex: 1}}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => this.props.goToPage(page)}
    >
      <View style={{flex:1}}>
      <View style={[styles.tab, this.props.tabStyle]}>
        <Image source = {icon} style={{alignSelf:'center',}}/>
      </View>
      <Text style={[{color: textColor, fontWeight, alignSelf:'center',paddingBottom:5}, textStyle, ]}>
        {name}
      </Text>
        </View>
    </Button>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.underlineHeight,
      backgroundColor: this.props.underlineColor,
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return (
        <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
        </View>
    );
  },


  componentDidMount() {
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});

export default CustomTabBar;
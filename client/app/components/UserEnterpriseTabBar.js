/**
 * Created by kiefer on 2017/2/3.
 */
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


const UserEnterpriseTabBar = React.createClass({

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        redCounts:React.PropTypes.array,
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
            redCounts:[0,0,0]
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
                if(isTabActive){
                    icon= require('../img/yishouli.png');
                }else{
                    icon= require('../img/yishouli_d.png');
                }
                break;
            case 1:
                if(isTabActive){
                    icon= require('../img/shenpizhong.png');
                }else{
                    icon= require('../img/shenpizhong_d.png');
                }
                break;
            case 2:
                if(isTabActive){
                    icon= require('../img/shenpitongguo.png');
                }else{
                    icon= require('../img/shenpitongguo_d.png');
                }
                break
            case 3:
                if(isTabActive){
                    icon= require('../img/qianyue.png');
                }else{
                    icon= require('../img/qianyue_d.png');
                }
                break
            case 4:
                if(isTabActive){
                    icon= require('../img/fangkuan.png');
                }else{
                    icon= require('../img/fangkuan_d.png');
                }
                break
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
                {
                    this.props.redCounts[page] > 0 ?
                    <View style={{alignItems:'flex-end',paddingRight:20}}>
                        <Image style={{alignItems:'center',width:15,height:14}} source={require('../img/new_message.png')}>
                            {/*<Text  style={{color:'#ffffff',paddingLeft:2}}>{this.props.redCounts[page]}</Text>*/}
                        </Image>
                    </View>: <View style={{alignItems:'flex-end',paddingRight:20,width:15,height:14}}></View>
                }

                <View style={[styles.tab, this.props.tabStyle]}>
                    <Image source = {icon} style={{alignSelf:'center',}}/>

                </View>
                <Text style={[{color: textColor, fontWeight, alignSelf:'center',paddingBottom:15}, textStyle, ]}>
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

export default UserEnterpriseTabBar;
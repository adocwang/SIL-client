/**
 * Created by kiefer on 2017/2/4.
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Button from './../Button'


const DaiKuanJinDu = React.createClass({

    propTypes: {
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: '#4A4A4A',
            inactiveTextColor: '#4A4A4A',
            backgroundColor: null,
            tabs:['已受理','审批中','审批通过','签约','放款']
        };
    },

    renderTabOption(name, page) {
        const isTabActive = this.props.activeTab >= page;
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'normal' : 'normal';

        var icon ;
        switch (page){
            case 0:
                if(isTabActive){
                    icon= require('../../img/yishouli_g.png');
                }else{
                    icon= require('../../img/yishouli_d.png');
                }
                break;
            case 1:
                if(isTabActive){
                    icon= require('../../img/shenpizhong_g.png');
                }else{
                    icon= require('../../img/shenpizhong_d.png');
                }
                break;
            case 2:
                if(isTabActive){
                    icon= require('../../img/shenpitongguo_g.png');
                }else{
                    icon= require('../../img/shenpitongguo_d.png');
                }
                break
            case 3:
                if(isTabActive){
                    icon= require('../../img/qianyue_g.png');
                }else{
                    icon= require('../../img/qianyue_d.png');
                }
                break
            case 4:
                if(isTabActive){
                    icon= require('../../img/fangkuan_g.png');
                }else{
                    icon= require('../../img/fangkuan_d.png');
                }
                break
        }

        return <View
            key={name}
            style={styles.tab}
        >
                    <Image source = {icon} style={styles.icon}/>
                    {isTabActive? <Image source = {require('../../img/line_dot_green.png')} style={styles.jindu}/>
                    : <Image source = {require('../../img/line_dot_gray.png')} style={styles.jindu}/>}

                <Text style={[{color: textColor, fontWeight, alignSelf:'center',paddingBottom:15,paddingTop:5}, textStyle, ]}>
                    {name}
                </Text>
        </View>;
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;


        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    },


    componentDidMount() {
    },
});

const styles = StyleSheet.create({
    tab: {
        flex:1,
        justifyContent: 'center',
        paddingBottom: 10,
        backgroundColor:'transparent'
    },
    tabs: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    jindu:{
        alignSelf:'center',
        marginTop:5,
        resizeMode: Image.resizeMode.cover
    },
    icon:{
        alignSelf:'center',
        marginTop:20,
        height:15,
    }
});

export default DaiKuanJinDu;
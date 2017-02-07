/**
 * Created by kiefer on 2017/1/23.
 */
'use strict';

import React, { PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform
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

class PageToolBar extends React.Component {


    constructor(props) {
        super(props);

        this.onOperateClicked = this.onOperateClicked.bind(this);
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


    onOperateClicked() {
        if (this.props.onOperateClicked) {
            this.props.onOperateClicked();
        }
    }
    render() {

        return (
            <View style={{backgroundColor:'#ffffff',height:60}}>
                <View
                style={{flexDirection: 'row', marginLeft:26,marginTop:20}}>

                    <TouchableOpacity onPress={this.onIconClicked}>
                        <Image
                            style={{ marginTop:(Platform.OS === 'ios') ? 10 : 3,}}
                            source={require('../img/back_arrow.png')}
                        /></TouchableOpacity>

                    <Text style={{fontSize: 16, color: '#9a9a9a',marginLeft:10,marginTop:(Platform.OS === 'ios') ? 10 : 0,backgroundColor:'transparent'}}>{this.props.title}</Text>
                </View>
                <View
                    style={{flexDirection: 'row', flex:1,alignItems: 'center',justifyContent: 'flex-end',marginRight:30}}>
                    <TouchableOpacity onPress={this.onOperateClicked}>
                        <Text style={{fontSize: 16, color: '#ffffff',backgroundColor:'transparent'}}>{this.props.operate}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

PageToolBar.propTypes = propTypes;

PageToolBar.defaultProps = {
    onActionSelected: function () {
    },
    title: '',
    operate:'',
    actions: []
};


export default  PageToolBar
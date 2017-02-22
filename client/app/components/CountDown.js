/**
 * Created by kiefer on 2017/1/31.
 */
import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
var TimerMixin = require('react-timer-mixin');

var CountDown = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function () {
        return {
            time: this.props.time ? this.props.time : 60,
            disabled: false,
        };
    },
    componentDidMount(){

    },
    render(){
        var style = [styles.text];
        var component;
        if (this.state.disabled) {
            style.push({color: 'gray'});
            style.push(this.props.disabledTextStyle);
            component =
                <View
                    style={[styles.wrapper,this.props.buttonStyle]}
                >
                    <TouchableOpacity
                    >
                        <Text style={[style]}>{this.props.text}({this.state.time})</Text>
                    </TouchableOpacity>
                </View>
        } else {
            component =
                <TouchableOpacity
                    style={[styles.wrapper,this.props.buttonStyle]}
                    onPress={this._onPress}
                >
                    <Text style={[style,this.props.textStyle]}>{this.props.text}</Text>
                </TouchableOpacity>
        }
        return (
            component
        )
    },
    _onPress(){
        if (this.state.disabled) {
            //nothing
        } else {
            this.setState({disabled: true});
            this._countdown();
            if(this.props.onPress){
                this.props.onPress();
            }
        }
    },

    _countdown(){
        var timer = function () {
            var time = this.state.time - 1;
            this.setState({time: time});
            if (time > 0) {
                this.setTimeout(timer, 1000);
            } else {
                this.setState({disabled: false});
                this.setState({time: this.props.time ? this.props.time : 60});
            }
        };
        this.setTimeout(timer.bind(this), 1000);
    }
});

var styles = StyleSheet.create({
    text: {
        color: 'black'
    },
    wrapper: {
        flex:1,
        height:30,
        borderRadius:15,
        borderColor:'#15499A',
        borderWidth: 1,
        backgroundColor:'#ffffff',
        alignItems:'center',
        justifyContent:'center',
    }
});

module.exports = CountDown;

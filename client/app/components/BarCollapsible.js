/**
 * Created by kiefer on 2017/2/4.
 */
'use strict';

import React, { PropTypes, Component } from 'react';
import { Animated, View, Text, TouchableHighlight,StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


class BarCollapsible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            icon: 'angle-right',
            onPressed: null,
            title: '',
            children: null,
            show: false
        };
    }

    componentDidMount() {
        if (this.props.clickable) {
            this.setState({
                icon: this.props.icon,
                onPressed: this.props.onPressed,
                title: this.props.title
            });
        } else if (this.props.collapsible) {
            Animated.timing(
                this.state.fadeAnim,
                { toValue: 1 }
            ).start();

            this.setState({
                icon: this.props.iconActive || 'angle-right',
                iconCollapsed: this.props.iconCollapsed || 'angle-right',
                iconOpened: this.props.iconOpened || 'angle-down',
                title: this.props.title
            });
        } else {
            this.setState({
                title: this.props.title
            });
        }
        if(this.props.show){
            this.setState({
                show: true,
                icon: 'angle-down'
            });
        }

        this._tintColor = this.props.tintColor || '#2133A7';
        this._iconSize = this.props.iconSize || 30;
    }

    render() {

        if (this.props.clickable) {
            return this._renderClickable();
        } else if (this.props.collapsible) {
            return this._renderCollapsible();
        } else {
            return this._renderDefault();
        }
    }

    _renderDefault() {
        return (
            <View style={styles.bar}>
                <Text style={[styles.title, this.props.titleStyle]}>{this.state.title}</Text>
            </View>
        );
    }

    _renderClickable() {
        return (
            <TouchableHighlight style={styles.barWrapper} underlayColor='transparent' onPress={this.state.onPressed}>
                <View style={[styles.bar, this.props.style]}>
                    <Text style={[styles.title, this.props.titleStyle]}>{this.state.title}</Text>
                    <Icon name={this.state.icon} size={this._iconSize} color={this._tintColor} style={styles.icon}/>
                </View>
            </TouchableHighlight>
        );
    }

    _renderCollapsible() {
        return (
            <View>
                <TouchableHighlight style={styles.barWrapper} underlayColor='transparent' onPress={() => { this._toggleView()}}>
                    <View style={[styles.bar, this.props.style]}>
                        <Text style={[styles.title, this.props.titleStyle]}>{this.state.title}</Text>
                        <Icon name={this.state.icon} size={this._iconSize} color={this._tintColor} style={styles.icon}/>
                    </View>
                </TouchableHighlight>
                { this.state.show &&  <Animated.View
                    style={{opacity: this.state.fadeAnim}}>
                    {this.props.children}
                </Animated.View> }
            </View>
        );
    }

    _toggleView() {
        this.setState({
            show: !this.state.show,
            icon: this.state.show ? this.state.iconCollapsed : this.state.iconOpened
        });
    }
}

BarCollapsible.propTypes = {
    style: View.propTypes.style,
    titleStyle: Text.propTypes.style,
    tintColor: PropTypes.string,
};


var styles =  StyleSheet.create({
    bar: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 45,
    },

    barWrapper: {
        alignSelf: 'stretch',
    },

    icon: {
        padding: 5,
        width: 40
    },

    title: {
        color: '#FFF',
        flex: 1,
        fontSize: 15,
        paddingLeft: 15
    }
});

module.exports = BarCollapsible;
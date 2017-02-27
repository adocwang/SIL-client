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
    StatusBar,
    Platform
} from 'react-native';
import {NaviGoBack} from '../utils/CommonUtils';

const styles = StyleSheet.create({

    bgImage: {
        height: 60,
        flexDirection: 'row',
        backgroundColor:'#ffffff'
    },
    leftView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginLeft: 26,
    },
    rightView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 30
    },
    midView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: '#9a9a9a',
        backgroundColor: 'transparent'
    }

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
            <View
                    style={styles.bgImage}>
                <StatusBar
                    backgroundColor='#ffffff'
                    translucent={true}
                    hidden={false}
                    animated={true}
                />
                <View

                    style={styles.leftView}>
                    <TouchableOpacity style={{width:60,height:60,justifyContent:'flex-end'}}
                                      onPress={this.onIconClicked}>
                        <Image
                            style={{ width: 10, height: 17,marginBottom:10}}
                            source={{uri:"back_arrow"}}
                        /></TouchableOpacity>

                </View>
                <View
                    style={styles.midView}>
                    <TouchableOpacity style={{flex:1,justifyContent:'flex-end',marginBottom:10}} onPress={this.onOperateClicked}>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={styles.rightView}>
                    <TouchableOpacity onPress={this.onOperateClicked}>
                        <Text style={styles.text}>{this.props.operate}</Text>
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
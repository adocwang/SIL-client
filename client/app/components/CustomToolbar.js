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
    StatusBar
} from 'react-native';
import {NaviGoBack} from '../utils/CommonUtils';

const styles = StyleSheet.create({

    bgImage: {
        height: 100,
        width: null,
        flexDirection: 'row',
        resizeMode: Image.resizeMode.stretch
    },
    leftView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginLeft: 26
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
        color: '#ffffff',
        backgroundColor: 'transparent'
    }

});

const propTypes = {
    title: PropTypes.string,
    operate: PropTypes.string,
    actions: PropTypes.array,
    searchIcon:PropTypes.bool,
    navigator: PropTypes.object,
    onIconClicked: PropTypes.func,
    onOperateClicked: PropTypes.func,
    navIcon: PropTypes.number,
    customView: PropTypes.object
}

class CustomToolbar extends React.Component {


    constructor(props) {
        super(props);

        this.onOperateClicked = this.onOperateClicked.bind(this);
        this.onIconClicked = this.onIconClicked.bind(this);
    }

    componentDidMount () {
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
                <Image  source={{uri:"toolbar_bg"}}
                        style={styles.bgImage}>
                    <StatusBar
                        backgroundColor='#2133A7'
                        translucent={true}
                        hidden={false}
                        animated={true}
                        barStyle='light-content'
                    />
                    <View

                        style={styles.leftView}>
                        <TouchableOpacity style={{width:60,height:100,justifyContent:'center'}}
                                          onPress={this.onIconClicked}>
                            <Image
                                style={{ width: 10, height: 17}}
                                source={{uri:"back_arrow_white"}}
                            /></TouchableOpacity>

                    </View>
                    <View
                        style={styles.midView}>
                        <TouchableOpacity onPress={this.onOperateClicked}>
                            <Text style={styles.text}>{this.props.title}</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={styles.rightView}>
                        <TouchableOpacity onPress={this.onOperateClicked}>
                            {this.props.searchIcon?<Image source = {require('../img/toobar_search_icon.png')} />:
                                <Text style={styles.text}>{this.props.operate}</Text>
                            }

                        </TouchableOpacity>
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
    operate: '',
    actions: []
};


export default  CustomToolbar

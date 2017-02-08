/**
 * Created by kiefer on 2017/2/3.
 */
'use strict';
import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native';
import Spanner from 'react-native-spinkit'

class Loading extends React.Component {
    render () {
        return(

        <View style={[styles.overlay,{backgroundColor: this.props.backgroundColor, }]} >
            <Spanner size={50} type='ThreeBounce' color='#15499A'/>
        </View>

        )
    }
}

let styles = StyleSheet.create({
    overlay:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'

    }
});

export default Loading;
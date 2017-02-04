/**
 * Created by kiefer on 2017/2/4.
 */
'use strict';
import React from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

class RongZiZiXun extends React.Component {
    render () {
        return(
            <View style={styles.container}>
            <View style={styles.item}>
                <Image style={styles.item_img} source={require('../../img/rongzi_side.png')}/>
                <View style={styles.item_content}>
                    <Text style={styles.item_text}>2015-04</Text>
                    <View style={styles.item_container}>
                        <Text style={styles.item_content_text}>¥ 数千万</Text>
                        <Text style={styles.item_content_red_text}>B轮</Text>
                    </View>
                    <Text style={styles.item_text}>投资方：德迅投资,架桥投资</Text>
                </View>
            </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Image style={styles.item_img} source={require('../../img/rongzi_side.png')}/>
                    <View style={styles.item_content}>
                        <Text style={styles.item_text}>2015-04</Text>
                        <View style={styles.item_container}>
                            <Text style={styles.item_content_text}>¥ 数千万</Text>
                            <Text style={styles.item_content_red_text}>B轮</Text>
                        </View>
                        <Text style={styles.item_text}>投资方：德迅投资,架桥投资</Text>
                    </View>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Image style={styles.item_img} source={require('../../img/rongzi_side.png')}/>
                    <View style={styles.item_content}>
                        <Text style={styles.item_text}>2015-04</Text>
                        <View style={styles.item_container}>
                            <Text style={styles.item_content_text}>¥ 数千万</Text>
                            <Text style={styles.item_content_red_text}>B轮</Text>
                        </View>
                        <Text style={styles.item_text}>投资方：德迅投资,架桥投资</Text>
                    </View>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        padding:10
    },
    item:{
        flex:1,
        height:70,
        flexDirection:'row',
        padding:5
    },
    item_img:{
        flex:1,
    },
    item_container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    item_content:{
        flex:7,
    },
    item_content_text:{
        fontSize:14,
        color:'#4A4A4A',
    },
    item_content_red_text:{
        fontSize:14,
        color:'#D0021B',
    },
    item_text:{
        flex:1,
        fontSize:14,
        color:'#9B9B9B'
    },
    divider:{
        height:1,
        backgroundColor:'#9a9a9a',
        opacity:0.2,
        marginLeft:50
    }

});

export default RongZiZiXun;
/**
 * Created by kiefer on 2017/2/5.
 */
'use strict';
import React from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

class QiQuanYaoSu extends React.Component {
    render () {
        return(
            <View style={styles.container}>
                <View style={styles.item}>
                            <Text style={styles.item_content_text}>编号</Text>
                            <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>取得日期</Text>
                    <Text style={styles.item_content_blue_text}>2016/12/127</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>股本比例</Text>
                    <Text style={styles.item_content_blue_text}>200%</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>期权数量</Text>
                    <Text style={styles.item_content_blue_text}>98633</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>获得价格</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>起算日期</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>等待期</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                <Text style={styles.item_content_text}>行权条件</Text>
                <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>行权价格</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>行权期限</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>已成熟</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>已行权</Text>
                    <Text style={styles.item_content_blue_text}>AZ.94877</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                    <Text style={styles.item_content_text}>编号</Text>
                    <Text style={styles.item_content_red_text}>待审核</Text>
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
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        paddingRight:10
    },

    item_content_text:{
        fontSize:16,
        color:'#9b9b9b',
    },
    item_content_blue_text:{
        fontSize:16,
        color:'#6E7CDD',
    },
    item_content_red_text:{
        fontSize:16,
        color:'#F21B35',
    },
    divider:{
        height:1,
        backgroundColor:'#9a9a9a',
        opacity:0.2,
    }

});

export default QiQuanYaoSu;
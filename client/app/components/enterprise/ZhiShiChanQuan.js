/**
 * Created by kiefer on 2017/2/4.
 */
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
import { Col, Row, Grid } from "react-native-easy-grid";

class ZhiShiChanQuan extends React.Component {
    render () {
        return(

            <Grid style={styles.container}>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/shangbiaoxinxi.png')}/>
                            <Text style={styles.common_item_text}>商标信息</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/zhuanlixinxi.png')}/>
                            <Text style={styles.common_item_text}>专利信息</Text>
                        </View>
                    </Row>

                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/zhuzuoquan.png')}/>
                            <Text style={styles.common_item_text}>著作权</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/zizhirenzheng.png')}/>
                            <Text style={styles.common_item_text}>资质认证</Text>
                        </View>
                    </Row>
                </Col>
            </Grid>

        )
    }
}

let styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff'
    },
    common_item:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        height:80
    },
    common_item_text:{
        fontSize:14,
        color:'#9B9B9B',
        marginTop:10
    },
    col_divider:{
        backgroundColor:'#979797',
        width:1,
        opacity:0.2
    },
    row_divider:{
        backgroundColor:'#979797',
        height:1,
        opacity:0.2
    }
});

export default ZhiShiChanQuan;
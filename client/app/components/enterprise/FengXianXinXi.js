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

class FengXianXinXi extends React.Component {
    render () {
        return(

            <Grid style={styles.container}>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/fayuanpanjue.png')} style={styles.common_img} />
                                <Text style={styles.count_text}>3</Text>
                            </View>
                            <Text style={styles.common_item_text}>法院判决</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/shixinxinxi.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>

                            <Text style={styles.common_item_text}>失信信息</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/guquanchuzhi.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>
                            <Text style={styles.common_item_text}>股权出质</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/guquanchuzhi.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>

                            <Text style={styles.common_item_text}>被执行人</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/dongchandiya.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>

                            <Text style={styles.common_item_text}>动产抵押</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/jingyingyichang.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>

                            <Text style={styles.common_item_text}>经营异常</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/kaitinggonggao.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>
                            <Text style={styles.common_item_text}>开庭公告</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/qiansuixinxi.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>
                            <Text style={styles.common_item_text}>欠税信息</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/fumianyuqing.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>

                            <Text style={styles.common_item_text}>负面舆情</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/fayuangonggao.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>
                            <Text style={styles.common_item_text}>法院公告</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <View style ={styles.common_container}>
                                <Image source = {require('../../img/sifapaimai.png')}  style={styles.common_img}/>
                                <Text style={styles.count_text}>3</Text>
                            </View>
                            <Text style={styles.common_item_text}>司法拍卖</Text>
                        </View>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row><View style={styles.common_item}>

                    </View></Row>
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
        height:80,
    },
    common_container:{
        flex:1,
        flexDirection:'row',
        paddingLeft:15,
        justifyContent:'center',
        alignItems:'center'
    },
    common_img:{
        marginRight:10,
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
    },
    count_text:{
        color:'#9B9B9B',
        fontSize:12,
        position:'relative',
        paddingBottom:10
    }
});

export default FengXianXinXi;
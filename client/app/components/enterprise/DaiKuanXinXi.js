/**
 * Created by kiefer on 2017/2/5.
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

class DaiKuanXinXi extends React.Component {
    render () {
        return(

            <Grid style={styles.container}>
                <Row>
                    <Col>
                        <View style={styles.common_item}>
                            <Text style={styles.item_orange_text}>抵押贷款</Text>
                            <Text style={styles.common_item_text}>贷款方式</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                        <View style={styles.common_item}>
                            <Text style={styles.item_orange_text}>¥6890000</Text>
                            <Text style={styles.common_item_text}>贷款资金</Text>
                        </View>
                    </Col>
                </Row>
                <View style={styles.row_divider}/>
                <Row>
                    <Col>
                        <View style={styles.common_item}>
                            <Text style={styles.item_orange_text}>0.1%</Text>
                            <Text style={styles.common_item_text}>利率</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                        <View style={styles.common_item}>
                            <Text style={styles.item_orange_text}>36</Text>
                            <Text style={styles.common_item_text}>贷款期限(个)月</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                        <View style={styles.common_item}>
                            <Text style={styles.item_orange_text}>无</Text>
                            <Text style={styles.common_item_text}>优惠／补贴利率</Text>
                        </View>
                    </Col>
                </Row>
                <View style={styles.row_divider}/>
                <Row>
                    <Col style={{flex:2}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={styles.common_item}>
                                <Text style={[styles.item_orange_text,{fontSize:14}]}>2016</Text>
                                <Text style={styles.item_black_text}>09/24</Text>
                                <Text style={styles.common_item_text}>起始日期</Text>
                            </View>
                            <View style={styles.common_item}>
                                <Image source={require('../../img/orange_line.png')}/>
                            </View>
                            <View style={styles.common_item}>
                                <Text style={[styles.item_orange_text,{fontSize:14}]}>2019</Text>
                                <Text style={styles.item_black_text}>09/22</Text>
                                <Text style={styles.common_item_text}>截止日期</Text>
                            </View>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col style={{flex:1}}>
                        <View style={styles.common_item}>
                            <Text style={styles.item_blue_text}>¥874.5万</Text>
                            <Text style={styles.common_item_text}>利息</Text>
                        </View>
                    </Col>
                </Row>
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
        height:113
    },
    item_black_text:{
        color:'#A4A4A4',
        fontSize:20,
    },
    item_orange_text:{
      color:'#F5A623',
      fontSize:20,
    },
    item_blue_text:{
        color:'#4A90E2',
        fontSize:20,
    },
    common_item_text:{
        fontSize:14,
        color:'#9B9B9B',
        marginTop:10
    },
    col_divider:{
        backgroundColor:'#979797',
        width:1,
        opacity:0.2,
        marginTop:10,
        marginBottom:10
    },
    row_divider:{
        backgroundColor:'#979797',
        height:1,
        opacity:0.2,
    }
});

export default DaiKuanXinXi;
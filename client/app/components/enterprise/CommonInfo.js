/**
 * Created by kiefer on 2017/2/4.
 */
'use strict';
import React from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import GongShangXinXi from '../../pages/enterprise/GongShangXinXi'
import TouZiGuanXi from '../../pages/enterprise/TouZiGuanXi'
import GuQuanJieGou from '../../pages/enterprise/GuQuanJieGou'
import ChangeRecord from '../../pages/enterprise/ChangeRecord'

class CommonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onGSClicked = this.onGSClicked.bind(this);
        this.onTZClicked = this.onTZClicked.bind(this);
        this.onGQClicked = this.onGQClicked.bind(this);
        this.onBGClicked = this.onBGClicked.bind(this);
    }

    onGSClicked() {
        const  {navigator} = this.props;
        navigator.push({
            component: GongShangXinXi,
            name: 'GongShangXinXi',
            params: {
                info: this.props,
            },
        });
    }

    onTZClicked() {
        const  {navigator} = this.props;
        navigator.push({
            component: TouZiGuanXi,
            name: 'TouZiGuanXi',
            params: {
                info: this.props,
            },
        });
    }

    onGQClicked() {
        const  {navigator} = this.props;
        navigator.push({
            component: GuQuanJieGou,
            name: 'GuQuanJieGou',
            params: {
                info: this.props,
            },
        });
    }

    onBGClicked() {
        const  {navigator} = this.props;
        navigator.push({
            component: ChangeRecord,
            name: 'ChangeRecord',
            params: {
                info: this.props,
            },
        });
    }

    render () {
        return(

            <Grid style={styles.container}>
                <Col>
                    <Row>
                        <TouchableOpacity style={styles.common_item} onPress={this.onGSClicked}>
                            <Image source = {require('../../img/gongshangxinxi.png')}/>
                            <Text style={styles.common_item_text}>工商信息</Text>
                            </TouchableOpacity>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                        <Image source = {require('../../img/qiyeliantu.png')}/>
                        <Text style={styles.common_item_text}>企业链图</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <TouchableOpacity style={styles.common_item} onPress={this.onBGClicked}>
                            <Image source = {require('../../img/biangengjilu.png')}/>
                            <Text style={styles.common_item_text}>变更记录</Text>
                        </TouchableOpacity>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/guanxigupu.png')}/>
                            <Text style={styles.common_item_text}>关系股谱</Text>
                        </View>
                    </Row>
                </Col>
                <View style={styles.col_divider}/>
                <Col>
                    <Row>
                        <TouchableOpacity style={styles.common_item} onPress={this.onTZClicked}>
                            <Image source = {require('../../img/touziguanxi.png')}/>
                            <Text style={styles.common_item_text}>投资关系</Text>
                        </TouchableOpacity>
                    </Row>
                    <View style={styles.row_divider}/>
                    <Row>
                        <TouchableOpacity style={styles.common_item} onPress={this.onGQClicked}>
                            <Image source = {require('../../img/guquanjiegou.png')}/>
                            <Text style={styles.common_item_text}>股权结构</Text>
                        </TouchableOpacity>
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

export default CommonInfo;
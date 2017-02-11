/**
 * Created by kiefer on 2017/2/4.
 */
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
    View,
    TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Domain from '../../pages/enterprise/Domain'

class JingYingXinXi extends React.Component {
    constructor(props) {
        super(props);
        this.onYMClicked = this.onYMClicked.bind(this);
    }

    onYMClicked() {
        const  {navigator} = this.props;
        navigator.push({
            component: Domain,
            name: 'Domain',
            params: {
                info: this.props,
            },
        });
    }

    render () {
        return(

            <Grid style={styles.container}>
                <Row>
                    <Col>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/rongzixinxi.png')}/>
                            <Text style={styles.common_item_text}>融资信息</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/xinwen.png')}/>
                            <Text style={styles.common_item_text}>新闻</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                        <View style={styles.common_item}>
                            <Image source = {require('../../img/zhaotoubiao.png')}/>
                            <Text style={styles.common_item_text}>招投标</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                            <TouchableOpacity style={styles.common_item} onPress={this.onYMClicked}>
                            <Image source = {require('../../img/yuming.png')}/>
                            <Text style={styles.common_item_text}>域名</Text>
                                </TouchableOpacity>
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

export default JingYingXinXi;
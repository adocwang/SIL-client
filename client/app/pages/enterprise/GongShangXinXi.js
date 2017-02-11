/**
 * Created by kiefer on 2017/2/11.
 */
import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    Button,
    ScrollView,
    View
} from 'react-native';
import CustomToolbar from '../../components/CustomToolbar'
import Bar from '../../components/BarCollapsible'
import DaiKuanJinDu from '../../components/enterprise/DaiKuanJinDu'
import CommonInfo from '../../components/enterprise/CommonInfo'
import Loading from '../../components/Loading'
import {GapYear} from '../../utils/CommonUtils'

import { Col, Row, Grid } from "react-native-easy-grid";
import BasePage from  '../BasePage'

class GongShangXinXi extends BasePage {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
    }

    componentDidMount() {
    }


    render() {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
               <CustomToolbar title="工商信息"
                              navigator={navigator} />
                    <ScrollView style={{marginBottom:20}}>
                        <View style={styles.line} >
                            <Text style={styles.line_text_black}>法定代表人：</Text><Text style={styles.line_text_black}>{this.state.info.oper_name}</Text>
                        </View>
                        <View style={styles.divider}/>
                        <View style={styles.line} >
                            <Text style={styles.line_text_black}>注册资本：</Text><Text style={styles.line_text_gray}>{this.state.info.regist_capi}</Text>
                        </View>
                        <View style={styles.divider}/>
                        <View style={styles.line} >
                            <Text style={styles.line_text_black}>成立日期：</Text><Text style={styles.line_text_gray}>{this.state.info.start_date}</Text>
                        </View>
                        <View style={styles.divider}/>
                        <Bar
                            title='登记信息'
                            collapsible={true}
                            show={true}
                            iconCollapsed='angle-right'
                            iconOpened='angle-down'
                            style={styles.bar}
                            titleStyle={styles.bar_title}
                        >
                            <Grid style={styles.gridContainer}>
                                <Col>
                                    <View>
                                        <Text style={styles.grid_text_black}>注册号</Text>
                                        <Text style={styles.grid_text_gray}>{this.state.info.reg_no}</Text>
                                     </View>
                                    <View style={{paddingTop:20}}>
                                        <Text style={styles.grid_text_black}>社会信用代码</Text>
                                        <Text style={styles.grid_text_gray}>{this.state.info.credit_no}</Text>
                                    </View>
                                    <View style={{paddingTop:20}}>
                                        <Text style={styles.grid_text_black}>企业类型</Text>
                                        <Text style={styles.grid_text_gray}>{this.state.info.econ_kind}</Text>
                                    </View>
                                </Col>
                                <View style={styles.col_divider}/>
                                <Col>
                                    <View>
                                        <Text style={styles.grid_text_black}>组织机构代码号</Text>
                                        <Text style={styles.grid_text_gray}>{this.state.info.org_no}</Text>
                                    </View>
                                    <View style={{paddingTop:20}}>
                                        <Text style={styles.grid_text_black}>经营状态</Text>
                                        <Text style={styles.grid_text_gray}>{this.state.info.status}</Text>
                                    </View>
                                </Col>
                             </Grid>
                        </Bar>

                        <View style={styles.blockContainer}>
                            <Text style={styles.line_text_black}>经营信息</Text>
                            <Text style={styles.line_text_gray}>{this.state.info.scope}</Text>
                        </View>
                        <View style={styles.blockContainer}>
                            <View style={styles.block_line} >
                                <Text style={styles.line_text_black}>经营地址：</Text><Text style={styles.line_text_gray}>{this.state.info.address}</Text>
                            </View>
                            <View style={styles.block_line} >
                                <Text style={styles.line_text_black}>发照日期：</Text><Text style={styles.line_text_gray}>{this.state.info.check_date}</Text>
                            </View>
                            <View style={styles.block_line} >
                                <Text style={styles.line_text_black}>营业期限：</Text><Text style={styles.line_text_gray}>{this.state.info.term_start}-{this.state.info.term_end}</Text>
                            </View>
                            <View style={styles.block_line} >
                                <Text style={styles.line_text_black}>登记机关：</Text><Text style={styles.line_text_gray}>{this.state.info.belong_org}</Text>
                            </View>
                        </View>
                    </ScrollView>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#EBEAEA',
    },

    bar: {
        height: 38,
        backgroundColor: '#ffffff',
        marginTop: 7,
        marginBottom: 3
    },
    bar_title: {
        fontSize: 14,
        color: '#4a4a4a'
    },
    line:{
        height:40,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    },
    line_text_black:{
        fontSize:14,
        color:'#4a4a4a'
    },
    line_text_gray:{
        fontSize:14,
        color:'#9b9b9b'
    },
    grid_text_black:{
        fontSize:14,
        color:'#4a4a4a'
    },
    grid_text_gray:{
        fontSize:12,
        color:'#9b9b9b',
        paddingTop:6
    },
    divider:{
        backgroundColor:'#DFDFDF',
        height:1
    },
    col_divider:{
        backgroundColor:'#DFDFDF',
        width:1,
        marginLeft:5,
        marginRight:20
    },
    gridContainer:{
        backgroundColor:'#ffffff',
        justifyContent:'center',
        paddingRight:20,
        paddingLeft:20,
        paddingTop:15,
        paddingBottom:15
    },
    blockContainer:{
        backgroundColor:'#ffffff',
        paddingRight:20,
        paddingLeft:20,
        paddingTop:15,
        paddingBottom:15,
        marginTop:7
    },
    block_line:{
        height:40,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        alignItems:'center',
    },
});

export default GongShangXinXi;
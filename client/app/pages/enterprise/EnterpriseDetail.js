/**
 * Created by kiefer on 2017/2/4.
 */
/**
 * Created by kiefer on 2017/1/25.
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
import ZhiShiChanQuan from '../../components/enterprise/ZhiShiChanQuan'
import JingYingXinXi from '../../components/enterprise/JingYingXinXi'
import FengXianXinXi from '../../components/enterprise/FengXianXinXi'
import RongZiZiXun from '../../components/enterprise/RongZiZiXun'
import { Col, Row, Grid } from "react-native-easy-grid";

class Claim extends React.Component {
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
                <View style={styles.header}>
                <View style={{alignItems:'center',height:160}}>
                <CustomToolbar
                    title="公司信息"
                    navigator={navigator}/>
                <Image
                    style={styles.logo}
                    source={{uri: 'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg'}}
                />
                </View>
                <Text style={styles.name}>深圳市英威诺科技有限公司</Text>
                <Text style={styles.desc}>唐欣 | ¥2000.00万 | 成立5-10年</Text>
                <Text style={styles.cat}>互联网   信息技术  >></Text>
                </View>
                <ScrollView style={{marginBottom:20}}>
                <Bar
                    title='贷款受理进度'
                    collapsible={true}
                    show={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                  <DaiKuanJinDu activeTab={1} backgroundColor='#ffffff'/>
                </Bar>

                <Bar
                    title='常用信息'
                    collapsible={true}
                    show={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <CommonInfo/>
                </Bar>
                <Bar
                    title='融资资讯'
                    collapsible={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <RongZiZiXun />
                </Bar>
                 <Bar
                        title='知识产权'
                        collapsible={true}
                        show={true}
                        iconCollapsed='angle-right'
                        iconOpened='angle-down'
                        style={styles.bar}
                        titleStyle={styles.bar_title}
                    >
                        <ZhiShiChanQuan/>
                  </Bar>

                <Bar
                    title='风险信息'
                    collapsible={true}
                    show={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <FengXianXinXi />
                </Bar>
                <Bar
                    title='贷款信息'
                    collapsible={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <Text>贷款信息</Text>
                </Bar>
                <Bar
                    title='还款方式'
                    collapsible={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <Text>还款方式</Text>
                </Bar>
                <Bar
                    title='抵押物资'
                    collapsible={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <Text>抵押物资</Text>
                </Bar>
                <Bar
                    title='期权要素'
                    collapsible={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <Text>期权要素</Text>
                </Bar>
                <Bar
                    title='经营信息'
                    collapsible={true}
                    show={true}
                    iconCollapsed='angle-right'
                    iconOpened='angle-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                    <JingYingXinXi />
                </Bar>
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
    header: {
        backgroundColor: '#ffffff',
        paddingBottom:10
    },
    logo:{
        width: 80,
        height: 80,
        bottom: 40,
        borderRadius:44,
        position:'relative'
    },
    name:{
        fontSize:16,
        color:'#4A4A4A',
        alignSelf:'center',
    },
    desc:{
        fontSize:14,
        color:'#9B9B9B',
        alignSelf:'center',
        marginTop:5
    },
    cat:{
        fontSize:12,
        color:'#4a4a4a',
        alignSelf:'center',
        marginTop:5
    },
    bar:{
        height:38,
        backgroundColor:'#ffffff',
        marginTop:7,
        marginBottom:3
    },
    bar_title:{
        fontSize:14,
        color:'#4a4a4a'
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#ccc',
    },

});

export default Claim;
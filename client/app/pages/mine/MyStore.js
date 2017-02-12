/**
 * Created by kiefer on 2017/2/1.
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
    View,
    ListView
} from 'react-native';
import * as Color from '../../utils/CommonColor';
import CustomToolbar from '../../components/CustomToolbar';

const testIcon = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=819690180,1460672394&fm=170&s=6B61736EC7242D1513FD811B0000E091&w=218&h=146&img.JPEG"

export default class MyStore extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {dataSource: ds.cloneWithRows(this.props.companys)}
        this.renderRow =  this.renderRow.bind(this)
    }

    static defaultProps = {
        companys:[
            {icon:testIcon,name:"深圳能源集团股份有限公司",time:"2016-12",money:"2亿",Investors:"光线传媒,华兴资本",process:"B轮"},
            {icon:testIcon,name:"深圳能源集团股份有限公司",time:"2016-12",money:"3亿",Investors:"光线传媒,华兴资本",process:"C轮"},
        ]
    }

    renderRow(rowData,sectionID,rowID) {
        console.log(rowData)
        return (
        <CompanyCell data={rowData} clickClosure={this.clickedCell} rowID={rowID}/>
        )
    }

    render(){

        return (
        <View style={styles.container}>
            <CustomToolbar title="我的收藏" navigator={this.props.navigator}/>

            <ListView dataSource={this.state.dataSource} style={styles.listView}
                          renderRow={this.renderRow}
                />
            </View>
        );
    }
}

class CompanyCell extends React.Component {
render() {
    const {data,rowID} = this.props
    var topLineHide
    if(rowID == 0) {
       topLineHide = {borderTopWidth:0}
    }
    const imgIcon = {uri:data.icon}
    const companyName = data.name
    const time = data.time
    const money = "￥ " + data.money
    const Investors = data.Investors
    const process = data.process
     return(
        <View style={[styles.companyCell,topLineHide]}>
           <Image source = {imgIcon} style={styles.cellImg}/>
            <View style={styles.rightView}>
                <Text style={{fontSize:16,color:Color.defaultBlackColor,marginTop:0}}>{companyName}</Text>
                <Image source = {require("../../img/imaginaryLine.png")} style={{marginTop:5,alignSelf:"stretch",height:1}}/>
                <Text style={{fontSize:13,color:Color.defaultLightGray,marginTop:5}}>{time}</Text>
                <Text style={{fontSize:13,color:Color.defaultBlackColor,marginTop:5}}>{money}</Text>
                <View style={styles.cellBottomBg}>
                    <Text style={{fontSize:13,color:Color.defaultLightGray}}>投资方:</Text>
                    <Text style={{fontSize:13,color:Color.defaultShallowBlueColor}}>{Investors}</Text>
                    <Text style={{fontSize:13,color:Color.defaultLightRedColor,marginLeft:40}}>{process}</Text>
                </View>
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"

    },
    listView: {
        flex: 1,
    },
    companyCell: {
        alignSelf:"stretch",
        height: 130,
        borderTopColor: Color.defaultDarkLineColor,
        borderTopWidth:1,
        flexDirection: "row",
    },
    cellImg: {
        marginTop: 20,
        marginLeft:20,
        width:32,
        height:32,
        borderRadius: 5,
    },
    rightView: {
        marginTop: 20,
        marginLeft: 15,
        justifyContent:"space-around",
        height: 100,
        flex:1,
    },
    cellBottomBg: {
        height:20,
        flexDirection:"row",
        marginTop: 5,
    }


})



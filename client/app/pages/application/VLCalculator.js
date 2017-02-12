import React, {Component} from 'react';
import {
    TextInput,
    ScrollView,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableWithoutFeedback,
    Navigator,
    ListView
} from 'react-native'
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import Button from '../../components/Button.ios.js'
import AcountCertifice from './AcountCertifice.js'
import dismissKeyboard from 'dismissKeyboard'

export default class VLCalculator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listData: [{multiple: 2}, {multiple: 3}, {multiple: 4}, {multiple: 5},
                {multiple: 6}, {multiple: 7}, {multiple: 8}, {multiple: 9}, {multiple: 10}]
        }
        this.rate = 0.04
        this.rateValue = 0.1
        this.shareOption = 100
        this.money = 1000
        this.calculator = this.calculator.bind(this)
        this.didClickedContainerView = this.didClickedContainerView.bind(this)

    }

    didClickedContainerView() {
        dismissKeyboard();
    }

    componentDidMount() {
        this.calculator()
    }

    calculator() {
        dismissKeyboard();
        const data = this.state.listData.map((data) => {
            const vcValue = this.money * data.multiple - this.money
            const vlValue = this.money * this.rate + this.shareOption * data.multiple
            return {multiple: data.multiple, vc: vcValue, vl: vlValue}
        })
        this.setState({listData: data})
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.didClickedContainerView}>
                <View style={styles.container}>
                    <CustomToolbar title="现场采集" navigator={this.props.navigator}/>
                    <View style={styles.topView}>
                        <Text style={{color: CommonColor.defaultBlackColor}}>融资金额:</Text>
                        <View style={styles.textView}>
                            <TextInput onChangeText={(text) => this.money = text} style={styles.textInput}
                                       defaultValue="1000" keyboardType="decimal-pad"  underlineColorAndroid="transparent"/>
                        </View>
                        <Text style={styles.wanyuan}>万元</Text>
                        <Button style={styles.saveButton} titleStyle={styles.saveTitle} title="确定"
                                onPress={this.calculator}/>
                    </View>
                    <VLResultTableView listData={this.state.listData}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class VLResultTableView extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
        };
        this.renderRow = this.renderRow.bind(this)
    }

    componentDidMount() {
        this.state.dataSource.cloneWithRows(this.props.listData)
    }


    renderHeader() {
        return (
            <View>
                <View style={styles.rateBgView}>
                    <Text style={styles.rateTip}>VL年化贷款利率</Text>
                    <Text style={styles.rateValue}>4%</Text>
                    <Text style={styles.rateTip}>VL获得期权比率</Text>
                    <Text style={styles.rateValue}>10%</Text>
                </View>
                <View style={styles.shareOptaionBg}>
                    <Text style={styles.shareOptaionTip}>VL所获期权</Text>
                    <Text style={styles.shareOptaionValue}>10000</Text>
                </View>
                <View style={styles.resultHeader}>
                    <Text style={styles.nextYear}>若一年后开始下一轮融资</Text>
                    <View style={styles.resultHeaderContent}>
                        <View style={styles.headerBox0}>
                            <Text style={[styles.headerBox0Text, {marginRight: 12}]}>下一轮</Text>
                            <Text style={[styles.headerBox0Text, {marginTop: 5}]}>估值倍数</Text>
                        </View>
                        <View style={styles.headerBox1}>
                            <View style={styles.headerBox0Child}>
                                <Text style={styles.shareOptaionTip}>VC成本</Text>
                            </View>
                        </View>
                        <View style={styles.headerBox2}>
                            <View style={[styles.headerBox0Child, {borderRightWidth: 0}]}>
                                <Text style={styles.shareOptaionTip}>VL成本</Text>
                            </View>
                        </View>
                        <View style={styles.headerBox3}>
                            <Text style={[styles.headerBox0Text]}>成本差异</Text>
                            <Text style={[styles.headerBox0Text, {marginTop: 5}]}>(VC-VL)</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <ResultCell rowId={rowId} data={rowData}/>
        )
    }

    render() {
        const dataSource = this.state.dataSource.cloneWithRows(this.props.listData)

        return (
            <ListView
                dataSource={dataSource}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        )
    }
}


class ResultCell extends Component {
    constructor(props) {
        super(props)
        this.commafy = this.commafy.bind(this)

    }


    commafy(num) {
        num = parseInt(num)
        var result = [],
            counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) {
                result.unshift(',');
            }
        }
        return result.join('');
    }

    render() {
        const {rowId} = this.props
        const {data} = this.props
        const multiple = data.multiple
        const vcValue = this.commafy(data.vc)
        const vlValue = this.commafy(data.vl)
        const differenceValue = this.commafy(data.vc - data.vl)
        var bgStyle = {backgroundColor: "white"}
        if (rowId % 2 == 0) {
            bgStyle = {backgroundColor: "rgba(230,232,241,1)"}
        }
        return (
            <View style={[styles.yresultCell]}>
                <View style={[styles.resultCellContent, bgStyle]}>
                    <View style={[styles.resultTextBg, {flex: 0.6}]}>
                        <Text style={styles.resultText}>{multiple}</Text>
                    </View>
                    <View style={[styles.resultTextBg, {flex: 1}]}>
                        <Text style={styles.resultText}>{vcValue}</Text>
                    </View>
                    <View style={[styles.resultTextBg, {flex: 1}]}>
                        <Text style={styles.resultText}>{vlValue}</Text>
                    </View>
                    <View style={[styles.resultTextBg, {flex: 1, borderRightWidth: 0}]}>
                        <Text style={styles.resultText}>{differenceValue}</Text>
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
    topView: {
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 10,
        borderBottomColor: CommonColor.defaultBgColor,
    },
    textView: {
        width: 100,
        height: 40,
        marginLeft: 3,
        borderBottomColor: CommonColor.defaultDarkLineColor,
        borderBottomWidth: 1,
        paddingLeft: 5,
        justifyContent: "center",
    },
    textInput: {
        color: CommonColor.defaultOrangeColor,
        alignSelf: "stretch",
    },

    wanyuan: {
        marginLeft: 5,
        color: CommonColor.defaultBlackColor
    },

    saveButton: {
        width: 60,
        height: 20,
        borderWidth: 1,
        borderColor: CommonColor.defaultBlueColor,
        borderRadius: 10,
        marginLeft: 20
    },
    saveTitle: {
        color: CommonColor.defaultBlueColor
    },
    rateBgView: {
        flexDirection: "row",
        alignSelf: "stretch",
        marginLeft: 15,
        marginRight: 15,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: CommonColor.defaultDarkLineColor,
    },
    rateTip: {
        fontSize: 12,
        marginLeft: 10,
    },
    rateValue: {
        color: CommonColor.defaultOrangeColor,
        marginLeft: 5,
        width: 50,
        fontSize: 18
    },
    shareOptaionBg: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 44,
    },
    shareOptaionTip: {
        color: CommonColor.defaultBlackColor,
    },
    shareOptaionValue: {
        marginLeft: 10,
        color: CommonColor.defaultOrangeColor,
        fontSize: 18,
    },
    resultHeader: {
        alignSelf: "stretch",
        marginLeft: 15,
        marginRight: 15,
        height: 105,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderColor: "rgba(203,206,219,1)",
        borderBottomWidth: 1,
    },
    nextYear: {
        color: CommonColor.defaultBlackColor,
        textAlign: "center",
        alignSelf: "stretch",
        height: 24,
        fontWeight: "500",
        marginTop: 12,
    },
    resultHeaderContent: {
        borderTopWidth: 3,
        borderColor: "rgba(142,155,230,1)",
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "row",
        marginTop: 7,
    },
    headerBox0: {
        flex: 0.6,
        alignSelf: "stretch",
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: CommonColor.defaultDarkLineColor
    },
    headerBox1: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end"
    },
    headerBox2: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",

    },
    headerBox3: {
        flex: 1,
        alignSelf: "stretch",
        borderLeftWidth: 1,
        borderColor: CommonColor.defaultDarkLineColor,
        justifyContent: "center",

    },
    headerBox0Text: {
        color: CommonColor.defaultBlackColor,
        fontSize: 12,
        alignSelf: "center",
        fontWeight: "400",
    },
    headerBox0Child: {
        height: 38,
        alignSelf: "stretch",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: CommonColor.defaultDarkLineColor,
        alignItems: "center",
        justifyContent: "center",
    },
    resultCell: {
        height: 30,
        alignSelf: "stretch",
    },
    resultCellContent: {
        flexDirection: "row",
        height: 30,
        alignSelf: "stretch",
        marginLeft: 15,
        marginRight: 15,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "rgba(203,206,219,1)",
    },
    resultTextBg: {
        borderRightWidth: 1,
        borderColor: "rgba(203,206,219,1)",
        justifyContent: "center",
    },
    resultText: {
        alignSelf: "stretch",
        textAlign: "center",
        color: CommonColor.defaultSecondBlackColor,
        fontSize: 12,
    }
})

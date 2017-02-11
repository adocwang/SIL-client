import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableWithoutFeedback, Navigator, ListView} from 'react-native'
import LoanCalculatorContainer from '../../containers/LoanCalculatorContainer'
import CollectionContainer from '../../containers/CollectionContainer'
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import CollectionTakephoto from "./CollectionTakePhoto.js"
import {fetchCollectionConfig,submitCollectionConfig} from '../../actions/application'
import CollectionContentContainer from "../../containers/CollectionContentContainer"
import {ToastShort} from '../../utils/ToastUtils';

class CollectionCertificate extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.datas = [];
        this.state = {dataSource: ds}
        this.selecteds = []
        this.clickedCell = this.clickedCell.bind(this)
        this.chargeExit = this.chargeExit.bind(this)
        this.fetchConfig = this.fetchConfig.bind(this)
        this.saveCell = this.saveCell.bind(this)
        this.getChildData = this.getChildData.bind(this)
        this.rightTitleClicked = this.rightTitleClicked.bind(this)
        this.submitData = null
    }

    componentDidMount() {
        this.fetchConfig()
    }

    fetchConfig() {
      const {dispatch,auth} = this.props
        dispatch(fetchCollectionConfig(auth.token))
    }


    componentWillReceiveProps(nextProps) {
        const {collection} = nextProps
        this.datas=collection
        this.submitData = JSON.parse(JSON.stringify(this.datas));
        this.setState({dataSource:this.state.dataSource.cloneWithRows(this.datas)})
    }


    saveCell(index) {
        const result = this.chargeExit(index)
        if (result == -1) {
            this.selecteds.push(index)
        } else {
            this.selecteds.splice(result, 1)

        }
        let newData = JSON.parse(JSON.stringify(this.datas));
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData)
        })
    }

    clickedCell(index) {
        const {navigator} = this.props
        navigator.push({
            name: "CollectionContentContainer",
            component: CollectionContentContainer,
            params: {
                content: this.datas[index],
                backClosure: this.getChildData,
                index: index
            }
        })
    }

    rightTitleClicked() {
        this.submitData.map((data,index)=>{
            const selected = (this.chargeExit(index) != -1)
            if(data.isRequired && !selected) {
                ToastShort("*号必须填写")
                return false
            }
        })
        const {dispatch,auth} = this.props
        const companyId = this.props.route.params.company.id
        const params = {companyId: companyId,data: this.submitData}
        const jsonData = JSON.stringify(params)
        dispatch(submitCollectionConfig(jsonData,auth.token))

    }

    getChildData(index,data) {
        const childData = JSON.parse(JSON.stringify(this.datas[index]));
        childData.content = data
        this.submitData[index] = childData
        this.selecteds.push(index)
        this.datas = JSON.parse(JSON.stringify(this.datas));
        this.setState({dataSource:this.state.dataSource.cloneWithRows(this.datas)})
    }

    chargeExit(index) {
        for (var i = 0; i < this.selecteds.length; i++) {
            if (this.selecteds[i] == index) {
                return i
            }
        }
        return -1
    }

    render() {
        const companyName = this.props.route.params.company.name
        return (
            <View style={styles.container}>
                <CustomToolbar title="现场采集" navigator={this.props.navigator} operate="提交"
                               onOperateClicked={this.rightTitleClicked}/>
                <View style={styles.topView}>
                    <Text style={styles.topTitle}>{companyName}</Text>
                </View>
                <ListView dataSource={this.state.dataSource} style={styles.listView}
                          renderRow={(rowData, sectionID, rowID) => {
                              const selected = (this.chargeExit(rowID) != -1)
                              return (
                                  <CertificateCell selected={selected} title={rowData.name}
                                                   clickClosure={this.clickedCell} rowID={rowID} need={rowData.isRequired}/>)
                          }
                          }/>
            </View>
        )
    }
}

class CertificateCell extends Component {

    constructor(props) {
        super(props)
        this.clickedSelf = this.clickedSelf.bind(this)
    }

    clickedSelf() {
        this.props.clickClosure(this.props.rowID)
    }

    render() {

        const {selected} = this.props
        var imgFile = null
        if (selected) {
            imgFile = require("../../img/greenNumber.png")
        } else {
            imgFile = require("../../img/greyNumber.png")
        }

        var bgCell = [styles.certificateCell]
        if (selected == false) {
            bgCell.push(styles.certificateCellNotS)
        }

        const number = (parseInt(this.props.rowID) + 1)

        return (
            <TouchableWithoutFeedback onPress={this.clickedSelf}>
                <View style={bgCell}>
                    <Image style={styles.certificateCellNumberImg} source={imgFile}>
                        <Text style={styles.certificateCellNumberText}>{number}</Text>
                    </Image>
                    <Text style={styles.certificateCellText}>{this.props.title}</Text>
                    {this.props.need && <Image style={styles.redStar} source={require("../../img/redStar.png")}/>}
                    {selected && <Image style={styles.greenSwoosh} source={require("../../img/greenSwoosh.png")}/>}

                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        height: 54,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 10,
        borderBottomColor: CommonColor.defaultBgColor,
    },
    topTitle: {
        textAlign: "center",
        fontSize: 15,
        color: CommonColor.defaultBlackColor,
    },
    listView: {
        flex: 1,
        alignSelf: "stretch"
    },
    certificateCell: {
        flexDirection: "row",
        height: 45,
        alignItems: "center",
        borderBottomWidth: 5,
        borderBottomColor: "rgba(240,240,240,1)",
    },

    certificateCellNotS: {
        backgroundColor: "rgba(250,250,250,1)"
    },
    certificateCellNumberImg: {
        width: 22,
        height: 22,
        marginLeft: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    certificateCellNumberText: {
        textAlign: "center",
        fontSize: 11,
        color: "white",
        backgroundColor: 'rgba(255,255,255,0)'
    },
    certificateCellText: {
        color: CommonColor.defaultBlackColor,
        marginLeft: 15,
    },
    redStar: {
        width: 8,
        height: 8,
        marginLeft: 10,
    },
    greenSwoosh: {
        width: 14,
        height: 11.5,
        marginLeft: 15,
    }

})

export default CollectionCertificate

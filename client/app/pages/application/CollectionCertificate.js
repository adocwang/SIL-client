import React, {Component} from 'react';
import {View, StyleSheet, Text,TextInput, Image, TouchableWithoutFeedback, Navigator, ListView, AsyncStorage} from 'react-native'
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import {fetchCollectionConfig, submitCollectionConfig,passCollection,delFinding} from '../../actions/application'
import CollectionContentContainer from "../../containers/CollectionContentContainer"
import {ToastShort} from '../../utils/ToastUtils';
import * as types from '../../constants/ActionTypes';
import {fetchGetFindingEnterprise} from "../../actions/enterprise"
import Loading from '../../components/Loading';
import EventEmitter from "react-native-md5"
import md5 from "react-native-md5";
import Button from '../../components/Button.ios.js'
import PopupDialog, {
    DialogTitle, DialogButton

} from 'react-native-popup-dialog';
import dismissKeyboard from 'dismissKeyboard'

class CollectionCertificate extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.datas = [];
        this.state = {dataSource: ds, showLoading: false,refresh:"refresh"}
        this.selecteds = []
        this.clickedCell = this.clickedCell.bind(this)
        this.chargeExit = this.chargeExit.bind(this)
        this.fetchConfig = this.fetchConfig.bind(this)
        this.saveCell = this.saveCell.bind(this)
        this.getChildData = this.getChildData.bind(this)
        this.rightTitleClicked = this.rightTitleClicked.bind(this)
        this.initalizeData = this.initalizeData.bind(this)
        this.saveDraft = this.saveDraft.bind(this)
        this.configureProgressBegin = this.configureProgressBegin.bind(this)
        this.configureProgressWait = this.configureProgressWait.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.didClickedPass = this.didClickedPass.bind(this)
        this.didClickedNotPass = this.didClickedNotPass.bind(this)
        this.inputFail = this.inputFail.bind(this)
        this.reFinding = this.reFinding.bind(this)
        this.didClickedRefinding = this.didClickedRefinding.bind(this)
        this.didClickedDialogTop = this.didClickedDialogTop.bind(this)
        this.submitData = null
        this.isSubmiting = false
        this.originData = null
        this.companyProgress = -1
        this.operateionEnable = "none"//none,check,refinding
    }

    componentDidMount() {
        this.setState({showLoading: true})
        this.fetchConfig()
    }

    fetchConfig() {

        const {dispatch, auth} = this.props
        const company = this.props.route.params.company
        const companyId = company.id
        const finding = company.finding
        if(typeof(finding) != 'undefined' && finding != "") {
            this.companyProgress = finding.progress
        }
        console.log(this.companyProgress)

       if(this.companyProgress == -1) {
           const {dispatch, auth} = this.props
           dispatch(fetchCollectionConfig(auth.token))
           dispatch(fetchGetFindingEnterprise(companyId, auth.token))
       }
       if(this.companyProgress == 0 || this.companyProgress == 1) {
           dispatch(fetchGetFindingEnterprise(companyId, auth.token))
       }
       if(this.companyProgress == 2) {
           dispatch(fetchGetFindingEnterprise(companyId, auth.token))
       }
        if(this.companyProgress == 3) {
            dispatch(fetchGetFindingEnterprise(companyId, auth.token))
        }
    }

    componentWillReceiveProps(nextProps) {
        const {collection, dispatch, findingEnterprise, auth} = nextProps

        if(typeof(findingEnterprise.data.operation_enable) != 'undefined') {
            this.operateionEnable = findingEnterprise.data.operation_enable
        }
        if(this.companyProgress == -1) {
            this.operateionEnable = "none"
        }
            if (this.isSubmiting) {
            this.isSubmiting = false
            const {navigator} = this.props
            ToastShort("提交成功")
            navigator.pop()
            this.clearDraft()
            const refreshView = this.props.route.params.refreshView
            refreshView()
        } else {
            if (this.companyProgress == -1) {
                this.configureProgressBegin(nextProps)
            } else if(this.companyProgress == 0 || this.companyProgress == 1 || this.companyProgress == 2 || this.companyProgress == 3) {
                this.configureProgressWait(nextProps)
            }
        }
        this.setState({showLoading: false})
    }

    configureProgressBegin(nextProps) {
            const {collection, dispatch, findingEnterprise, auth} = nextProps
        const companyId = this.props.route.params.company.id

            const collectionMd5 = md5.hex_md5(JSON.stringify(collection))
            if(collection.length > 0) {
                AsyncStorage.getItem(types.COLLECTION_LOCAL, (error, value) => {
                    if (value == null) {
                        this.initalizeData(collection)
                        AsyncStorage.setItem(types.COLLECTION_LOCAL, collectionMd5)
                    } else {
                        if(collectionMd5 == value) {
                            AsyncStorage.getItem(types.COLLECTION_LOCAL + companyId, (error, value) => {
                                if (value == null) {
                                    if(typeof(findingEnterprise.data.data) != 'undefined') {
                                        const result = findingEnterprise.data.data
                                        this.originData = JSON.parse(result)
                                        this.initalizeData(this.originData.submitData)
                                    } else {
                                        this.initalizeData(collection)
                                    }
                                } else {
                                    this.originData = JSON.parse(value)
                                    this.initalizeData(this.originData.submitData)
                                    this.setState({showLoading: false})
                                }
                            })
                        } else {
                            this.clearDraft()
                            AsyncStorage.setItem(types.COLLECTION_LOCAL, collectionMd5)
                            this.initalizeData(collection)
                        }
                    }
                })
        }
    }

    didClickedDialogTop() {
        dismissKeyboard();
    }

    configureProgressWait(nextProps) {
        const {collection, dispatch, findingEnterprise, auth} = nextProps
        if(typeof(findingEnterprise.data.data) != 'undefined') {
            const result = findingEnterprise.data.data
            this.originData = JSON.parse(result)
            this.initalizeData(this.originData.submitData)
        } else {
            this.initalizeData(collection)
        }
    }

    initalizeData(data) {
        this.datas = data
        this.submitData = JSON.parse(JSON.stringify(this.datas));
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.datas)})
    }


    saveCell(index) {
        this.submitData[index].selected = true
        let newData = JSON.parse(JSON.stringify(this.datas));
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData)
        })
    }

    clearDraft() {
        const companyId = this.props.route.params.company.id
        AsyncStorage.removeItem(types.COLLECTION_LOCAL + companyId)
    }

    saveDraft() {

        const companyId = this.props.route.params.company.id
        var realData = this.originData
        if (this.originData == null) {
            realData = new Object()
            realData.createTime = Date.parse(new Date());
        }

        realData.submitData = this.submitData
        realData.lastModifyTime = Date.parse(new Date());
        const jsonData = JSON.stringify(realData)
        AsyncStorage.setItem(types.COLLECTION_LOCAL + companyId, jsonData)
        return realData
    }

    didClickedPass() {
        const {dispatch,auth} = this.props
        const companyId = this.props.route.params.company.id
        dispatch(passCollection({id:companyId,pass:"1",},auth.token))
        this.isSubmiting  = true
        this.setState({showLoading: true})
    }

    didClickedNotPass() {
        this.popupDialog.openDialog()
    }

    inputFail(text) {
        this.popupDialog.closeDialog()
        const {dispatch,auth} = this.props
        const companyId = this.props.route.params.company.id
        dispatch(passCollection({id:companyId,pass:"-1",un_pass_reason:text},auth.token))
        this.isSubmiting  = true
        this.setState({showLoading: true})
    }

    didClickedRefinding() {
        this.popupDialog.openDialog()
    }
    reFinding() {
        this.popupDialog.closeDialog()
        const {dispatch,auth} = this.props
        const companyId = this.props.route.params.company.id
        dispatch(delFinding(companyId,auth.token))
        this.isSubmiting  = true
        this.setState({showLoading: true})
    }

    clickedCell(index) {
        const {navigator} = this.props
        const content = JSON.parse(JSON.stringify(this.submitData[index]));
        const canEdit = (this.companyProgress == - 1)
        navigator.push({
            name: "CollectionContentContainer",
            component: CollectionContentContainer,
            params: {
                content: content,
                backClosure: this.getChildData,
                index: index,
                canEdit: canEdit,
            }
        })
    }

    rightTitleClicked() {
        if(this.companyProgress != -1) {
            return
        }
        var status = true
        this.submitData.map((data, index) => {
            if (data.isRequired && !data.selected) {
                ToastShort("*号必须填写")
                status = false
            }
        })
        if (!status) {
            return
        }
        const realData = this.saveDraft()
        const {dispatch, auth} = this.props
        const companyId = this.props.route.params.company.id
        const jsonData = JSON.stringify(realData)
        this.isSubmiting = true
        this.setState({showLoading: true})
        dispatch(submitCollectionConfig({id: companyId, data: jsonData}, auth.token))
    }

    getChildData(index, data) {
        const childData = JSON.parse(JSON.stringify(this.datas[index]));
        childData.content = data
        this.submitData[index] = childData
        this.submitData[index].selected = true
        this.datas = JSON.parse(JSON.stringify(this.datas));
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.datas)})
        this.saveDraft()
    }

    chargeExit(index) {
        for (var i = 0; i < this.selecteds.length; i++) {
            if (this.selecteds[i] == index) {
                return i
            }
        }
        return -1
    }

    renderFooter() {
        return(
            <View>
                {this.operateionEnable == "check" &&
                <View style={styles.footer}>
                <Button style={styles.footerButton} titleStyle={styles.footerTitle} title="审核通过"
                        onPress={this.didClickedPass}/>
                <Button style={styles.footerButton} titleStyle={styles.footerTitle} title="审核不通过"
                        onPress={this.didClickedNotPass}/></View>
                    }
                {this.operateionEnable == "refinding" &&
                <View style={styles.footer}>
                    <Button style={styles.footerButton} titleStyle={styles.footerTitle} title="查看原因"
                            onPress={this.didClickedRefinding}/>
                </View>
                }
            </View>
        )
    }

    render() {
        const {findingEnterprise} = this.props
        const companyName = this.props.route.params.company.name
        var submitString = ""
        if(this.companyProgress == -1) {
            submitString = "提交"
        }
        var diaLogTableView = <FailDialogView closure={this.inputFail}/>
        if(this.operateionEnable == "refinding") {
              const reason = findingEnterprise.data.un_pass_reason
            diaLogTableView = <ReFindingDialogView reason={reason} closure={this.reFinding}/>
        }
        return (
            <View style={styles.container}>
                <CustomToolbar title="现场采集" navigator={this.props.navigator} operate={submitString}
                               onOperateClicked={this.rightTitleClicked}/>
                <View style={styles.topView}>
                    <Text style={styles.topTitle}>{companyName}</Text>
                </View>
                <ListView dataSource={this.state.dataSource} style={styles.listView}
                          renderRow={(rowData, sectionID, rowID) => {
                              const selected = this.submitData[rowID].selected
                              return (
                                  <CertificateCell selected={selected} title={rowData.name}
                                                   clickClosure={this.clickedCell} rowID={rowID}
                                                   need={rowData.isRequired}/>)
                          }
                          }
                          renderFooter={this.renderFooter}
                />
                <PopupDialog
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}
                    dialogTitle={<DialogTitle title="原因"/>}
                    width={250} height={300}
                >
                    {diaLogTableView}

                </PopupDialog>
                {this.state.showLoading && <Loading/>}
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

class FailDialogView extends Component {

    constructor(props) {
        super(props)
        this.inputViewChange = this.inputViewChange.bind(this)
        this.didClickedConfirm = this.didClickedConfirm.bind(this)
        this.exitKeybord = this.exitKeybord.bind(this)
        this.text = ""
    }

    inputViewChange(text) {
        this.text = text
    }

    didClickedConfirm() {
        const {closure} = this.props
        if(this.text.length > 0) {
            closure(this.text)
        }
    }

    exitKeybord() {
        dismissKeyboard()
    }

    render(){return(
        <View style={{flex:1,alignItems:"center"}}>
            <Button style={[styles.exitKeybordButton]} titleStyle={{color: CommonColor.defaultLightGray}} title="退出键盘"
                    onPress={this.exitKeybord}/>
            <TextInput  multiline style={styles.failArea} placeholder="请输入未通过审核原因"
                       onChangeText={this.inputViewChange.bind(this)} underlineColorAndroid="transparent"/>
            <Button style={[styles.confirmButton]} titleStyle={styles.footerTitle} title="确定"
                    onPress={this.didClickedConfirm}/>
        </View>
    )}

    }

class ReFindingDialogView extends Component {

    constructor(props) {
        super(props)
        this.didClickedConfirm = this.didClickedConfirm.bind(this)
        this.text = ""
    }

    didClickedConfirm() {
        const {closure} = this.props
        closure()
    }

    render(){
        const {reason} = this.props
        return(
        <View style={{flex:1,alignItems:"center"}}>
            <TextInput  multiline style={styles.failArea} placeholder={reason} editable={false}
                         underlineColorAndroid="transparent"/>
            <Button style={[styles.confirmButton]} titleStyle={styles.footerTitle} title="重新采集"
                    onPress={this.didClickedConfirm}/>
        </View>
    )}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
    },
    footer: {
        height: 80,
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection:"row",
    },
    footerButton: {
        width: 100,
        height: 30,
        borderWidth: 1,
        borderColor: CommonColor.defaultBlueColor,
        borderRadius: 20,
    },
    footerTitle: {
        color: CommonColor.defaultBlueColor
    },
    failArea: {
        flex:1,
        alignSelf:"stretch",
        height: 80,
        backgroundColor: CommonColor.defaultBgColor,
        borderColor: CommonColor.defaultDarkLineColor,
        fontSize: 14,
        paddingLeft: 5,
        paddingRight: 5,
    },
    confirmButton: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: CommonColor.defaultBlueColor,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 15,
    },
    exitKeybordButton: {
        width: 70,
        height: 25,
        borderWidth: 1,
        borderColor: CommonColor.defaultLightGray,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 10,
    }

})

export default CollectionCertificate

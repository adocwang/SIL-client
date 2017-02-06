import React, {Component} from 'react';
import {
    Dimensions,
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
import PopupDialog, {
    DialogTitle,
    DialogButton,
    DefaultAnimation,

} from 'react-native-popup-dialog';
export default class CollectionTrade extends Component {

    static defaultProps = {
        work: ["工业", "农业", "计算机"],
        attr: ["3.0%", "4.0%", "5%"],
        scope: ["9折", "8.8折"]
    }

    constructor(props) {
        super(props)
        this.didClickedItem = this.didClickedItem.bind(this)
        this.didClickedDialogItem = this.didClickedDialogItem.bind(this)
        this.state = {dialogData: [], workIndex: -1, attrIndex: -1, scopeIndex: -1, selecteIndex: 0}
        this.didClickedSave = this.didClickedSave.bind(this)
    }

    didClickedSave() {
        const {navigator} = this.props

        navigator.push({
            name: "AcountCertifice",
            component: AcountCertifice,
        })
    }

    didClickedItem(index) {
        this.setState({selecteIndex: index})
        var data = null
        if (index == 0) {
            data = this.props.work
        }
        if (index == 1) {
            data = this.props.attr
        }
        if (index == 2) {
            data = this.props.scope
        }
        this.setState({dialogData: data})
        this.popupDialog.openDialog()
    }

    didClickedDialogItem(itemIndex) {
        this.popupDialog.closeDialog()

        const index = this.state.selecteIndex
        if (index == 0) {
            this.setState({workIndex: itemIndex})
        }
        if (index == 1) {
            this.setState({attrIndex: itemIndex})
        }
        if (index == 2) {
            this.setState({scopeIndex: itemIndex})
        }

    }

    render() {
        const dialogData = this.state.dialogData
        var workTitle = null
        if (this.state.workIndex != -1) {
            workTitle = this.props.work[this.state.workIndex]
        }
        var attrTitle = null
        if (this.state.attrIndex != -1) {
            attrTitle = this.props.attr[this.state.attrIndex]
        }
        var scopeTitle = null
        if (this.state.scopeIndex != -1) {
            scopeTitle = this.props.scope[this.state.scopeIndex]
        }
        return (
            <View style={styles.container}>
                <CustomToolbar title="现场采集" navigator={this.props.navigator} operate="保存"
                               onOperateClicked={this.rightTitleClicked}/>
                <View style={styles.topView}>
                    <Text style={styles.topTitle}>行业分类</Text>
                </View>
                <InputView title={workTitle} titleHolder="输入行业" clickedClosure={this.didClickedItem.bind(this, 0)}/>
                <InputView title={attrTitle} titleHolder="输入行业属性" clickedClosure={this.didClickedItem.bind(this, 1)}/>
                <InputView title={scopeTitle} titleHolder="经营范围" clickedClosure={this.didClickedItem.bind(this, 2)}/>
                <Button style={styles.saveButton} titleStyle={styles.saveTitle} title="保存"
                        onPress={this.didClickedSave}/>
                <PopupDialog
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}
                    dialogTitle={<DialogTitle title="选择"/>}
                    width={250} height={300}
                >
                    <DialogoTableView data={dialogData} closure={this.didClickedDialogItem}/>
                </PopupDialog>
            </View>
        )
    }
}

class InputView extends Component {

    clickedSelf() {
        const {clickedClosure} = this.props
        clickedClosure()
    }

    render() {
        const {title, titleHolder} = this.props
        var titleStyle = [styles.inputTitle]
        var showTitle = titleHolder
        if (title !== null) {
            titleStyle.push(styles.textHolderS)
            showTitle = title
        }
        return (
            <TouchableWithoutFeedback onPress={this.clickedSelf.bind(this)}>
                <View style={styles.inputView}>
                    <Text style={titleStyle}>{showTitle}</Text>
                    <Image style={styles.chooseMoreImg} source={require("../../img/chooseMore.png")}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
class DialogoTableView extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {dataSource: ds.cloneWithRows(this.props.data)}
    }

    clickedCell(index) {
        this.props.closure(index)
    }

    render() {
        return (
            <ListView dataSource={this.state.dataSource}
                      renderRow={(rowData, sectionID, rowID) =>
                          <TouchableWithoutFeedback onPress={this.clickedCell.bind(this, rowID)}>
                              <View style={styles.chooseCell}><Text style={styles.chooseTitle}>{rowData}</Text></View>
                          </TouchableWithoutFeedback>
                      }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        height: 44,
        alignSelf: "stretch",
        justifyContent: "flex-end",
        borderBottomColor: CommonColor.defaultBgColor,
    },
    topTitle: {
        textAlign: "left",
        fontSize: 15,
        marginLeft: 40,
        color: CommonColor.defaultBlackColor,
    },
    inputView: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        height: 45,
        borderWidth: 1,
        borderColor: CommonColor.defaultLightGray,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputTitle: {
        marginLeft: 10,
        fontSize: 14,
        alignSelf:"center",
        color: CommonColor.defaultLightGray
    },
    chooseMoreImg: {
        width: 10,
        height: 20,
        marginRight: 15
    },
    saveButton: {
        width: 160,
        height: 40,
        borderWidth: 1,
        borderColor: CommonColor.defaultBlueColor,
        borderRadius: 20,
        alignSelf: "center",
        marginTop: 40,
    },
    saveTitle: {
        color: CommonColor.defaultBlueColor
    },
    chooseCell: {
        borderBottomColor: CommonColor.defaultLineColor,
        borderBottomWidth: 1,
    },
    chooseTitle: {
        paddingLeft: 10,
        height: 44,
        color: CommonColor.defaultLightGray,
        lineHeight: 44,
    },
    textHolderS: {
        color: CommonColor.defaultBlackColor
    },
})

import React, {Component} from 'react';
import {
    ListView,
    View,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    Navigator,
    ScrollView
} from 'react-native'
import LoanCalculatorContainer from '../../containers/LoanCalculatorContainer'
import CollectionContainer from '../../containers/CollectionContainer'
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import CollectionTakephoto from "./CollectionTakePhoto.js"
import Button from '../../components/Button.ios.js'
import Takephoto from '../TakePhoto'
import {uploadImg} from '../../actions/application'
import dismissKeyboard from 'dismissKeyboard'
import PopupDialog, {
    DialogTitle, DialogButton

} from 'react-native-popup-dialog';
import {ToastShort} from '../../utils/ToastUtils';
import Loading from '../../components/Loading'
class CollectionContent extends Component {

    constructor(props) {
        super(props)
        this.clickedSelf = this.clickedSelf.bind(this)
        this.generateView = this.generateView.bind(this)
        this.inputView = this.inputView.bind(this)
        this.textArea = this.textArea.bind(this)
        this.selectView = this.selectView.bind(this)
        this.imageView = this.imageView.bind(this)
        this.checkBoxView = this.checkBoxView.bind(this)
        this.inputViewChange = this.inputViewChange.bind(this)
        this.selectViewChange = this.selectViewChange.bind(this)
        this.didClickedSelectDialogItem = this.didClickedSelectDialogItem.bind(this)
        this.checkBoxViewChange = this.checkBoxViewChange.bind(this)
        this.didClickedCheckBox = this.didClickedCheckBox.bind(this)
        this.changePhoto = this.changePhoto.bind(this)
        this.chargeInputAll = this.chargeInputAll.bind(this)
        this.uploadImg = this.uploadImg.bind(this)
        this.didClickedSave = this.didClickedSave.bind(this)
        this.showDialogType = "select"
        this.state = {data: null, selectViewIndex: -1,refresh:"refresh",showLoading:false}
        this.paths = []
        this.netPaths = []
        this.imgIndex = -1
        this.submitData = null
        this.lastImgId = ""
    }

    componentDidMount() {
        const content = this.props.route.params.content
        this.submitData = JSON.parse(JSON.stringify(content.content));
        console.log(this.submitData)
        this.setState({data: content})
    }

    didClickedSave() {
        if(this.imgIndex != -1 && typeof(this.submitData[this.imgIndex].value) == "undefined" ) {
            if(this.paths.length == 0) {
                ToastShort("添加图片")
            } else {
                this.uploadImg()
            }
        } else {
            this.chargeInputAll()
        }
    }

    chargeInputAll() {

        var result = true
        this.submitData.map(data=>{
            if(data.value == undefined) {
                result =  false
            }
        })
        if(!result) {
            ToastShort("信息不完善")
        } else {
            const {navigator} = this.props
            ToastShort("提交成功")
            navigator.pop()
            const backClosure = this.props.route.params.backClosure
            const index = this.props.route.params.index
            backClosure(index, this.submitData)
        }
    }

    clickedSelf() {
        dismissKeyboard();
    }

    changePhoto(index,paths) {
        console.log(paths)
        this.paths = paths
    }

    uploadImg() {
        this.setState({showLoading: true})
        this.paths.map(path=>{
            const {dispatch,auth} = this.props
            dispatch(uploadImg(path,auth.token))
        })
    }


    componentWillReceiveProps(nextProps) {

        const {uploadImg} = nextProps
        console.log(uploadImg.resourceId)
        if(uploadImg.resourceId != this.lastImgId) {

            this.lastImgId = uploadImg
            this.netPaths.push(uploadImg.resourceId)

            if(this.netPaths.length == this.paths.length) {

                    this.setState({showLoading: false})

                this.submitData[this.imgIndex].value = this.netPaths
                console.log("判断")
                this.chargeInputAll()
            }
        }
    }

    inputViewChange(index,text) {
        this.submitData[index].value = text
        console.log(index)
        console.log(text)
    }

    checkBoxViewChange(index) {
        this.showDialogType = "checkBox"
        this.setState({selectViewIndex: index})
        this.popupDialog.openDialog()
    }

    selectViewChange(index) {
        this.showDialogType = "select"
        this.setState({selectViewIndex: index})
        this.popupDialog.openDialog()
    }

    didClickedSelectDialogItem(index) {
        this.popupDialog.closeDialog()
        const selectIndex = this.state.selectViewIndex
        this.submitData[selectIndex].value = this.submitData[selectIndex].dataSource[index]
        this.setState({refresh:"refresh"})
    }

    didClickedCheckBox(indexs) {
        this.popupDialog.closeDialog()
        const selectIndex = this.state.selectViewIndex
        const values = indexs.map(index=>{
            const value = this.submitData[selectIndex].dataSource[index]
            return value
        })
        this.submitData[selectIndex].value = values
        this.setState({refresh:"refresh"})

    }

    inputView(obj, index) {
        return (
            <TextInput key={index} style={styles.textInput} placeholder={obj.title}
                       onChangeText={this.inputViewChange.bind(this, index)} underlineColorAndroid="transparent"/>
        )
    }

    textArea(obj, index) {
        return (
            <TextInput key={index} multiline style={styles.textArea} placeholder={obj.title}
                       onChangeText={this.inputViewChange.bind(this, index)} underlineColorAndroid="transparent"/>
        )
    }

    selectView(obj, index) {
        var value = null
        console.log(typeof(this.submitData[index].value))
        if(typeof(this.submitData[index].value) != "undefined") {
            value = this.submitData[index].value.name
        }
        return (
            <SelecteView key={index} title={value} titleHolder={obj.title} selectedClosure={this.selectViewChange.bind(this, index)}/>
        )
    }

    imageView(obj, index) {
        this.imgIndex = index
        return (
            <AddPhoto key={index} changePhoto={this.changePhoto.bind(this, index)}
                      navigator={this.props.navigator}/>
        )
    }

    checkBoxView(obj, index) {
        var value = null
        if(typeof(this.submitData[index].value) != "undefined") {
            value = ""
            this.submitData[index].value.map(data=>{
                value += (data.name + ",")
            })
            value = value.substring(0,value.length -1)
        }
        return (
            <SelecteView key={index} title={value} titleHolder={obj.title}
                         selectedClosure={this.checkBoxViewChange.bind(this, index)}/>
        )
    }

    generateView() {
        var views = []
        const length = this.state.data.content.length
        for (var i = 0; i < length; i++) {
            const obj = this.state.data.content[i]
            switch (obj.type) {
                case "input":
                    views.push(this.inputView(obj, i))
                    break;
                case "textarea":
                    views.push(this.textArea(obj, i))
                    break;
                case "select":
                    views.push(this.selectView(obj, i))
                    break;
                case 'img':
                    views.push(this.imageView(obj, i))
                    break
                case 'checkbox':
                    views.push(this.checkBoxView(obj, i))
                default:
            }
        }
        return views
    }

    render() {
        var views = null
        var name = null
        if (this.state.data != null) {
            name = this.state.data.name
            views = this.generateView()
        }
        var dialogData = []
        if (this.state.data != null) {
            if (this.state.selectViewIndex != -1) {
                const dataSource = this.state.data.content[this.state.selectViewIndex].dataSource
                console.log(dataSource)
                for (var i = 0; i < dataSource.length; i++) {
                    const obj = dataSource[i]
                    dialogData.push(obj.name)
                }
            }
        }
        console.log("ch")

        return (
            <TouchableWithoutFeedback onPress={this.clickedSelf}>
                <View style={styles.containers}>
                    {this.state.showLoading && <Loading/>}
                    <CustomToolbar title="现场采集" navigator={this.props.navigator}/>
                    <View style={styles.topView}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {views}
                        <Button style={styles.saveButton} titleStyle={styles.saveTitle} title="保存"
                                onPress={this.didClickedSave}/>
                    </ScrollView>
                    <PopupDialog
                        ref={(popupDialog) => {
                            this.popupDialog = popupDialog;
                        }}
                        dialogTitle={<DialogTitle title="选择"/>}
                        width={250} height={300}
                    >
                        {this.showDialogType == "select" ?
                            <DialogoSelectTableView data={dialogData} closure={this.didClickedSelectDialogItem}/>
                            : <DialogoCheckTableView data={dialogData} closure={this.didClickedCheckBox}/>
                        }

                    </PopupDialog>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class SelecteView extends Component {

    clickedSelf() {
        const {selectedClosure} = this.props
        selectedClosure()
    }

    render() {
        const {title, titleHolder} = this.props

        var titleStyle = [styles.inputTitle]
        var showTitle = titleHolder
        if (title != null) {
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

class AddPhoto extends Component {

    constructor(props) {
        super(props)

        this.changeIndex = 0
        this.state = {otherImgPath: [""]}
        this.firstNotChange = true
        this.addOtherImg = this.addOtherImg.bind(this)
        this.takeOtherPhoto = this.takeOtherPhoto.bind(this)
        this.changeOtherImg = this.changeOtherImg.bind(this)
        this.backPaths = this.backPaths.bind(this)
        this.changePhoto = this.changePhoto.bind(this)
    }


    takeOtherPhoto() {
        const {navigator} = this.props

        navigator.push({
            name: "Takephoto",
            component: Takephoto,
            params: {
                takephotoClosure: this.addOtherImg,
            }
        })
    }

    addOtherImg(path) {
        this.setState(prev => {
            prev.otherImgPath.push(path)
            this.backPaths(prev.otherImgPath)
            return ({otherImgPath: prev.otherImgPath})
        })
    }

    changePhoto(index) {
        const {navigator} = this.props
        this.changeIndex = index
        navigator.push({
            name: "Takephoto",
            component: Takephoto,
            params: {
                takephotoClosure: this.changeOtherImg,
            }
        })
    }

    changeOtherImg(path) {
        this.setState(prev => {
            prev.otherImgPath[this.changeIndex] = path
            this.backPaths(prev.otherImgPath)
            if (this.changeIndex == 0) {
                this.firstNotChange = false
            }
            return ({otherImgPath: prev.otherImgPath})
        })
    }

    backPaths(paths) {
        const {changePhoto} = this.props
        changePhoto(paths)
    }

    render() {

        var count = this.state.otherImgPath.length
        var lastCellStyle = [styles.addCellChild]
        if (count % 2 == 1) {
            lastCellStyle.push(styles.addCellRight)
        }
        const cells = this.state.otherImgPath.map((path, index) =>
            <AddPhotoCell key={index} path={path} index={index} changePhoto={this.changePhoto}
                          firstNotChange={this.firstNotChange}/>
        )

        return (
            <View style={styles.addPhoto}>
                {cells}
                <TouchableWithoutFeedback onPress={this.takeOtherPhoto}>
                    <View style={styles.addCell}>
                        <View style={lastCellStyle}>
                            <Image style={styles.addLastCellImg} source={require("../../img/add.png")}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback >

            </View>
        )
    }
}

class AddPhotoCell extends Component {

    constructor(props) {
        super(props)
        this.changePhoto = this.changePhoto.bind(this)
    }

    changePhoto() {
        const {index, changePhoto} = this.props
        changePhoto(index)
    }

    render() {
        const {index} = this.props
        var imgPath = {uri: this.props.path}
        var cellImgStyle = styles.mustCellImgS
        var cellStyle = [styles.addCellChild]
        if (index % 2 == 1) {
            cellStyle.push(styles.addCellRight)
        }
        if (index == 0 && this.props.firstNotChange) {
            imgPath = require("../../img/default_img.png")
            cellImgStyle = styles.mustCellImg
        }
        return (
            <TouchableWithoutFeedback onPress={this.changePhoto}>
                <View style={styles.addCell}>
                    <View style={cellStyle}>
                        <Image style={cellImgStyle} source={imgPath}>
                        </Image>
                    </View>
                </View>
            </TouchableWithoutFeedback >
        )
    }
}

class DialogoSelectTableView extends Component {
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

class DialogoCheckTableView extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.selecteds = []
        this.state = {dataSource: ds}
        this.generate = this.generate.bind(this)
        this.generateData = null
        this.didClickedSave = this.didClickedSave.bind(this)
    }

    componentDidMount() {
        this.generateData = this.generate()
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.generateData)})
    }

    generate() {
        return this.props.data.map(rowData => {
            var obj = new Object()
            obj.title = rowData
            obj.selected = false
            return obj
        })
    }

    saveCell(index) {
        this.generateData[index].selected = !(this.generateData[index].selected)
        let newData = JSON.parse(JSON.stringify(this.generateData));

        this.setState({dataSource: this.state.dataSource.cloneWithRows(newData)})

    }

    clickedCell(index) {
        this.props.closure(index)
    }

    didClickedSave() {
        var indexs = []
        for (var i = 0; i < this.generateData.length; i++) {
            const obj = this.generateData[i]
            if (obj.selected) {
                indexs.push(i)
            }
        }
        const {closure} = this.props
        closure(indexs)
    }

    render() {
        return (
            <View style={styles.checkTableView}>
                <ListView style={styles.checkListView} dataSource={this.state.dataSource}
                          renderRow={(rowData, sectionID, rowID) => {
                              const selected = this.generateData[rowID].selected
                              return (
                                  <TouchableWithoutFeedback onPress={this.saveCell.bind(this, rowID)}>
                                      <View style={styles.chooseCell}>
                                          <Text style={styles.chooseTitle}>{rowData.title}</Text>
                                          {selected &&
                                          <Image style={styles.greenSwoosh}
                                                 source={require("../../img/greenSwoosh.png")}/>}
                                      </View>
                                  </TouchableWithoutFeedback>)
                          }
                          }
                />
                <Button style={styles.checkButton} titleStyle={styles.checkTitle} title="保存"
                        onPress={this.didClickedSave}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    scrollView: {
        height: Dimensions.get('window').height - 100,
    },
    saveTitle: {
        color: CommonColor.defaultBlueColor
    },
    textInput: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        height: 45,
        borderWidth: 1,
        borderColor: CommonColor.defaultLightGray,
        borderRadius: 5,
        flexDirection: "row",
        paddingLeft: 5
    },
    topView: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        marginLeft: 40,
        color: CommonColor.defaultBlackColor
    },
    textArea: {
        alignSelf: "stretch",
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        height: 80,
        backgroundColor: CommonColor.defaultBgColor,
        borderColor: CommonColor.defaultDarkLineColor,
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 14,
        paddingLeft: 5,
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
        alignSelf: "center",
        color: CommonColor.defaultLightGray
    },
    chooseMoreImg: {
        width: 10,
        height: 20,
        marginRight: 15,

    },
    textHolderS: {
        color: CommonColor.defaultBlackColor
    },
    addPhoto: {
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    addCell: {
        flexDirection: "row",
        height: 110,
        width: Dimensions.get('window').width / 2,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20
    },
    addCellChild: {
        borderWidth: 1,
        borderColor: CommonColor.defaultLightGray,
        borderRadius: 2,
        flexDirection: "row",
        flex: 1,
        height: 90,
        marginLeft: 40,
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
    },
    addCellRight: {
        marginLeft: 20,
        marginRight: 40,
    },
    mustCellImgS: {
        flexDirection: "row",
        flex: 1,
        height: 86,
        justifyContent: "flex-end"
    },
    chooseCell: {
        borderBottomColor: CommonColor.defaultLineColor,
        borderBottomWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        height: 44,
    },
    chooseTitle: {
        paddingLeft: 10,
        color: CommonColor.defaultLightGray,
    },
    greenSwoosh: {
        width: 14,
        height: 11.5,
        marginLeft: 15,
    },
    checkTableView: {
        flex: 1
    },
    checkListView: {
        marginBottom: 40,
        flex: 1
    },
    checkButton: {
        height: 40,
        backgroundColor: CommonColor.defaultBgColor,
        alignSelf: "stretch",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    checkTitle: {
        color: CommonColor.defaultSecondBlackColor
    }
})

export default CollectionContent

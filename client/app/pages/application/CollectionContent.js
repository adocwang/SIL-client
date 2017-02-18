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
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import Button from '../../components/Button.ios.js'
import dismissKeyboard from 'dismissKeyboard'
import {uploadImage} from '../../utils/HttpServices';
import * as host from '../../constants/Urls';

import PopupDialog, {
    DialogTitle, DialogButton

} from 'react-native-popup-dialog';
import {ToastShort} from '../../utils/ToastUtils';
var ImagePicker = require('react-native-image-picker');

import Loading from '../../components/Loading';

const ImgModel = {
    local: "",
    net: "",
}

const newImgModel = () => {
    var imgModel = new Object()
    imgModel.local = ""
    imgModel.net = ""
    return imgModel
}


const imgRootPath = "http://silapi.adoc.wang/resource/get/"

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
        this.hasUploadImg = this.hasUploadImg.bind(this)
        this.chargeWithOutImg = this.chargeWithOutImg.bind(this)
        this.uploadImgMethod = this.uploadImgMethod.bind(this)
        this.receiveImg = this.receiveImg.bind(this)
        this.chargeFail = this.chargeFail.bind(this)
        this.selectImgQuality = this.selectImgQuality.bind(this)
        this.didClickedImgQuality = this.didClickedImgQuality.bind(this)
        this.chargeImgCount = this.chargeImgCount.bind(this)
        this.showDialogType = "select"
        this.state = {data: null, selectViewIndex: -1, refresh: "refresh", showLoading: false}
        this.netPathsContainer = []
        this.failIndexs = []
        this.submitData = null
        this.imgModelsContainer = []
        this.selectImgClosure = null
    }

    componentDidMount() {
            const content = this.props.route.params.content
            this.submitData = JSON.parse(JSON.stringify(content.content));
            this.setState({data: content})
    }

    didClickedSave() {
        if (this.imgModelsContainer.length > 0) {
            const result = parseInt(this.hasUploadImg())
            console.log(result)
            switch (result) {
                case 0:
                    ToastShort("上传图片")
                    break;
                case 1:
                    this.uploadImg()
                    break
                default:
                    this.chargeInputAll()
            }
        } else {
            this.chargeInputAll()
        }
    }

    hasUploadImg() { //0 添加图片 1,上传
        var status = 2
        for(var i = 0;i<this.imgModelsContainer.length;i++) {
            const child = this.imgModelsContainer[i]
            const imgs = child.value
            if(imgs.length == 1) {
                const model = imgs[0]
                if (model.local == "" && model.net == "") {
                    return 0
                }
            }
            imgs.map(data => {
                if (data.local != "") {
                    status = 1
                }
            })
            return status
        }
        return status
    }

    chargeWithOutImg() {
        var result = true
        this.submitData.map(data => {
            if (data.value == undefined && data.type != "img") {
                result = false
            }
        })
        if (!result) {
            ToastShort("信息不完善")
        }
        return result
    }

    chargeInputAll() {

        var result = true
        this.submitData.map(data => {
            if (data.value == undefined) {
                result = false
            }
        })
        if (!result) {
            ToastShort("信息不完善")
        } else {
            const {navigator} = this.props
            ToastShort("保存草稿成功")
            navigator.pop()
            const backClosure = this.props.route.params.backClosure
            const index = this.props.route.params.index
            backClosure(index, this.submitData)
        }
    }

    clickedSelf() {
        dismissKeyboard();
    }

    changePhoto(index, paths) {
        this.imgModelsContainer.map(child=>{
            if(index == child.index) {
                child.value = paths
            }
        })
    }

    uploadImg() {
        if (!this.chargeWithOutImg()) {
            return false
        }
        this.netPathsContainer = []
        this.imgModelsContainer.map(child=>{
            const imgs = child.value
            var obj = new Object()
            obj.index = child.index
            obj.netPaths = []
            obj.failIndexs = []
            this.netPathsContainer.push(obj)

            imgs.map((imgModel, index) => {
                if (imgModel.net != "") {
                    obj.netPaths.push(imgModel.net)
                } else if (imgModel.local != "" && imgModel.net == "") {
                    this.setState({showLoading: true})
                    const {auth,dispatch} = this.props
                    dispatch(this.uploadImgMethod(child.index,index, imgModel.local, auth.token))
                }
            })
        })
    }

    uploadImgMethod(childIndex,index, uri, token) {
        return dispatch => {
            return uploadImage(dispatch, host.RESOURCE_UPLOAD_URL, token, uri)
                .then((data) => {
                    if (data.code == 2007) {
                        ToastShort('用户不存在');
                    } else if (data.code == 1003) {
                        ToastShort('缺少参数');
                    } else if (data.code == 407) {
                        ToastShort('无权限');
                    } else if (data.code == 406) {
                        ToastShort('用户无权限');
                    } else if (data.code == 0) {
                        this.receiveImg(childIndex,index, data.data)
                    }
                })
                .catch((error) => {
                this.netPathsContainer.map(child=>{
                    if(child.index == childIndex) {
                        child.failIndexs.push(index)
                    }
                })
                    this.chargeFail()
                })
        }
    }

    chargeFail() {
        var status = true
        for(var i=0;i<this.imgModelsContainer.length;i++) {
            var netChild = this.netPathsContainer[i]
            if (netChild.netPaths.length + netChild.failIndexs.length != this.chargeImgCount(i)) {
                status = false
            } else {
                if(netChild.failIndexs.length > 0) {
                    const indexString = netChild.failIndexs.map(index=>{
                        return index + 1
                    }).join(",")
                    const sectionTitle = this.submitData[netChild.index].title

                    const toast = sectionTitle + "图片"+ indexString + "上传失败"
                    ToastShort(toast)
                }
            }
        }
        if(status) {
            this.setState({showLoading: false})
        }


        }

    chargeImgCount(index) {
        var imgModelsChild = this.imgModelsContainer[index].value
        var count = imgModelsChild.length
        if(imgModelsChild[0].local == "" && imgModelsChild[0].net == "") {
            count = count - 1
        }
        return count

    }

    receiveImg(childIndex,index, data) {
            this.chargeFail()
            var status = true
            for(var i=0;i<this.imgModelsContainer.length;i++) {
                var netChild = this.netPathsContainer[i]
                var imgModelsChild = this.imgModelsContainer[i]
                if(childIndex == imgModelsChild.index) {
                    netChild.netPaths.push(data.resourceId)
                    imgModelsChild.value[index].net = data.resourceId
                }
                if(netChild.netPaths.length != this.chargeImgCount(i)) {
                    status = false
                }
            }
            if(status) {
                this.setState({showLoading: false})
                this.netPathsContainer.map(child=>{
                    this.submitData[child.index].value = child.netPaths
                })
                this.chargeInputAll()
            }
    }

    componentWillReceiveProps(nextProps) {

    }


    inputViewChange(index, text) {
        this.submitData[index].value = text
    }

    checkBoxViewChange(index) {
        this.showDialogType = "checkBox"
        this.setState({selectViewIndex: index})
        this.popupDialog.openDialog()
    }

    selectImgQuality(closure) {
        this.showDialogType = "imgQuality"
        this.setState({refresh:"refresh"})
        this.popupDialog.openDialog()
        this.selectImgClosure = closure
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
        this.setState({refresh: "refresh"})
    }

    didClickedImgQuality(index) {
        this.popupDialog.closeDialog()
        if(this.selectImgClosure != null) {
           this.selectImgClosure(index)
       }
    }

    didClickedCheckBox(indexs) {
        this.popupDialog.closeDialog()
        const selectIndex = this.state.selectViewIndex
        const values = indexs.map(index => {
            const value = this.submitData[selectIndex].dataSource[index]
            return value
        })
        this.submitData[selectIndex].value = values
        this.setState({refresh: "refresh"})

    }

    inputView(obj, index) {
        const text = this.submitData[index].value
        return (
            <TextInput defaultValue={text} key={index} style={styles.textInput} placeholder={obj.title}
                       onChangeText={this.inputViewChange.bind(this, index)} underlineColorAndroid="transparent"/>
        )
    }

    textArea(obj, index) {
        const text = this.submitData[index].value

        return (
            <TextInput defaultValue={text} key={index} multiline style={styles.textArea} placeholder={obj.title}
                       onChangeText={this.inputViewChange.bind(this, index)} underlineColorAndroid="transparent"/>
        )
    }

    selectView(obj, index) {
        var value = null
        if (typeof(this.submitData[index].value) != "undefined") {
            value = this.submitData[index].value.name
        }
        return (
            <SelecteView key={index} title={value} titleHolder={obj.title}
                         selectedClosure={this.selectViewChange.bind(this, index)}/>
        )
    }

    imageView(obj, index) {
        var imgModels = null
        this.imgModelsContainer.map(child=>{
            if(child.index == index) {
                imgModels = child
            }
        })
        if (imgModels == null) {
            imgModels = []
            if (typeof(this.submitData[index].value) != "undefined") {
                const netImgs = this.submitData[index].value
                netImgs.map((data, index) => {
                    var imgModel = new Object()
                    imgModel.local = ""
                    imgModel.net = data
                    imgModels.push(imgModel)
                })
            }
            const childModel = new Object()
            childModel.index = index
            childModel.value = imgModels
            this.imgModelsContainer.push(childModel)
        }

        return (
            <View key={index}>
                <View style={[styles.topView,{alignItems:"flex-end",height:30}]}>
                    <Text style={styles.title}>{obj.title}</Text>
                </View>
                <AddPhoto imgModels={imgModels} changePhoto={this.changePhoto.bind(this, index)}
                      navigator={this.props.navigator} selectImgQuality={this.selectImgQuality}/>
            </View>
        )
    }

    checkBoxView(obj, index) {
        var value = null
        if (typeof(this.submitData[index].value) != "undefined") {
            value = ""
            this.submitData[index].value.map(data => {
                value += (data.name + ",")
            })
            value = value.substring(0, value.length - 1)
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
                for (var i = 0; i < dataSource.length; i++) {
                    const obj = dataSource[i]
                    dialogData.push(obj.name)
                }
            }
        }
        var diaLogTableView = null
        switch(this.showDialogType) {
            case "select":
                diaLogTableView = <DialogoSelectTableView data={dialogData} closure={this.didClickedSelectDialogItem}/>
                break
            case "checkBox":
                diaLogTableView = <DialogoCheckTableView data={dialogData} closure={this.didClickedCheckBox}/>
                break
            case "imgQuality":
                diaLogTableView = <DialogoImgQualityTableView closure={this.didClickedImgQuality}/>
                break
            default:
        }

        return (
            <TouchableWithoutFeedback onPress={this.clickedSelf}>
                <View style={styles.containers}>
                    <CustomToolbar title="现场采集" navigator={this.props.navigator}/>
                    <View style={styles.topView}>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={styles.lineView}/>
                    <ScrollView style={styles.scrollView}>
                        {views}
                        <Button style={styles.saveButton} titleStyle={styles.saveTitle} title="保存"
                                onPress={this.didClickedSave}/>
                        <View style={{height: 10}}/>
                    </ScrollView>
                    <PopupDialog
                        ref={(popupDialog) => {
                            this.popupDialog = popupDialog;
                        }}
                        dialogTitle={<DialogTitle title="选择"/>}
                        width={250} height={300}
                    >
                        {diaLogTableView}

                    </PopupDialog>
                    {this.state.showLoading && <Loading/>}
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
        this.state = {otherImgPath: []}
        this.firstNotChange = true
        this.addOtherImg = this.addOtherImg.bind(this)
        this.takeOtherPhoto = this.takeOtherPhoto.bind(this)
        this.changeOtherImg = this.changeOtherImg.bind(this)
        this.backPaths = this.backPaths.bind(this)
        this.changePhoto = this.changePhoto.bind(this)
        this.takePhone = this.takePhone.bind(this)
        this.takeOtherPhoneExcute = this.takeOtherPhoneExcute.bind(this)
        this.changePhotoExcute = this.changePhotoExcute.bind(this)
        this.selectAddMethod = 0
    }

    componentDidMount() {
        var imgModels = this.props.imgModels
        if (imgModels.length == 0) {
            let imgModel = new Object()
            imgModel.local = ""
            imgModel.net = ""
            imgModels.push(imgModel)
        }
        this.setState({otherImgPath: this.props.imgModels})
    }

    takePhone(index) {
        if(this.selectAddMethod == 0) {
            this.takeOtherPhoneExcute(index)
        } else {
            this.changePhotoExcute(index)
        }
    }

    takeOtherPhoto() {
        this.selectAddMethod = 0
        const {selectImgQuality} = this.props
        selectImgQuality(this.takePhone)
    }

    takeOtherPhoneExcute(index) {
        var quality = 1.0
        switch(parseInt(index)) {
            case 0:
                quality = 0.3;
                break;
            case 1:
                quality = 0.6;
                break;
            case 2:
                quality = 1.0
                break
            default:
        }

        var options = {
            title: 'Select Avatar',
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "相册",
            quality: quality,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                this.addOtherImg(response.uri)
            }
        });
    }


    addOtherImg(path) {
        this.setState(prev => {
            var imgModel = newImgModel()
            imgModel.local = path
            prev.otherImgPath.push(imgModel)
            this.backPaths(prev.otherImgPath)
            return ({otherImgPath: prev.otherImgPath})
        })
    }

    changePhoto(index) {
        this.changeIndex = index
        this.selectAddMethod = 1
        const {selectImgQuality} = this.props
        selectImgQuality(this.takePhone)
    }

    changePhotoExcute(index) {
        var quality = 1.0
        switch(parseInt(index)) {
            case 0:
                quality = 0.3;
                break;
            case 1:
                quality = 0.6;
                break;
            case 2:
                quality = 1.0
                break
            default:
        }

        var options = {
            title: 'Select Avatar',
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "相册",
            quality: quality,

            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                this.changeOtherImg(response.uri)
            }
        });
    }

    changeOtherImg(path) {
        this.setState(prev => {
            prev.otherImgPath[this.changeIndex].local = path
            this.backPaths(prev.otherImgPath)

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
        const cells = this.state.otherImgPath.map((imgModel, index) => {
            var imgPath = ""
            var firstNotChange = true
            if (imgModel.local != "") {
                imgPath = imgModel.local
                firstNotChange = false
            } else if (imgModel.net != "") {
                imgPath = imgRootPath + imgModel.net
                firstNotChange = false
            }
            return (
                <AddPhotoCell key={index} path={imgPath} index={index} changePhoto={this.changePhoto}
                              firstNotChange={firstNotChange}/>)
        })

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
                        <Image style={cellImgStyle} source={imgPath}
                               defaultSource={{uri:"loadingImg"}}>
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
        if (indexs.length != 0) {
            closure(indexs)
        }
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

class DialogoImgQualityTableView extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {dataSource: ds.cloneWithRows(["质量低","质量中","原图"])}
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
        backgroundColor: "white"

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
        backgroundColor: "white"

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
        paddingLeft: 5,

    },
    topView: {
        flexDirection: "row",
        height: 30,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    title: {
        marginLeft: 40,
        color: CommonColor.defaultBlackColor,
        marginTop: 15,
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
        marginTop: 10
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
    },
    lineView: {
        alignSelf: "stretch",
        backgroundColor: CommonColor.defaultLineColor,
        height:1,
        marginTop: 15
    },
})

export default CollectionContent

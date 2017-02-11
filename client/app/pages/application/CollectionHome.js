import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableWithoutFeedback, Navigator, ListView,RefreshControl} from 'react-native'
import CustomToolbar from '../../components/CustomToolbar'
import CommonColor from '../../utils/CommonColor'
import CollectionCertificateContainer from '../../containers/CollectionCertificeContainer'
import {fetchEnterpriseList} from '../../actions/enterprise'
import Spanner from 'react-native-spinkit'

class CollectionHome extends Component {

    constructor(props) {
        super(props)
        this.datas = []
        this.page = 1
        this.loadMoreTime = 0;

        this.canLoadMore = false
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {dataSource: ds, selectedIndex: -1,isRefreshing:false,isLoadingMore: false}
        this.clickedCell = this.clickedCell.bind(this)
        this.rightTitleClicked = this.rightTitleClicked.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.fetchEnterprise = this.fetchEnterprise.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.renderFooter= this.renderFooter.bind(this)
    }

    onScroll () {
            canLoadMore = true;
    }

    onEndReached () {
        let time = Date.parse(new Date()) / 1000;
        if (this.canLoadMore && time - this.loadMoreTime > 1) {
            this.canLoadMore = false;
            this.loadMoreTime = Date.parse(new Date()) / 1000;
            this.page = this.page + 1
            this.setState({isLoadingMore: true})
            setTimeout(()=>this.fetchEnterprise(this.page),500)
        }
    }

    componentDidMount() {
        this.fetchEnterprise(1)
    }

    onRefresh() {
        this.state.isRefreshing = true
        this.page = 1
        this.canLoadMore = false
        this.fetchEnterprise(1)
    }


    fetchEnterprise(page) {
        this.page = page
        const {dispatch} = this.props

        dispatch(fetchEnterpriseList({page:page,page_limit:10},"iamsuperman:15828516285"))
    }

    clickedCell(index) {
        this.setState({selectedIndex: index})
        let newData = JSON.parse(JSON.stringify(this.datas));
        newData[index].selected = true
        this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newData)
            }
        )
    }

    rightTitleClicked() {
        if (this.state.selectedIndex != -1) {
            const {navigator} = this.props
            navigator.push({
                name: "CollectionCertificateContainer",
                component: CollectionCertificateContainer,
                params: {
                    company: this.datas[this.state.selectedIndex]
                }

            })
        }
    }

    renderFooter () {
        if (this.state.isLoadingMore) {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Spanner size={30} type='ThreeBounce' color='#c8c8c8'/>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        加载中…
                    </Text>
                </View>
            );

        }
        if (this.state.isLodingMore) {

            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Spanner size={30} type='ThreeBounce' color='#c8c8c8'/>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        加载中…
                    </Text>
                </View>
            );
        }
    }

    componentWillReceiveProps (nextProps) {
        this.state.isRefreshing = false
        this.setState({isLoadingMore: false})
        if(this.page == 1) {
            setTimeout(()=>this.canLoadMore=true,1000)
        } else {
            this.canLoadMore = true
        }
        const {enterpriseList} = nextProps
        if(enterpriseList.page_count > 0) {
           var netDatas = enterpriseList.enterprises
            netDatas = netDatas.map(data=>{
                data.selected = false
                return data
            })
            if(this.page == 1) {
             this.datas.splice(0,this.datas.length)
            }
            this.datas=this.datas.concat(netDatas)
            this.setState({dataSource:this.state.dataSource.cloneWithRows(this.datas)})
        } else {
            if(this.page != 1) {
                this.page = this.page - 1
                this.canLoadMore = false
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomToolbar title="现场采集" navigator={this.props.navigator} operate="选择"
                               onOperateClicked={this.rightTitleClicked}/>
                <Text style={styles.head}>选择采集公司</Text>
                <ListView dataSource={this.state.dataSource} style={styles.listView}
                          renderRow={(rowData, sectionID, rowID) =>
                              <CompanyCell data={rowData} clickClosure={this.clickedCell} rowID={rowID}/>
                          }
                          onEndReached={this.onEndReached}
                          onEndReachedThreshold={10}
                          onScroll={this.onScroll}
                          renderFooter={this.renderFooter}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this.onRefresh}
                                  tintColor="#ff0000"
                                  title="Loading..."
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor="#ffff00"
                              />
                          }
                />
            </View>
        )
    }
}

class CompanyCell extends Component {

    constructor(props) {
        super(props)
        this.clickedSelf = this.clickedSelf.bind(this)
    }

    clickedSelf() {
        const {rowID, clickClosure} = this.props
        clickClosure(rowID)
    }

    render() {
        const {data} = this.props
        var imgFile = null
        if (data.selected) {
            imgFile = require("../../img/radioS.png")
        } else {
            imgFile = require("../../img/radio.png")
        }
        return (
            <TouchableWithoutFeedback onPress={this.clickedSelf}>
                <View style={styles.cell}>
                    <Image source={imgFile} style={styles.cellImage}/>
                    <Text style={styles.cellTitle}>{data.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        alignSelf: "stretch",
        height: 45,
        paddingLeft: 50,
        lineHeight: 45,
        color: "black",
    },
    listView: {
        borderTopWidth: 1,
        borderTopColor: CommonColor.defaultLineColor,
        marginTop: 10,
        flex: 1,
    },
    cell: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    cellImage: {
        width: 13,
        height: 13,
        marginLeft: 60,
        marginTop: 1,
    },
    cellTitle: {
        marginLeft: 10,
        color: CommonColor.defaultBlackColor
    }
})

export default CollectionHome

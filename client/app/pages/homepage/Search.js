/**
 * Created by kiefer on 2017/2/3.
 */
import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import CustomToolbar from '../../components/CustomToolbar';
import ClaimContainer from '../../containers/ClaimContainer'
import {ToastShort} from '../../utils/ToastUtils';
import {fetchEnterpriseList} from '../../actions/home';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import BasePage from  '../BasePage'

class Search extends BasePage {
    constructor() {
        super()
        this.state = {
            enterprise:'测试1科技有限公司',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };

        this.renderItem = this.renderItem.bind(this);
        this.searchCompany = this.searchCompany.bind(this);
    }
    componentDidMount () {
        console.log(this.props);
    }

    componentWillReceiveProps (nextProps) {

    }

    componentWillUpdate(){
    }

    componentDidUpdate(){
    }

    searchCompany(){
        if(this.state.enterprise==''){
            ToastShort('请输入企业名称');
            return false;
        }
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchEnterpriseList({name:this.state.enterprise},this.props.auth.token));
        });
    }

    onPress (item) {
        const {navigator} = this.props;
        // console.log(item);
        let _this = this;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ClaimContainer,
                name: 'Claim',
                params: {
                    item: item,
                    //回调!从SecondPageComponent获取user
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
                    }
                },
            });
        });
    }


    renderItem (item) {
        return (
            <TouchableOpacity onPress={this.onPress.bind(this, item)}>
                <View style={styles.containerItem}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text>
                            {item.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }



    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="搜索"
                    navigator={navigator}/>
                    <View   style={styles.searchBar}>
                        <TextInput   onChangeText={(enterprise) => this.setState({enterprise})}
                                     value={this.state.enterprise} style = {styles.searchBarInput}
                                     placeholder='请输企业名称' underlineColorAndroid="transparent" />
                        <TouchableOpacity onPress={this.searchCompany}>
                        <View style={{marginLeft:10,paddingRight:10}}>
                            <Icon
                                name={'md-search'} size={30}
                                color={'#737373'}
                            /></View></TouchableOpacity>
                    </View>

                {this.props.search.enterprises.length >0?<ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.search.enterprises)}
                    renderRow={this.renderItem}
                />:<View></View>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: '#2133A7',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius:30,
        height: 40,
        marginLeft: 10,
        marginRight:10,
        marginTop:20
    },
    searchBarInput: {
        flex: 1,
        fontWeight: 'normal',
        color: '#9B9B9B',
        paddingLeft:10,
        backgroundColor: 'transparent',
        fontSize:14
    },
});

export default Search;

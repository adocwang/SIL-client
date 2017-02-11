/**
 * Created by kiefer on 2017/2/11.
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
import EnterpriseDetailContainer from '../../containers/enterprise/EnterpriseDetailContainer'
import {ToastShort} from '../../utils/ToastUtils';
import {fetchEnterpriseList} from '../../actions/home';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading'
import BasePage from  '../BasePage'

class GuQuanJieGou extends BasePage {
    constructor(props) {
        super(props)
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
        this.state.dataSource= new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
            this.renderItem = this.renderItem.bind(this);

        this.renderItem = this.renderItem.bind(this);
    }


    renderItem (item) {
        return (
            <View style={styles.item}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.itemTextBlack}>
                        姓名:
                    </Text>
                    <Text style={styles.itemTextBlack}>
                        {item.name}
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.itemTextGray}>
                        股权类型:
                    </Text>
                    <Text style={styles.itemTextGray}>
                        {item.stock_type}
                    </Text>
                </View>
            </View>
        );
    }


    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="股权结构"
                    navigator={navigator}/>

                <View style={{flex:1}}>
                    <ListView
                        style={styles.listView}
                        dataSource={this.state.dataSource.cloneWithRows(this.state.info.partners)}
                        renderRow={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
    listView: {
        flex: 1,//可拉伸
        backgroundColor:'#f2f2f2'
    },
    item:{
        flex: 1,
        flexDirection: 'column',
        height:60,

        marginBottom: 2,
        backgroundColor:'#ffffff',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20
    },
    itemTextBlack:{
        color:'#4a4a4a',
        fontSize:14
    },
    itemTextGray:{
        color:'#9b9b9b',
        fontSize:14,
        marginTop:5
    },

});

export default GuQuanJieGou;
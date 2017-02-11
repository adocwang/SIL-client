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
import { Col, Row, Grid } from "react-native-easy-grid";

class ChangeRecord extends BasePage {
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
                        变更内容:
                    </Text>
                    <Text style={styles.itemTextBlack}>
                        {item.change_item}
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.itemTextGray}>
                        变更时间:
                    </Text>
                    <Text style={styles.itemTextGray}>
                        {item.change_date}
                    </Text>
                </View>
                <Grid style={styles.gridContainer}>
                    <Col>
                        <View>
                            <Text style={styles.grid_text_black}>变更前</Text>
                            <Text style={styles.grid_text_gray}>{item.before_content}</Text>
                        </View>
                    </Col>
                    <View style={styles.col_divider}/>
                    <Col>
                        <View>
                            <Text style={styles.grid_text_black}>变更后</Text>
                            <Text style={styles.grid_text_gray}>{item.after_content}</Text>
                        </View>
                    </Col>
                </Grid>
            </View>
        );
    }


    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="变更记录"
                    navigator={navigator}/>

                <View style={{flex:1}}>
                    <ListView
                        style={styles.listView}
                        dataSource={this.state.dataSource.cloneWithRows(this.state.info.changerecords)}
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
    gridContainer:{
        backgroundColor:'#ffffff',
        justifyContent:'center',
        paddingTop:15,
        paddingBottom:15
    },grid_text_black:{
        fontSize:14,
        color:'#4a4a4a'
    },
    grid_text_gray:{
        fontSize:12,
        color:'#9b9b9b',
        paddingTop:6
    },
    col_divider:{
        backgroundColor:'#DFDFDF',
        width:1,
        marginLeft:5,
        marginRight:20
    },

});

export default ChangeRecord;
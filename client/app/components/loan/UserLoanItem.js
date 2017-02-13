/**
 * Created by kiefer on 2017/2/10.
 */

'use strict';
import React , { PropTypes }from 'react'
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {GapYear} from '../../utils/CommonUtils'

const propTypes = {
    onClicked: PropTypes.func,
}

class UserLoanItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>this.props.onClicked()}>
                <View style={styles.containerItem}>
                    <View style={styles.imgContainer}>
                    <Image
                        style={styles.img}
                        source={require('../../img/default.png')}
                    /></View>
                    <View style={styles.content}>
                        <View style={styles.catContainer}>
                            <Text style={styles.title}>
                                {this.props.name}
                            </Text>

                        </View>
                        <Text style={styles.desc}>
                            {this.props.legal_man&&(this.props.legal_man + ' | ')}{this.props.regist_capi&&(this.props.regist_capi + ' | ')}
                            成立{GapYear(this.props.start) > 0 ? GapYear(this.props.start) : '不到1'}年
                        </Text>

                        <Text style={styles.cat}>
                            {this.props.address}
                        </Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

let styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 7,
        height: 100,
        paddingLeft: 20,
        marginLeft:20,
        marginRight:20,
        marginTop:5
    },
    imgContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    img: {
        width: 50,
        height: 50,
        borderColor:'#B5B5B5',     //边框颜色
        borderWidth:1, //边框宽度
        borderRadius:15  //边框圆角
    },
    content: {
        flex: 7,
        flexDirection: 'column',
        paddingLeft: 15,
        alignSelf:'center'
    },
    title: {
        color: '#4A4A4A',
        fontSize: 16,
    },
    desc: {
        color: '#9B9B9B',
        fontSize: 14,
        paddingTop: 3
    },
    cat: {
        color: '#4A4A4A',
        fontSize: 12,
        paddingTop:3
    },
    red_text: {
        color: '#F21B35',
        fontSize: 12
    },
    status: {
        color: '#ffffff',
        fontSize: 12,
    },
    catContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        alignItems: 'center'

    }
});

export default UserLoanItem;
/**
 * Created by kiefer on 2017/2/8.
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

const propTypes = {
    onClicked: PropTypes.func,
}

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        var icon ;
        switch (this.props.type){
            case 1:
                if(this.props.read){
                    icon= require('../../img/tips_read.png');
                }else {
                    icon= require('../../img/tips_unread.png');
                }
                break;
            case 2:
                if(this.props.read){
                    icon= require('../../img/msg_read.png');
                }else {
                    icon= require('../../img/msg_unread.png');
                }
                break
            default:
                if(this.props.read){
                    icon= require('../../img/tips_read.png');
                }else {
                    icon= require('../../img/tips_unread.png');
                }
        }
        return(
            <TouchableOpacity onPress={()=>this.props.onClicked()}>
                <View style={styles.containerItem}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={styles.img}
                            source={icon}
                        />
                        </View>
                    <View style={styles.content}>
                        <View style={styles.catContainer}>
                            <Text style={styles.title}>
                                {this.props.title}
                            </Text>

                            <Text style={styles.desc}>
                                {this.props.createTime}
                            </Text>
                        </View>
                        <Text style={styles.desc}>
                            {this.props.desc}
                        </Text>
                        <View style={styles.divider}/>
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
        height:80,
        paddingLeft:20
    },
    imgContainer:{
        flex:1,
        alignItems:'center'
    },
    img:{
        width: 25,
        height: 25,
    },
    content:{
        flex: 7,
        flexDirection: 'column',
        paddingLeft:10,
    },
    title:{
        color:'#4A4A4A',
        fontSize:16,
    },
    desc:{
        color:'#9B9B9B',
        fontSize:14,
        marginTop:10,
    },
    cat:{
        color:'#4A4A4A',
        fontSize:14,
        paddingTop:5
    },
    status:{
        color:'#ffffff',
        fontSize:14,
    },
    red_text:{
        color:'#F21B35',
        fontSize:12
    },
    catContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:10,
        alignItems:'center',

    },
    divider:{
        height:1,
        backgroundColor:'#DFDFDF',
        marginTop:10,
    }
});

export default MessageItem;
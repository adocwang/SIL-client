/**
 * Created by kiefer on 2017/2/5.
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

class CompanyInfoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <TouchableOpacity onPress={()=>this.props.onClicked()}>
                <View style={styles.containerItem}>
                    <Image
                        style={styles.img}
                        source={{uri: this.props.img}}
                    />
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.desc}>
                            {this.props.desc}
                        </Text>
                        <View style={styles.catContainer}>
                                <Text style={styles.cat}>
                                    {this.props.cat}
                                </Text>
                            {this.props.status &&  <View style={styles.statusContainer}>
                                <Text style={styles.status}>
                                {this.props.status}
                                </Text>
                                </View>}

                        </View>

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
        marginBottom:2,
        height:120,
        paddingLeft:20
    },
    img:{
        flex:1,
        width: 40,
        height: 40,
    },
    content:{
        flex: 7,
        flexDirection: 'column',
        paddingLeft:10,
        paddingTop:5
    },
    title:{
        color:'#4A4A4A',
        fontSize:16,
        paddingTop:5
    },
    desc:{
        color:'#9B9B9B',
        fontSize:14,
        paddingTop:3
    },
    cat:{
        color:'#4A4A4A',
        fontSize:12,
    },
    statusContainer:{
        backgroundColor:'#7ED321',
        borderRadius:10,
        justifyContent:'center',
        height:20,
        width:60,
        alignItems:'center'
    },
    status:{
        color:'#ffffff',
        fontSize:12,
    },
    catContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:5,
        paddingRight:10,
        alignItems:'center'

    }
});

export default CompanyInfoItem;
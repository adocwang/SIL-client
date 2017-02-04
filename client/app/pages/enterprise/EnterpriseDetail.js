/**
 * Created by kiefer on 2017/2/4.
 */
/**
 * Created by kiefer on 2017/1/25.
 */
import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    Button,
    ScrollView,
    View
} from 'react-native';
import CustomToolbar from '../../components/CustomToolbar'
import Bar from '../../components/BarCollapsible'


class Claim extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = this.props.route.params
        }
    }

    componentDidMount() {

    }


    render() {
        const {navigator} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <View style={{alignItems:'center',height:160}}>
                <CustomToolbar
                    title="公司信息"
                    navigator={navigator}/>
                <Image
                    style={styles.logo}
                    source={{uri: 'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg'}}
                />
                </View>
                <Text style={styles.name}>深圳市英威诺科技有限公司</Text>
                <Text style={styles.desc}>唐欣 | ¥2000.00万 | 成立5-10年</Text>
                <Text style={styles.cat}>互联网   信息技术  >></Text>
                </View>
                <Bar
                    title='My title'
                    collapsible={true}
                    iconCollapsed='chevron-thin-right'
                    iconOpened='chevron-thin-down'
                    style={styles.bar}
                    titleStyle={styles.bar_title}
                >
                   <Text>sahjdjahsd</Text>
                </Bar>

            </View>


        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#EBEAEA',
    },
    header: {
        backgroundColor: '#ffffff',
        paddingBottom:10
    },
    logo:{
        width: 80,
        height: 80,
        bottom: 40,
        borderRadius:44,
        position:'relative'
    },
    name:{
        fontSize:16,
        color:'#4A4A4A',
        alignSelf:'center',
    },
    desc:{
        fontSize:14,
        color:'#9B9B9B',
        alignSelf:'center',
        marginTop:5
    },
    cat:{
        fontSize:12,
        color:'#4a4a4a',
        alignSelf:'center',
        marginTop:5
    },
    bar:{
        height:38,
        backgroundColor:'#ffffff'
    },
    bar_title:{
        fontSize:14,
        color:'#4a4a4a'
    }



});

export default Claim;
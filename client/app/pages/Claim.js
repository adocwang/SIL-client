/**
 * Created by kiefer on 2017/1/25.
 */
import React from 'react';
import {fetchTest} from '../actions/test';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Linking,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import CustomToolbar from '../components/CustomToolbar'

class Claim extends React.Component {
    constructor (props) {
        super(props);
        if(this.props.route.params){
            this.state =this.props.route.params
        }
    }

    componentDidMount () {
        // const {dispatch} = this.props;
        // dispatch(fetchTest());
        // InteractionManager.runAfterInteractions(() => {
        //     dispatch(fetchTest());
        // });
        console.log(this.props)
    }

    onClaimBtnClick(){

    }

    onDistributeBtnClick(){

    }

    render () {
        const {navigator} = this.props;

        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="认领"
                    navigator={navigator}/>
                <View style={styles.containerItem}>
                    <Image
                        style={{width: 88, height: 88, marginRight: 10,borderRadius:44}}
                        source={{uri: this.state.item.img}}
                    />
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.title}>
                            {this.state.item.title}
                        </Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{flex: 1, fontSize: 14, color: '#ff0000', marginTop: 5, marginRight: 5}}>
                                    {this.state.item.desc}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerOption}>
                    <TouchableOpacity onPress={this.onClaimBtnClick.bind(this)}>
                        <View style={styles.buttonview} >
                            <Text style={styles.btntext} >认领</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onDistributeBtnClick.bind(this)}>
                        <View style={styles.buttonview} >
                            <Text style={styles.btntext} >分配</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    containerOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonview: {
        flexDirection: 'row',
        margin: 10,
        width:120,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#15499A',
        borderWidth: 1,
    },
    btntext: {
        alignSelf:'center',
        fontSize: 17,
        color: '#15499A',
        marginTop: 10,
        marginBottom: 10,
    },

});

export default Claim;
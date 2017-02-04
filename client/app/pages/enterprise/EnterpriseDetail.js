/**
 * Created by kiefer on 2017/2/4.
 */
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
    Button,
    ScrollView,
    View
} from 'react-native';
import CustomToolbar from '../components/CustomToolbar'



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
                <CustomToolbar
                    title="公司信息"
                    navigator={navigator}/>

            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },


});

export default Claim;
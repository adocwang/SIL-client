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
    View
} from 'react-native';
import CustomToolbar from '../components/CustomToolbar'

class Claim extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // const {dispatch} = this.props;
        // dispatch(fetchTest());
        // InteractionManager.runAfterInteractions(() => {
        //     dispatch(fetchTest());
        // });
        console.log(this.props)
    }


    render () {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <CustomToolbar
                    title="认领"
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
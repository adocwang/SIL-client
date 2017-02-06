/**
 * Created by kiefer on 2017/2/1.
 */
import React from 'react';
import CustomToolbar from '../../components/CustomToolbar';
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
import * as Color from '../../utils/CommonColor';

export default class AccountManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {user: {}}
    }

    render(){
        const {auth} = this.props
        console.log(auth.true_name)
        return (
            <View style={styles.container}>
                <CustomToolbar title="账户管理" navigator={this.props.navigator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.defaultBgColor,
    }
})



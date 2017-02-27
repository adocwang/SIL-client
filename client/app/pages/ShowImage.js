/**
 * Created by zhangyong on 2017/2/27.
 */
import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    RefreshControl,
    TouchableOpacity,
    ProgressBarAndroid,
    InteractionManager
} from 'react-native';
import CustomToolbar from '../components/CustomToolbar'
import Gallery from 'react-native-gallery';

export default class ShowImageGallery extends React.Component {

    constructor(props) {
        super(props)
        this.back = this.back.bind(this)
    }

    back() {
        const {navigator} = this.props
        navigator.pop()
    }

    render() {
        const imgs = this.props.route.params.imgs
        console.log(imgs)
        return (
            <View style={styles.containers}>
                <TouchableOpacity onPress={this.back}>
                <Image
                    style={styles.backArrow}
                    source={{uri:"back_arrow_white"}}
                />
                </TouchableOpacity>
                <Gallery
                    style={{flex: 1, backgroundColor: 'black',marginTop: 15}}
                    images={imgs}
                >
                </Gallery>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: "black"
    },
    backArrow: {
        width: 10,
        height: 17,
        marginLeft: 15,
        marginTop: 30
    }
})


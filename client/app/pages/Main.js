/**
 * Created by kiefer on 2017/1/22.
 */
import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    ScrollView,
    InteractionManager
} from 'react-native';
import ScrollableTabView , {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import MainTabBar from '../components/MainTabBar';

class Main extends React.Component {
    constructor() {
        super()

    }


    render () {
        return (
            <ScrollableTabView
                style={{marginTop: 20, }}
                initialPage={1}
                tabBarPosition="bottom"
                renderTabBar={() => <MainTabBar />}
            >
                <ScrollView tabLabel="ios-home" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>News</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="ios-stats" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Friends</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="ios-grid" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Messenger</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="ios-person" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Notifications</Text>
                    </View>
                </ScrollView>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});

export default Main;
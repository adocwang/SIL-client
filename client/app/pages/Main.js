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
import CustomToolbar from '../components/CustomToolbar';
import SearchBar from '../components/SearchBar';

class Main extends React.Component {
    constructor() {
        super()

    }

    searchCompany(){
        console.log('search');
    }

    render () {
        return (
            <View style={styles.container}>
                <Image source={require('../img/toolbar_bg.png')}  style={{height:100,  flexDirection: 'row', resizeMode: Image.resizeMode.stretch}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start',justifyContent: 'center',marginLeft:26,marginRight:26}}>
                    <Image
                        style={{ width: 28, height: 28,marginTop:25}}
                        source={require('../img/default_avatar.png')}
                    />
                        <Text  style={{fontSize: 14, color: '#ffffff',marginTop:30,marginLeft:10}}>您好,唐万兵</Text>
                    </View>
                </Image>

            <ScrollableTabView
                style={{marginTop: 20, }}
                initialPage={0}
                tabBarPosition="bottom"
                renderTabBar={() => <MainTabBar />}
            >

                <ScrollView tabLabel="ios-home" style={styles.tabView}>
                    <SearchBar
                        onSearchChange={() => console.log('On Focus')}
                        onSearch={this.searchCompany.bind(this)}
                        height={30}
                        onFocus={() => console.log('On Focus')}
                        onBlur={() => console.log('On Blur')}
                        placeholder={'Search...'}
                        autoCorrect={false}
                        padding={3}
                        returnKeyType={'search'}
                    />
                </ScrollView>
                <ScrollView tabLabel="ios-stats" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>企业</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="ios-grid" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>应用</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="ios-person" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>我的</Text>
                    </View>
                </ScrollView>
            </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        backgroundColor: '#FFFFFF',
    },
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
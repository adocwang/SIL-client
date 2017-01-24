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
    ListView,
    RefreshControl,
    InteractionManager
} from 'react-native';
import ScrollableTabView , {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import MainTabBar from '../components/MainTabBar';
import CustomToolbar from '../components/CustomToolbar';
import CustomTabBar from '../components/CustomTabBar';
import SearchBar from '../components/SearchBar';
import TabNavigator from '../components/bottomtabbar/TabNavigator';
import LoadingView from '../components/LoadingView';


class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedTab:'home'
        }
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

                <TabNavigator  style={{marginTop: 20, }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="主页"
                        renderIcon={() => <Image source={require("../img/home_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/home_icon.png")} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'home' })}>
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

                            <ScrollableTabView
                                style={{marginTop: 20}}
                                renderTabBar={() => <CustomTabBar />}
                            >
                                <View tabLabel='新增企业' style={styles.card}>
                                    <Text style={{color:'#ff0000',fontSize:16}}>新增企业</Text>
                                </View>
                                <View tabLabel='风险信息' style={styles.card}>
                                    <Text>风险信息</Text>
                                </View>
                                <View tabLabel='融资资讯' style={styles.card}>
                                    <Text>融资资讯</Text>
                                </View>
                            </ScrollableTabView>

                        </ScrollView>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'company'}
                        title="我的企业"
                        renderIcon={() => <Image source={require("../img/company_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/company_icon.png")} />}
                        //renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'company' })}>
                        <Text>profile</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'app'}
                        title="应用"
                        renderIcon={() => <Image source={require("../img/app_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/app_icon.png")} />}
                        //renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'app' })}>
                        <Text>profile</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'person'}
                        title="我的"
                        renderIcon={() => <Image source={require("../img/person_icon_d.png")} />}
                        renderSelectedIcon={() => <Image source={require("../img/person_icon.png")} />}
                        //renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'person' })}>
                        <Text>profile</Text>
                    </TabNavigator.Item>
                </TabNavigator>
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
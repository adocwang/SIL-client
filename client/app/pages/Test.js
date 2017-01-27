/**
 * Created by kiefer on 2017/1/24.
 */
import TabNavigator from '../components/bottomtabbar/TabNavigator';
import React from 'react';
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

class Test extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedTab:'home'
        }
    }
    componentDidMount () {
        console.log(this.props)
    }

    render () {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="主页"
                    renderIcon={() => <Image source={require("../img/home_icon_d.png")} />}
                    renderSelectedIcon={() => <Image source={require("../img/home_icon.png")} />}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <Text>Home</Text>
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
        );
    }
}



export default Test;
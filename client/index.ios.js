import React, { Component } from 'react';
import {
  AppRegistry,
  View,
	Text,
} from 'react-native';

export default class RootController extends Component {
	render() {
		return (
			<View><Text>root................</Text></View>
		);
	}
}

AppRegistry.registerComponent('SiliconValleyBank', () => RootController);

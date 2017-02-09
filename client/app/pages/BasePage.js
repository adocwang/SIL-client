/**
 * Created by kiefer on 2017/2/9.
 */
import React, { Component } from 'react';
import LoginContainer from '../containers/LoginContainer'

export default class BasePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps (nextProps) {
        const {navigator} = nextProps;
        const {auth} = nextProps;
        if(navigator && auth && auth.id==0){
            // 删除单个数据
            storage.remove({
                key: 'user'
            });
            navigator.resetTo({
                component: LoginContainer,
                name: 'Login'
            });
        }
    }

}
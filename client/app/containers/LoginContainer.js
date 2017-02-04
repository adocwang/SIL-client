/**
 * Created by kiefer on 2017/1/22.
 */
'use strict';

import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Login from '../pages/auth/Login';

class LoginContainer extends Component {
    render () {
        return (
            <Login {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(LoginContainer);
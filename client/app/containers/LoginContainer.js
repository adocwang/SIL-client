/**
 * Created by kiefer on 2017/1/22.
 */
'use strict';

import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Login from '../pages/Login';

class LoginContainer extends Component {
    render () {
        return (
            <Login {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {test} = state;
    return {
        test
    }
}

export default connect(mapStateToProps)(LoginContainer);
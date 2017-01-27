/**
 * Created by kiefer on 2017/1/24.
 */

'use strict';

import React ,{Component}from 'react';

import {connect} from 'react-redux';

import ResetPwd from '../pages/ResetPwd';

class ResetPwdContainer extends Component {
    render () {
        return (
            <ResetPwd {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {localUser} = state;
    return {
        localUser
    }
}

export default connect(mapStateToProps)(ResetPwdContainer);
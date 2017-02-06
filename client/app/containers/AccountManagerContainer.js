/**
 * Created by kiefer on 2017/2/1.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import AccountManager from '../pages/mine/AccountManager';

class AccountManagerContainer extends Component {
    render () {
        return (
            <AccountManager {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(AccountManagerContainer);
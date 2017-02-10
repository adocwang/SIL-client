/**
 * Created by kiefer on 2017/2/3.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import UserEnterprise from '../pages/UserLoan';

class UserEnterpriseContainer extends Component {
    render () {
        return (
            <UserEnterprise {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {userloan,auth} = state;
    return {
        userloan,
        auth
    }
}

export default connect(mapStateToProps)(UserEnterpriseContainer);
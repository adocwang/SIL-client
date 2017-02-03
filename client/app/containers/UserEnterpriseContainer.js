/**
 * Created by kiefer on 2017/2/3.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import UserEnterprise from '../pages/UserEnterprise';

class UserEnterpriseContainer extends Component {
    render () {
        return (
            <UserEnterprise {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {userenterprise} = state;
    return {
        userenterprise
    }
}

export default connect(mapStateToProps)(UserEnterpriseContainer);
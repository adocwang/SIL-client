/**
 * Created by kiefer on 2017/2/4.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import EnterpriseDetail from '../../pages/enterprise/EnterpriseDetail';

class EnterpriseDetailContainer extends Component {
    render () {
        return (
            <EnterpriseDetail {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(EnterpriseDetailContainer);
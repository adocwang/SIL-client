/**
 * Created by kiefer on 2017/1/25.
 */
/**
 * Created by kiefer on 2017/1/24.
 */

'use strict';

import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Claim from '../pages/homepage/Claim';

class ClaimContainer extends Component {
    render () {
        return (
            <Claim {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {localUser} = state;
    return {
        localUser
    }
}

export default connect(mapStateToProps)(ClaimContainer);
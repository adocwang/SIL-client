/**
 * Created by kiefer on 2017/1/30.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Distribute from '../pages/Distribute';

class DistributeContainer extends Component {
    render () {
        return (
            <Distribute {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {localUser} = state;
    return {
        localUser
    }
}

export default connect(mapStateToProps)(DistributeContainer);
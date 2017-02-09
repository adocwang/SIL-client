/**
 * Created by kiefer on 2017/1/30.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Distribute from '../pages/homepage/Distribute';

class DistributeContainer extends Component {
    render () {
        return (
            <Distribute {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth,claimdistribute} = state;
    return {
        auth,claimdistribute
    }
}

export default connect(mapStateToProps)(DistributeContainer);
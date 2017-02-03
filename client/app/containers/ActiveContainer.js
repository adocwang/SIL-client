/**
 * Created by kiefer on 2017/2/1.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Active from '../pages/Active';

class ActiveContainer extends Component {
    render () {
        return (
            <Active {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(ActiveContainer);
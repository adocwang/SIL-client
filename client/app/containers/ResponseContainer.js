/**
 * Created by kiefer on 2017/2/16.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Response from '../pages/application/Response';

class ResponseContainer extends Component {
    render () {
        return (
            <Response {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {response,auth} = state;
    return {
        response,
        auth
    }
}

export default connect(mapStateToProps)(ResponseContainer);
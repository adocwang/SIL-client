/**
 * Created by kiefer on 2017/2/7.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Message from '../pages/Message';

class MessageContainer extends Component {
    render () {
        return (
            <Message {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {message} = state;
    return {
        message
    }
}

export default connect(mapStateToProps)(MessageContainer);
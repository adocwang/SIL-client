/**
 * Created by kiefer on 2017/2/1.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Person from '../pages/mine/Person';

class PersonContainer extends Component {
    render () {
        return (
            <Person {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth,message} = state;
    return {
        auth,
        message
    }
}

export default connect(mapStateToProps)(PersonContainer);
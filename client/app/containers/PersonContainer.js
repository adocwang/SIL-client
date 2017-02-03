/**
 * Created by kiefer on 2017/2/1.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Person from '../pages/Person';

class PersonContainer extends Component {
    render () {
        return (
            <Person {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(PersonContainer);
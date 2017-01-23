/**
 * Created by kiefer on 2017/1/22.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Main from '../pages/Main';

class MainContainer extends Component {
    render () {
        return (
            <Main {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {test} = state;
    return {
        test
    }
}

export default connect(mapStateToProps)(MainContainer);
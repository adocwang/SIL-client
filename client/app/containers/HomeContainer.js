/**
 * Created by kiefer on 2017/1/31.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Home from '../pages/homepage/Home';

class MainContainer extends Component {
    render () {
        return (
            <Home {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {home} = state;
    return {
        home
    }
}

export default connect(mapStateToProps)(MainContainer);
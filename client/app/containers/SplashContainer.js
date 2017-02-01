/**
 * Created by kiefer on 2017/2/1.
 */
'use strict';

import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Splash from '../pages/splash';

class SplashContainer extends Component {
    render () {
        return (
            <Splash {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(SplashContainer);
/**
 * Created by kiefer on 2017/2/3.
 */
'use strict';

import React ,{Component}from 'react';

import {connect} from 'react-redux';

import Search from '../pages/Search';

class SearchContainer extends Component {
    render () {
        return (
            <Search {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const { auth,search} = state;
    return {
        auth,
        search
    }
}

export default connect(mapStateToProps)(SearchContainer);
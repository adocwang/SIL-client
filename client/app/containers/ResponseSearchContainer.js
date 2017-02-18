/**
 * Created by kiefer on 2017/2/17.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import ResponseSearch from '../pages/application/ResponseSearch';

class ResponseSearchContainer extends Component {
    render () {
        return (
            <ResponseSearch {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {responsesearch,auth} = state;
    return {
        responsesearch,
        auth
    }
}

export default connect(mapStateToProps)(ResponseSearchContainer);
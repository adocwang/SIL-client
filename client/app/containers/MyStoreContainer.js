/**
 * Created by kiefer on 2017/2/1.
 */
import React ,{Component}from 'react';

import {connect} from 'react-redux';

import MyStore from '../pages/mine/MyStore';

class MyStoreContainer extends Component {
    render () {
        return (
            <MyStore {...this.props} />
        );
    }
}

function mapStateToProps (state) {
    const {auth} = state;
    return {
        auth
    }
}

export default connect(mapStateToProps)(MyStoreContainer);
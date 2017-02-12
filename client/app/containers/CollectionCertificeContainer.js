'user strict'
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CollectionCertifice from '../pages/application/CollectionCertificate.js'

class CollectionContainer extends Component {
    render() {
        return (
            <CollectionCertifice {...this.props}/>
        );
    }
}

function mapStateToProps (state) {
    const {collection,auth,commonNet,enterprise,findingEnterprise} = state;
    return {
        collection,auth,commonNet,enterprise,findingEnterprise
    }
}

export default connect(mapStateToProps)(CollectionContainer);

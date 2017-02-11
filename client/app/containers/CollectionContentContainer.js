'user strict'
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CollectionContent from '../pages/application/CollectionContent'

class CollectionContentContainerContainer extends Component {
    render() {
        return (
            <CollectionContent {...this.props}/>
        );
    }
}

function mapStateToProps (state) {
    const {uploadImg,auth} = state;
    return {
        uploadImg,auth
    }
}

export default connect(mapStateToProps)(CollectionContentContainerContainer);

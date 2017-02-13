'user strict'
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CollectionHome from '../pages/application/CollectionHome.js'

class CollectionContainer extends Component {
  render() {
    return (
      <CollectionHome {...this.props}/>
    );
  }
}

function mapStateToProps (state) {
    const {enterpriseList2,auth} = state;
    return {
        enterpriseList2,auth
    }
}

export default connect(mapStateToProps)(CollectionContainer);

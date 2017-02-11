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
    const {enterpriseList,auth} = state;
    return {
        enterpriseList,auth
    }
}

export default connect(mapStateToProps)(CollectionContainer);

'user strict'
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CollectionHome from '../pages/CollectionHome.js'

class CollectionContainer extends Component {
  render() {
    return (
      <CollectionHome {...this.props}/>
    );
  }
}

function mapStateToProps (state) {
    console.log(state);
    const {collection} = state;
    return {
        collection
    }
}

export default connect(mapStateToProps)(CollectionContainer);

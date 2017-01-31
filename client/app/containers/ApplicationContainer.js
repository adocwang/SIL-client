'user strict'
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Application from '../pages/Application.js'

class ApplicationContainer extends Component {
  render() {
    return (
      <Application {...this.props}/>
    );
  }
}

function mapStateToProps (state) {
    const {appliaction} = state;
    return {
        appliaction
    }
}

export default connect(mapStateToProps)(ApplicationContainer);

'user strict'
import React,{Component} from 'react';
import {connect} from 'react-redux';
import LoanCalculator from '../pages/application/LoanCalculator.js'

class LoanCalculatorContainer extends Component {
  render() {
    return (
      <LoanCalculator {...this.props}/>
    );
  }
}

function mapStateToProps (state) {
    const {loanCalculator} = state;
    return {
        loanCalculator
    }
}

export default connect(mapStateToProps)(LoanCalculatorContainer);

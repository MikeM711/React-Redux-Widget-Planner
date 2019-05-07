import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultTotal extends Component {

  render() {
    const { userHistTotal } = this.props
 
    const historyDisplay =
      (
        <div className="total-user-result">
          <p className="center">{userHistTotal.alum} | Aluminum</p>
          <p className="center">{userHistTotal.crSteel} | Cold Rolled Steel</p>
          <p className="center">{userHistTotal.galv} | Galvanneal</p>
          <p className="center">{userHistTotal.glass} | Glass</p>
          <p className="center">{userHistTotal.sSteel} | Stainless Steel</p>
        </div>
      )

    return (
      <div className="calculator-total-result">
        <h5 className="center purple-text">Total Component</h5>
        <div className="collection">
          {historyDisplay}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userHistTotal: state.widgetRed.userHistTotal
  }
}

export default connect(mapStateToProps)(ResultTotal);

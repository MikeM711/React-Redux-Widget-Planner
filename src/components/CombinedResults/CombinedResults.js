import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCompleteHistory } from '../../reducers/rootReducer'

class CombinedResults extends Component {

  // Function makes all products rounded 2 decimal places
  rounding2Dec = (number) => {
    return Math.ceil(number * 100) / 100
  }

  render() {

    // Initialize the sum of materials in the history
    let sumHistory = {
      alum: 0,
      crSteel: 0,
      galv: 0,
      glass: 0,
      sSteel: 0,
    }

    // Sum all materialize by type inside sumHistory object
    this.props.completeHistory.forEach(singleHis => {
      sumHistory.alum += singleHis.alum
      sumHistory.crSteel += singleHis.crSteel
      sumHistory.galv += singleHis.galv
      sumHistory.glass += singleHis.glass
      sumHistory.sSteel += singleHis.sSteel
    })

    // Force sum of materials to 2 Decimal Places
    sumHistory.alum = this.rounding2Dec(sumHistory.alum)
    sumHistory.crSteel = this.rounding2Dec(sumHistory.crSteel)
    sumHistory.galv = this.rounding2Dec(sumHistory.galv)
    sumHistory.glass = this.rounding2Dec(sumHistory.glass)
    sumHistory.sSteel = this.rounding2Dec(sumHistory.sSteel)

    console.log(sumHistory)

    // History Display
    const historyDisplay =
      (
        <div className="combined-collection-item">
          <p className="center">{sumHistory.alum} | Aluminum</p>
          <p className="center">{sumHistory.crSteel} | Cold Rolled Steel</p>
          <p className="center">{sumHistory.galv} | Galvanneal</p>
          <p className="center">{sumHistory.glass} | Glass</p>
          <p className="center">{sumHistory.sSteel} | Stainless Steel</p>
        </div>
      )

    return (
      <div className="calculator-combined-results">
        <h5 className="center purple-text">CombinedResults Component</h5>
        <div className="collection">
          {historyDisplay}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    completeHistory: selectCompleteHistory(state)
  }
}

export default connect(mapStateToProps)(CombinedResults);
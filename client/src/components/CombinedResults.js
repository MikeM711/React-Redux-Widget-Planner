import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCompleteHistory } from '../reducers/rootReducer'

class CombinedResults extends Component {

  // Function makes all 
  rounding2Dec = (number) => {
    return Math.ceil(number * 100)/100
  }

  render() {
    
    // Initialize the sum of materials in the history
    let sumHistory = {
      _14GA_CR_120x60: 0,
      _16GA_CR_120x48: 0,
      _16GA_CR_120x60: 0,
      _18GA_CR_120x48: 0,
      _18GA_CR_120x60: 0,
      _20GA_CR_120x48: 0,
      _14GA_AL_120x60: 0,
    }

    // Sum all materialize by type inside sumHistory object
    this.props.completeHistory.forEach(singleHis => {
      sumHistory._14GA_CR_120x60 += singleHis._14GA_CR_120x60
      sumHistory._16GA_CR_120x48 += singleHis._16GA_CR_120x48
      sumHistory._16GA_CR_120x60 += singleHis._16GA_CR_120x60
      sumHistory._18GA_CR_120x48 += singleHis._18GA_CR_120x48
      sumHistory._18GA_CR_120x60 += singleHis._18GA_CR_120x60
      sumHistory._20GA_CR_120x48 += singleHis._20GA_CR_120x48
      sumHistory._14GA_AL_120x60 += singleHis._14GA_AL_120x60
            
    })

    // Force sum of materials to 2 Decimal Places
    sumHistory._14GA_CR_120x60 = this.rounding2Dec(sumHistory._14GA_CR_120x60)
    sumHistory._16GA_CR_120x48 = this.rounding2Dec(sumHistory._16GA_CR_120x48)
    sumHistory._16GA_CR_120x60 = this.rounding2Dec(sumHistory._16GA_CR_120x60)
    sumHistory._18GA_CR_120x48 = this.rounding2Dec(sumHistory._18GA_CR_120x48)
    sumHistory._18GA_CR_120x60 = this.rounding2Dec(sumHistory._18GA_CR_120x60)
    sumHistory._20GA_CR_120x48 = this.rounding2Dec(sumHistory._20GA_CR_120x48)
    sumHistory._14GA_AL_120x60 = this.rounding2Dec(sumHistory._14GA_AL_120x60)
    
    console.log(sumHistory)

    // History Display
    const historyDisplay =
      (
        <div className="combined-collection-item">
          <p className="center">{sumHistory._14GA_CR_120x60} | 14GA CR Sheets 120x60</p>
          <p className="center">{sumHistory._16GA_CR_120x48} | 16GA CR Sheets 120x48</p>
          <p className="center">{sumHistory._16GA_CR_120x60} | 16GA CR Sheets 120x60</p>
          <p className="center">{sumHistory._18GA_CR_120x48} | 18GA CR Sheets 120x48</p>
          <p className="center">{sumHistory._18GA_CR_120x60} | 18GA CR Sheets 120x60</p>
          <p className="center">{sumHistory._20GA_CR_120x48} | 20GA CR Sheets 120x60</p>
          <hr />
          <p className="center">{sumHistory._14GA_AL_120x60} | 14GA AL Sheets 120x60</p>
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
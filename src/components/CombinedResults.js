import React, { Component } from 'react';
import { connect } from 'react-redux';

class CombinedResults extends Component {
  render() {
    //console.log(this.props.resultHistory)

    // Destructuring
    const {combinedHistory} = this.props
    
    // History Display
    const historyDisplay =
      (
        <div className="combined-collection-item">
          <p className="center">{combinedHistory._14GA_CR_120x60} | 14GA CR Sheets 120x60</p>
          <p className="center">{combinedHistory._16GA_CR_120x48} | 16GA CR Sheets 120x48</p>
          <p className="center">{combinedHistory._16GA_CR_120x60} | 16GA CR Sheets 120x60</p>
          <p className="center">{combinedHistory._18GA_CR_120x48} | 18GA CR Sheets 120x48</p>
          <p className="center">{combinedHistory._18GA_CR_120x60} | 18GA CR Sheets 120x60</p>
          <p className="center">{combinedHistory._20GA_CR_120x48} | 20GA CR Sheets 120x60</p>
          <hr />
          <p className="center">{combinedHistory._14GA_AL_120x60} | 14GA AL Sheets 120x60</p>
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
    combinedHistory: state.combinedHistory
  }
}

export default connect(mapStateToProps)(CombinedResults);
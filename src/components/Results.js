import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {
  render() {
    console.log(this.props)

    const doorResult = this.props.resultHistory.length ? (
      this.props.resultHistory.map(result => {
        
        // initialize object properties
        let initProps = {
          _14GA_CR_120x60: 0,
          _16GA_CR_120x48: 0,
          _16GA_CR_120x60: 0,
          _18GA_CR_120x48: 0,
          _18GA_CR_120x60: 0,
          _20GA_CR_120x48: 0,
          _14GA_AL_120x60: 0,
        }

        // Find all the information about the current door
        let currentDoorInfo = this.props.doors.find(doorInfo => {
          return doorInfo.door === result.doorSelect
        })
        
        // All information about current door with initialized properties
        const completeInfo = Object.assign(initProps,currentDoorInfo)
        //console.log(result.qtySelect)

        return(
        <div className="collection-item" key={result.id}>
          <h6>Door: {result.doorSelect} | QTY: {result.qtySelect}</h6>
          <p className="center">{completeInfo._14GA_CR_120x60} | 14GA CR Sheets 120x60</p>
          <p className="center">{completeInfo._16GA_CR_120x48} | 16GA CR Sheets 120x48</p>
          <p className="center">{completeInfo._16GA_CR_120x60} | 16GA CR Sheets 120x60</p>
          <p className="center">{completeInfo._18GA_CR_120x48} | 18GA CR Sheets 120x48</p>
          <p className="center">{completeInfo._18GA_CR_120x60} | 18GA CR Sheets 120x60</p>
          <p className="center">{completeInfo._20GA_CR_120x48} | 20GA CR Sheets 120x60</p>
          <hr/>
          <p className="center">{completeInfo._14GA_AL_120x60} | 14GA AL Sheets 120x60</p>
        </div>
        )
      })
    ) : (
      <p className="center text-blue">No Doors!</p>
    )
    return (
      <div className="App">
        <h5 className="center green-text">Results Component</h5>
        <div className="collection">
          {doorResult}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    doors: state.doors,
    resultHistory: state.resultHistory,
  }
}

export default connect(mapStateToProps)(Results);
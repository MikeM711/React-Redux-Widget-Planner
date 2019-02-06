import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';

class Results extends Component {

  handleDelete = (id) => {
    this.props.deleteDoor(id)
  }

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
        
        // Combine all information about current door with initialized properties
        const completeInfo = Object.assign(initProps,currentDoorInfo)

        // Destructuring off completeInfo object
        let { _14GA_CR_120x60, _16GA_CR_120x48, _16GA_CR_120x60, _18GA_CR_120x48, _18GA_CR_120x60, _20GA_CR_120x48, door } = completeInfo

        // What to do with QTY Number
        if(door.includes('GP100')){
          _14GA_CR_120x60 = Math.ceil((result.qtySelect/_14GA_CR_120x60) * 100) / 100
          _18GA_CR_120x48 = Math.ceil((result.qtySelect/_18GA_CR_120x48) * 100) / 100
        }

        // Return collapsible collection-items
        return(
          <div className="collection-item" key={result.id}  >
            <table>
              <tbody>
                <tr>
                  <td className="collapsible-items">
                    <Collapsible trigger={`Door: ${result.doorSelect} | QTY: ${result.qtySelect}`} transitionTime={50} open={false}>
                      <h6>Door: {result.doorSelect} | QTY: {result.qtySelect}</h6>
                      <p className="center">{_14GA_CR_120x60} | 14GA CR Sheets 120x60</p>
                      <p className="center">{_16GA_CR_120x48} | 16GA CR Sheets 120x48</p>
                      <p className="center">{_16GA_CR_120x60} | 16GA CR Sheets 120x60</p>
                      <p className="center">{_18GA_CR_120x48} | 18GA CR Sheets 120x48</p>
                      <p className="center">{_18GA_CR_120x60} | 18GA CR Sheets 120x60</p>
                      <p className="center">{_20GA_CR_120x48} | 20GA CR Sheets 120x60</p>
                      <hr />
                      <p className="center">{completeInfo._14GA_AL_120x60} | 14GA AL Sheets 120x60</p>
                    </Collapsible>
                  </td>
                  <td className="delete-button">
                    <button className="delete-btn btn-floating btn-large waves-effect waves-light red" onClick={() => {this.handleDelete(result.id)}}>X</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })
    ) : (
      <p className="center text-blue">No Doors!</p>
    )
    return (
      <div className="calculator-results">
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDoor: (id) => {dispatch({type: 'DELETE_DOOR',id: id})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
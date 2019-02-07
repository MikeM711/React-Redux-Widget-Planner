import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { selectCompleteHistory } from '../reducers/rootReducer'

class Results extends Component {

  handleDelete = (id) => {
    this.props.deleteDoor(id)
  }

  render() {
    console.log(selectCompleteHistory)
    const doorResult = this.props.completeHistory.length ? (
      this.props.completeHistory.map(result => {

        // Destructuring off completeHistory object
        let { _14GA_CR_120x60, _16GA_CR_120x48, _16GA_CR_120x60, _18GA_CR_120x48, _18GA_CR_120x60, _20GA_CR_120x48,_14GA_AL_120x60, doorSelect, qtySelect, id } = result

        // Return collapsible collection-items
        return(
          <div className="collection-item" key={id}  >
            <table>
              <tbody>
                <tr>
                  <td className="collapsible-items">
                    <Collapsible trigger={`Door: ${doorSelect} | QTY: ${qtySelect}`} transitionTime={50} open={false}>
                      <h6>Door: {doorSelect} | QTY: {qtySelect}</h6>
                      <p className="center">{_14GA_CR_120x60} | 14GA CR Sheets 120x60</p>
                      <p className="center">{_16GA_CR_120x48} | 16GA CR Sheets 120x48</p>
                      <p className="center">{_16GA_CR_120x60} | 16GA CR Sheets 120x60</p>
                      <p className="center">{_18GA_CR_120x48} | 18GA CR Sheets 120x48</p>
                      <p className="center">{_18GA_CR_120x60} | 18GA CR Sheets 120x60</p>
                      <p className="center">{_20GA_CR_120x48} | 20GA CR Sheets 120x60</p>
                      <hr />
                      <p className="center">{_14GA_AL_120x60} | 14GA AL Sheets 120x60</p>
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
    completeHistory: selectCompleteHistory(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDoor: (id) => {dispatch({type: 'DELETE_DOOR',id: id})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
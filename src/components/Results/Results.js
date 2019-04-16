import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { selectCompleteHistory } from '../../reducers/rootReducer'

class Results extends Component {

  handleDelete = (id) => {
    this.props.deleteWidget(id)
  }

  render() {
    const widgetResult = this.props.completeHistory.length ? (
      this.props.completeHistory.map(result => {

        // Destructuring off completeHistory object
        let { alum, crSteel, galv, glass, sSteel, widgetSelect, qtySelect, id } = result

        // Return collapsible collection-items
        return (
          <div className="collection-item" key={id}  >
            <table>
              <tbody>
                <tr>
                  <td className="collapsible-items">
                    <Collapsible trigger={`Widget: ${widgetSelect} | QTY: ${qtySelect}`} transitionTime={50} open={false}>
                      <h6>Widget: {widgetSelect} | QTY: {qtySelect}</h6>
                      <p className="center">{alum} | Aluminum</p>
                      <p className="center">{crSteel} | Cold Rolled Steel</p>
                      <p className="center">{galv} | Galvanneal</p>
                      <p className="center">{glass} | Glass</p>
                      <p className="center">{sSteel} | Stainless Steel</p>
                    </Collapsible>
                  </td>
                  <td className="delete-button">
                    <button className="delete-btn btn-floating btn-large waves-effect waves-light red" onClick={() => { this.handleDelete(result.id) }}>X</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })
    ) : (
        <p className="center text-blue">No Widgets!</p>
      )
    return (
      <div className="calculator-results">
        <h5 className="center green-text">Results Component</h5>
        <div className="collection">
          {widgetResult}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    widgets: state.widgets, // not used
    resultHistory: state.resultHistory, // not used
    completeHistory: selectCompleteHistory(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWidget: (id) => { dispatch({ type: 'DELETE_WIDGET', id: id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
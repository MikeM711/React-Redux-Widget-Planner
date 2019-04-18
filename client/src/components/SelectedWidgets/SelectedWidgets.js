import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeUserHistory } from '../../reducers/rootReducer'
import SingleWidget from '../SingleWidget/SingleWidget'

class SelectedWidgets extends Component {

  handleDelete = (id) => {
    this.props.deleteWidget(id)
  }

  render() {
    const widgetResult = this.props.completeHistory.length ? (
      this.props.completeHistory.map(result => {

        // Destructuring off results
        let { alum, crSteel, galv, glass, sSteel, widgetSelect, qtySelect, id } = result

        // All history items go into its own single widget
        return (
          <SingleWidget
            key={id}
            id={id}
            widgetSelect={widgetSelect}
            qtySelect={qtySelect}
            alum={alum}
            crSteel={crSteel}
            galv={galv}
            glass={glass}
            sSteel={sSteel}
            handleDelete={this.handleDelete}
          />
        )

      })
    ) : (
        <div className="collection">
          <p className="center text-blue">No Widgets!</p>
        </div>
      )
    return (
      <div className="calculator-results">
        <h5 className="center green-text">Results Component</h5>
        {widgetResult}
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    widgets: state.widgets, // not used
    resultHistory: state.resultHistory, // not used
    completeHistory: completeUserHistory(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWidget: (id) => { dispatch({ type: 'DELETE_WIDGET', id: id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWidgets);
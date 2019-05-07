import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SelectedWidgets.css';
import SingleWidget from '../SingleWidget/SingleWidget';
import * as actions from '../../../actions';

class SelectedWidgets extends Component {
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleDelete(id) {
    await this.props.deleteWidgetHist(id)
  }

  render() {

    const widgetResult = this.props.userHistory.length ? (
      this.props.userHistory.map(result => {

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
    userHistory: state.widgetRed.userHistory
  }
}

export default connect(mapStateToProps, actions)(SelectedWidgets);

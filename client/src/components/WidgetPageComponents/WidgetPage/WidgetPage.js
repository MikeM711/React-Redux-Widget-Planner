import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../Form/Form'
import SelectedWidgets from '../SelectedWidgets/SelectedWidgets'
import ResultTotal from '../ResultTotal/ResultTotal'
import Navbar from '../../Navbar/Navbar'

class WidgetPage extends Component {

  render() {
    return (
      <div className="widget-calculator-page">
        <Navbar />
        <div className="container">
          <h2 className="center blue-text">Widget Material Calculator</h2>
          <Form />

          {this.props.userHistTotal ? ([
            <SelectedWidgets key="selected-widgets"/>,
            <ResultTotal key="result-total"/>
          ]) : (null)}

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

export default connect(mapStateToProps)(WidgetPage);

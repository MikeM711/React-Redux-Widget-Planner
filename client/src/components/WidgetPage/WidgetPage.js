import React, { Component } from 'react';
import Form from '../Form/Form'
import SelectedWidgets from '../SelectedWidgets/SelectedWidgets'
import ResultTotal from '../ResultTotal/ResultTotal'
import Navbar from '../Navbar/Navbar'

class WidgetPage extends Component {

  render() {
    return (
      <div className="widget-calculator-page">
        <Navbar />
        <div className="container">
          <h2 className="center blue-text">Widget Material Calculator</h2>
          <Form />
          <SelectedWidgets />
          <ResultTotal />
        </div>
      </div>
    );
  }
}

export default WidgetPage;

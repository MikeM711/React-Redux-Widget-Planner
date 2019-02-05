import React, { Component } from 'react';
import Form from './components/Form'
import Results from './components/Results'
import CombinedResults from './components/CombinedResults'

class App extends Component {

  render() {
    return (
      <div className="wbCalculator container">
        <h2 className="center blue-text">WB Door Material Calculator</h2>
        <Form />
        <Results />
        <CombinedResults />
      </div>
    );
  }
}

export default App;

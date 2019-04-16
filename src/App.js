import React, { Component } from 'react';
import Form from './components/Form/Form'
import Results from './components/Results/Results'
import CombinedResults from './components/CombinedResults/CombinedResults'

class App extends Component {

  render() {
    return (
      <div className="widget container">
        <h2 className="center blue-text">Widget Material Calculator</h2>
        <Form />
        <Results />
        <CombinedResults />
      </div>
    );
  }
}

export default App;

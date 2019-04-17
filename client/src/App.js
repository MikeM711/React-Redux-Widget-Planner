import React, { Component } from 'react';
import WidgetPage from './components/WidgetPage/WidgetPage'
import Database from './components/Database/Database'
import { Route, BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="widget-application">
        <Route exact path='/' component={WidgetPage} />
        <Route exact path='/database' component={Database} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import WidgetPage from './components/WidgetPageComponents/WidgetPage/WidgetPage'
import Database from './components/Database/Database'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="widget-application">
        <Route exact path='/' component={WidgetPage} />
        <Route exact path='/database' component={Database} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/logout' component={Logout} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

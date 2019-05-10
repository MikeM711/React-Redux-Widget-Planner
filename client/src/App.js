import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import WidgetPage from './components/WidgetPageComponents/WidgetPage/WidgetPage';
import Database from './components/DatabasePageComponents/Database/Database';
import Profile from './components/ProfilePageComponents/Profile/Profile';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import SignOut from './components/SignOut/SignOut';

import authGuard from './components/HOCs/authGuard';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="widget-application">
        <Route exact path='/' component={authGuard(WidgetPage)} />
        <Route exact path='/database' component={authGuard(Database)} />
        <Route exact path='/profile' component={authGuard(Profile)} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signout' component={authGuard(SignOut)} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

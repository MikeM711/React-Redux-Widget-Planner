import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { GoogleLogout } from 'react-google-login';

class Logout extends Component {

  render() {

    return (
      <div className="login">
        <Navbar />
        <div className="login-container container">
          <h3>SignOut</h3>

        </div>
      </div>
    );
  }
}

export default Logout;
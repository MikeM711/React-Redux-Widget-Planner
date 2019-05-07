import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { GoogleLogout } from 'react-google-login';

class SignOut extends Component {

  render() {

    return (
      <div className="login">
        <Navbar />
        <div className="login-container container">
          <h3>Sign Out</h3>

        </div>
      </div>
    );
  }
}

export default SignOut;
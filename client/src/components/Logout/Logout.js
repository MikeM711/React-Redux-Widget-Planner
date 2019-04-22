import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { GoogleLogout } from 'react-google-login';
// import axios from 'axios'
//import queryString from "query-string";
// import GoogleLogin from 'react-google-login';

class Logout extends Component {
  state = {
    // state data

  }

  render() {

    // return (
    //   <div className="login">
    //     <GoogleLogin
    //       clientId={'920654343788-ngguegn79nillrufq91h5d4vjoth4e5t.apps.googleusercontent.com'}
    //       onSuccess={responseGoogle}
    //       onFailure={responseGoogle}
    //     >

    //       <span> Login with Google</span>
    //     </GoogleLogin>
    //   </div>
    // );

    return (
      <div className="login">
        <Navbar />
        <div className="login-container container">
          <h3>Please logout</h3>
          <GoogleLogout
            clientId="920654343788-ngguegn79nillrufq91h5d4vjoth4e5t.apps.googleusercontent.com"
            buttonText="Logout"
            // onLogoutSuccess={logout}
            onLogoutSuccess={() => {console.log('log out')}}
          > 
          </GoogleLogout>
          <h3>{this.state.googleName}</h3>
        </div>
      </div>
    );
  }
}

export default Logout;
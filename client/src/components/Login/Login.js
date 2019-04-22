import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
// import axios from 'axios'
//import queryString from "query-string";
import GoogleLogin from 'react-google-login';

class Login extends Component {
  state = {
    // state data
    googleName: false,
  }

  render() {

    const responseGoogle = (response) => {
      console.log(response);

      console.log(response.profileObj.givenName)
      this.setState({
        googleName: response.profileObj.name
      })
    }

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
          <h3>Please login</h3>
          <GoogleLogin
            clientId={'920654343788-ngguegn79nillrufq91h5d4vjoth4e5t.apps.googleusercontent.com'}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            <span> Login with Google</span>
          </GoogleLogin>
          <h3>{this.state.googleName}</h3>
        </div>
      </div>
    );
  }
}

export default Login;
import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar'
import GoogleLogin from 'react-google-login';

class SignUp extends Component {

  render() {

    const responseGoogle = (response) => {
      console.log(response);

      console.log(response.profileObj.givenName)
      this.setState({
        googleName: response.profileObj.name
      })
    }

    return (
      <div className="login">
        <Navbar />
        <div className="login-container container">
          <h3>Sign Up</h3>
          <GoogleLogin
            clientId={'920654343788-ngguegn79nillrufq91h5d4vjoth4e5t.apps.googleusercontent.com'}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            <span>Google Sign In</span>
          </GoogleLogin>
        </div>
      </div>
    );
  }
}

export default SignUp;
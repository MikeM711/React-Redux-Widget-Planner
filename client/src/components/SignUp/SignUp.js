import React, { Component } from 'react';

import './SignUp.css'
import Navbar from '../Navbar/Navbar'
import GoogleLogin from 'react-google-login';

class SignUp extends Component {
  state = {
    isWritingEmail: 'inactive',
    isWritingPassword: 'inactive',
    email: '',
    password: '',
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleEmailFocus = () => {
    this.setState({
      isWritingEmail: 'active',
    })
  }

  handleEmailBlur = () => {
    if (!this.state.email) {
      this.setState({
        isWritingEmail: 'inactive',
      })
    }
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handlePasswordFocus = () => {
    this.setState({
      isWritingPassword: 'active'
    })
  }

  handlePasswordBlur = () => {
    if (!this.state.password) {
      this.setState({
        isWritingPassword: 'inactive'
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('email', this.state.email)
    console.log('password', this.state.password)
  }

  render() {
    const { isWritingEmail, isWritingPassword } = this.state

    const responseGoogle = (response) => {
      console.log(response);
      console.log(response.profileObj.givenName)
      this.setState({
        googleName: response.profileObj.name
      })
    }

    return (
      <div className="sign-up">
        <Navbar />
        <div className="sign-up-container">
          <div className="sign-up row">
            <div className="local-sign-up col s6">

              <form className="col s12" onSubmit={this.handleSubmit}>

                <div className="input-field col s10">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    onChange={this.handleEmailChange}
                    onFocus={this.handleEmailFocus}
                    onBlur={this.handleEmailBlur} />
                  <label className={isWritingEmail} htmlFor="email">Email</label>
                </div>

                <div className="input-field col s10">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    onChange={this.handlePasswordChange}
                    onFocus={this.handlePasswordFocus}
                    onBlur={this.handlePasswordBlur} />
                  <label className={isWritingPassword} htmlFor="password">Password</label>
                </div>

                <div className="btn-field col s10">
                  <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 sign-up-btn" >Sign Up</button>
                </div>

              </form>

            </div>
            <div className="local-sign-in col s6">
              <div className="card-panel #e3f2fd blue lighten-5 center">
                <h6>Or, sign up using Google</h6>
              </div>

              <div className="login-container center">
                <GoogleLogin
                  clientId={'920654343788-ngguegn79nillrufq91h5d4vjoth4e5t.apps.googleusercontent.com'}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                >
                  <span>Google Sign Up</span>
                </GoogleLogin>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default SignUp;
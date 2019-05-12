import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SignUp.css';
import * as actions from '../../actions';
import Navbar from '../Navbar/Navbar';
import GoogleLogin from 'react-google-login';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      isWritingEmail: 'inactive',
      isWritingPassword: 'inactive',
      email: '',
      password: '',
    };
  };

  async componentDidMount() {
    if (this.props.token && this.props.isAuthenticated) {
      this.props.history.push('/profile')
    }
    // Erase error messages if component mounted
    await this.props.componentMount();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    await this.props.signUp(data);
    if (!this.props.errorMessage) {
      this.props.history.push('/profile');
    };
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  handleEmailFocus = () => {
    this.setState({
      isWritingEmail: 'active',
    });
  };

  handleEmailBlur = () => {
    if (!this.state.email) {
      this.setState({
        isWritingEmail: 'inactive',
      });
    };
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  handlePasswordFocus = () => {
    this.setState({
      isWritingPassword: 'active'
    });
  };

  handlePasswordBlur = () => {
    if (!this.state.password) {
      this.setState({
        isWritingPassword: 'inactive'
      });
    };
  };

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/profile');
    };
  };

  render() {
    const { isWritingEmail, isWritingPassword } = this.state;

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
                {this.props.errorMessage ? (
                  <div className="errormessage col s10">
                    <div className="card-panel #ffebee red lighten-5 center">
                      <h6>{this.props.errorMessage}</h6>
                    </div>
                  </div>) : null}
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
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}>
                  <span>Google Sign Up</span>
                </GoogleLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    errorMessage: state.authRed.errorMessage,
    isAuthenticated: state.authRed.isAuthenticated,
    token: state.authRed.token
  };
};

export default connect(mapStateToProps, actions)(SignUp);
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth = () => {
      if (!this.props.isAuth && !this.props.jwtToken) {
        this.props.history.push('/signup');
      };
    };

    componentDidMount() {
      // check whether the user is authenticated
      this.checkAuth();
    };

    componentDidUpdate() {
      // check whether the user is authenticated
      this.checkAuth();
    };

    render() {
      return <OriginalComponent {...this.props} />
    };
  };

  function mapStateToProps(state) {
    return {
      isAuth: state.authRed.isAuthenticated,
      jwtToken: state.authRed.token
    };
  };

  return connect(mapStateToProps)(MixedComponent);
};
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../Navbar/Navbar'
import * as actions from '../../actions'

class Profile extends Component {
  constructor(props){
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProfile()
  }

  render() {
    return (
      <div className="profile">
        <Navbar />
        <div className="profile-container container">
          <h3>Hello user</h3>
          <h5>You are: {this.props.email}</h5>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.profileRed.email
  }
}

export default connect(mapStateToProps, actions)(Profile);
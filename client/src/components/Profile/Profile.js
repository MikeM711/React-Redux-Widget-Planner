import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'

class Profile extends Component {
  state = {
    // state data
  }

  render() {

    return (
      <div className="profile">
        <Navbar />
        <div className="profile-container container">
          <h3>Hello user</h3>
          <h5>You are: </h5>
        </div>
      </div>
    );
  }
}

export default Profile;
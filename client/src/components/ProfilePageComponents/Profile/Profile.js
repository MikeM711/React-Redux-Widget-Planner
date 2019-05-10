import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css'
import Navbar from '../../Navbar/Navbar'
import * as actions from '../../../actions'
import SingleCalculation from '../SingleCalculation/SingleCalculation'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleDeleteCalc = this.handleDeleteCalc.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProfile()
  }

  async handleDeleteCalc(id) {
    await this.props.deleteProfileResult(id)
  }

  render() {
    let i = 0
    const calcList = this.props.calculationDB.length ? (
      this.props.calculationDB.map(calc => {
        i++
        return (
          <SingleCalculation
            key={calc.id}
            calc={calc}
            int={i}
            deleteCalc={this.handleDeleteCalc}/>
        )
      })) : (
        <div className="no-calculations">
          <p>No calculations have been created!</p>
        </div>
      )
    return (
      <div className="profile">
        <Navbar />
        <div className="profile-container container">
          <h3 className="center">Hello {this.props.name}</h3>
          {calcList}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.profileRed.name,
    calculationDB: state.profileRed.calculationDB
  }
}

export default connect(mapStateToProps, actions)(Profile);
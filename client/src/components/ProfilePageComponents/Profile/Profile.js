import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css';
import Navbar from '../../Navbar/Navbar';
import * as actions from '../../../actions';
import SingleCalculation from '../SingleCalculation/SingleCalculation';
import calculatorNavPng from '../../../images/widget-calculator-nav.png'
import calculatorCalcPng from '../../../images/widget-calculator-calculate.png'
import calculatorSubPng from '../../../images/widget-calculator-submit-to-profile.png'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDeleteCalc = this.handleDeleteCalc.bind(this);
    this.state = {
      isLoaded: false,
    };
  };

  async componentDidMount() {
    if (!this.props.widgets.length) {
      await this.props.fetchWidgetsDB();
    };
    await this.props.fetchProfile();
    this.setState({
      isLoaded: true
    });
  };

  async handleDeleteCalc(id) {
    await this.props.deleteProfileResult(id);
  };

  render() {
    let i = 0;
    const calcList = this.state.isLoaded ? (
      this.props.calculationDB.length ? (
        this.props.calculationDB.map(calc => {
          const { widgets } = this.props;
          i++;
          return (
            <SingleCalculation
              key={calc.id}
              calc={calc}
              int={i}
              widgets={widgets}
              deleteCalc={this.handleDeleteCalc} />
          );
        })
      ) : (
          <div className="no-calculations">
            <div className="no-calculations-created-card card-panel">
              <h6 className="center">No calculations have been created</h6>
            </div>
            <div className="how-to-create-calculation card-panel #f5f5f5 grey lighten-4">
              <h5 className="center"><b>How To Create A Calculation</b></h5>
              <br />
              <h6><b>Step #1:</b> Navigate to the "Widget Material Calculator" page</h6>
              <ul className="browser-default">
                <li><h6>Click "Widget Calculator" in the Navigation Bar (located top-left)</h6></li>
              </ul>
              <img className="calculator-nav" src={calculatorNavPng} alt="Calculator Navbar" />
              <h6><b>Step #2:</b> Create a Calculation</h6>
              <ul className="browser-default">
                <li><h6>Select a Widget and Quantity</h6></li>
                <li><h6>Click the "Calculate" button</h6></li>
              </ul>
              <img className="calculator-calculate" src={calculatorCalcPng} alt="Calculator Calculate" />
              <h6><b>Step #3:</b> Submit your Calculation History to your Profile</h6>
              <ul className="browser-default">
                <li><h6>Add more widgets to your list, if you wish</h6></li>
                <li><h6>Click the "Submit Results To Profile" button, when you are ready</h6></li>
              </ul>
              <img className="calculator-submit" src={calculatorSubPng} alt="Calculator Submit" />
            </div>
          </div>
        )
    ) : null;

    return (
      <div className="profile">
        <Navbar />
        <div className="profile-container container">
          {this.props.name ? (<h3 className="center">Hello, {this.props.name}</h3>) : null}
          {calcList}
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    name: state.profileRed.name,
    calculationDB: state.profileRed.calculationDB,
    widgets: state.widgetRed.widgets
  };
};

export default connect(mapStateToProps, actions)(Profile);
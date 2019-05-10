import React, { Component } from 'react';

import './SingleCalculation.css';
class SingleCalculation extends Component {

  render() {
    const { calc, int } = this.props
    console.log('calc', calc)
    const calculation = calc.calculation.map(select => {
      console.log('select', select)
      return (
        <div className="single-calculation" key={select.id}>
          <br />
          <span>Widget: {select.widget} | QTY: {select.qtySelect}</span>
          <br />
          <div className="single-material-calculation" >
            <span>Material Needed: </span>
            <span>{select.alum} Sheets of Aluminum, </span>
            <span>{select.crSteel} Sheets of Cold Rolled Steel, </span>
            <span>{select.galv} Sheets of Galvanneal, </span>
            <span>{select.glass} Sheets of Glass, </span>
            <span>{select.sSteel} Sheets of Stainless Steel </span>
          </div>
        </div>)
    })
    return (
      <div className="calculation-select-list card #f5f5f5 grey lighten-4" key={calc.id}>
        <h6><b>Calculation #{int}</b></h6>
        {calculation}
        <hr />
        <span>Does this reflect the database properly?</span>
        <br />
        <span>Was any of our widgets in the DB modified or deleted?</span>
      </div>
    );
  }
}

export default SingleCalculation;
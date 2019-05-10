import React, { Component } from 'react';

import './SingleCalculation.css';
class SingleCalculation extends Component {

  async deleteCalc(id) {
    await this.props.deleteCalc(id)
  }

  render() {
    const { calc, int } = this.props
    const caclTotal = calc.calculation_total
    const postgresDate = calc.createdAt
    const index = postgresDate.indexOf('T')
    const date = postgresDate.slice(0, index)

    const calculation = calc.calculation.map(select => {
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
        <h6 className="calculation-number"><b>Calculation #{int}: {date} </b></h6>
        <button href="" className="#e57373 waves-effect waves-light btn delete-calculation red lighten-2"
          onClick={() => { this.deleteCalc(calc.id) }}
        >Delete</button>
        <br />
        {calculation}
        <hr />
        <div className="total-material-calculation center" >
          <h6> <b>Total Material Needed:</b> </h6>
          <span>{caclTotal.alum} Sheets of Aluminum</span><br />
          <span>{caclTotal.crSteel} Sheets of Cold Rolled Steel</span><br />
          <span>{caclTotal.galv} Sheets of Galvanneal</span><br />
          <span>{caclTotal.glass} Sheets of Glass</span><br />
          <span>{caclTotal.sSteel} Sheets of Stainless Steel</span><br />
        </div>
        <hr />
        <span>Does this reflect the database properly?</span>
        <br />
        <span>Was any of our widgets in the DB modified or deleted?</span>
      </div>
    );
  }
}

export default SingleCalculation;
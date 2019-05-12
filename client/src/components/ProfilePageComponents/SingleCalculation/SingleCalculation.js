import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SingleCalculation.css';

class SingleCalculation extends Component {
  constructor(props) {
    super(props);
    this.deleteCalc = this.deleteCalc.bind(this);
  };

  async deleteCalc(id) {
    await this.props.deleteCalc(id);
  };

  findWidget = (selectWidget, reduxWidget) => {
    for (let i = 0; i < reduxWidget.length; i++) {
      if (selectWidget.widget === reduxWidget[i].widget) {
        if (selectWidget.updatedAt >= reduxWidget[i].updatedAt ||
          selectWidget.updatedAt === reduxWidget[i].updatedAt) {
          return 'inSync';
        } else {
          return 'oldVer';
        };
      };
    };
    return 'notFound';
  };

  render() {
    const { calc, int, widgets } = this.props;

    const caclTotal = calc.calculation_total;
    const postgresDate = calc.createdAt;
    const index = postgresDate.indexOf('T');
    const date = postgresDate.slice(0, index);

    // object that will tell us if we are in sync or not
    let sync = {};

    const calculation = calc.calculation.map(select => {
      const isSync = this.findWidget(select, widgets);
      sync = {
        ...sync,
        [select.widget]: isSync
      };
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
        </div>
      );
    });

    let inSync = [];
    let notFound = [];
    let oldVer = [];

    for (const key in sync) {
      const value = sync[key];
      if (value === 'inSync') {
        inSync.push(key);
      };
      if (value === 'notFound') {
        notFound.push(key);
      };
      if (value === 'oldVer') {
        oldVer.push(key);
      };
    };

    // console.log('notFound', notFound)
    // console.log('inSync', inSync)
    // console.log('oldVer', oldVer)

    const isNotFound = notFound.length ? (
      <div className="not-found">
        <b>Not Found:</b> {notFound.join(', ')}
      </div>
    ) : null;

    const isOldVer = oldVer.length ? (
      <div className="old-version">
        <b>Old Versions:</b> {[oldVer.join(', ')]}
      </div>
    ) : null;

    const syncResult = notFound.length === 0 && oldVer.length === 0 ? (
      <div className="is-synced card-panel #e8f5e9 green lighten-5">
        <h5 className="center">Results are in sync with database</h5>
      </div>
    ) : (
        <div className="not-synced card-panel #ffebee red lighten-5">
          <h5 className="center">Results are not in sync with database</h5>
          <br />
          {isNotFound}
          {isOldVer}
        </div>
      );

    return (
      <div className="calculation-select-list card #f5f5f5 grey lighten-4" key={calc.id}>
        <h6 className="calculation-number"><b>Calculation #{int}: {date} </b></h6>
        <button href="" className="#e57373 waves-effect waves-light btn delete-calculation-btn red lighten-2"
          onClick={() => { this.deleteCalc(calc.id) }}>Delete</button>
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
        {syncResult}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    widgets: state.widgetRed.widgets
  };
};

export default connect(mapStateToProps)(SingleCalculation);
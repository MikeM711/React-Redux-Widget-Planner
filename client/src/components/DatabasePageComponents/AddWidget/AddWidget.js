import React, { Component } from 'react';

import './AddWidget.css';

class AddWidget extends Component {
  state = {
    name: '',
    alum: '',
    crSteel: '',
    galv: '',
    glass: '',
    sSteel: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    this.props.addWidgetToDB(data);
    this.setState({
      name: '',
      alum: '',
      crSteel: '',
      galv: '',
      glass: '',
      sSteel: '',
    });
  };

  handleStateChange = e => {
    const targetId = e.target.id;
    const value = e.target.value;
    this.setState({
      [targetId]: value
    });
  };

  render() {
    const { name, alum, crSteel, galv, glass, sSteel } = this.state;
    return (
      <div className="add-widget">
        <h4 className="center">Add A Widget</h4>
        <form onSubmit={this.handleSubmit}>

          <div className="add-widget-row1 row">

            <div className="input-field col s2 offset-s3">
              <input placeholder="Name" id="name" type="text" required
                value={name}
                onChange={this.handleStateChange} />
              <span className="helper-text">Widget Name</span>
            </div>

            <div className="input-field col s2">
              <input placeholder="Sheets" id="alum" type="number" step="any" required
                value={alum}
                onChange={this.handleStateChange} />
              <span className="helper-text">Aluminum</span>
            </div>

            <div className="input-field col s2">
              <input placeholder="Sheets" id="crSteel" type="number" step="any" required
                value={crSteel}
                onChange={this.handleStateChange} />
              <span className="helper-text">CR Steel</span>
            </div>

          </div>

          <div className="add-widget-row2 row">

            <div className="input-field col s2 offset-s3">
              <input placeholder="Sheets" id="galv" type="number" step="any" required
                value={galv}
                onChange={this.handleStateChange} />
              <span className="helper-text">Galvanneal</span>
            </div>

            <div className="input-field col s2">
              <input placeholder="Sheets" id="glass" type="number" step="any" required
                value={glass}
                onChange={this.handleStateChange} />
              <span className="helper-text">Glass</span>
            </div>

            <div className="input-field col s2">
              <input placeholder="Sheets" id="sSteel" type="number" step="any" required
                value={sSteel}
                onChange={this.handleStateChange} />
              <span className="helper-text">SS Steel</span>
            </div>

          </div>

          <div className="submit-button-row row center">
            <button className="add-widget-submit-btn waves-effect waves-light btn #0288d1 light-blue darken-2" type="submit">Submit Widget To Database</button>
          </div>

        </form>
      </div>
    );
  };
};

export default AddWidget;
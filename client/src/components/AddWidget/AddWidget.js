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
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.state
    this.props.addWidgetToDB(data)
    this.setState({
      name: '',
      alum: '',
      crSteel: '',
      galv: '',
      glass: '',
      sSteel: '',
    })

  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleAlumChange = (e) => {
    this.setState({
      alum: e.target.value
    })
  }

  handleCrSteelChange = (e) => {
    this.setState({
      crSteel: e.target.value
    })
  }

  handleGalvChange = (e) => {
    this.setState({
      galv: e.target.value
    })
  }

  handleGlassChange = (e) => {
    this.setState({
      glass: e.target.value
    })
  }

  handleSSteelChange = (e) => {
    this.setState({
      sSteel: e.target.value
    })
  }

  render() {
    // Some JSX for the list of widgets inside Select
    // console.log(this.state)
    const { name, alum, crSteel, galv, glass, sSteel } = this.state

    return (
      <div className="add-widget">
        <h4 className="center">Add A Widget</h4>

        <div className="add-widget-row row">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field col s2 offset-s1">
              <input placeholder="Name" id="widget_name" type="text" required
                value={name}
                onChange={this.handleNameChange} />
              <label htmlFor="widget_name"></label>
              <span className="helper-text">Widget Name</span>

              <div className="input-field ">
                <input placeholder="Sheets" id="aluminum" type="number" required
                  value={alum}
                  onChange={this.handleAlumChange} />
                <label htmlFor="aluminum"></label>
                <span className="helper-text">Aluminum</span>
              </div>

              <div className="input-field ">
                <input placeholder="Sheets" id="cr_steel" type="number" required
                  value={crSteel}
                  onChange={this.handleCrSteelChange} />
                <label htmlFor="cr_steel"></label>
                <span className="helper-text">CR Steel</span>
              </div>

              <div className="input-field ">
                <input placeholder="Sheets" id="galvanneal" type="number" required
                  value={galv}
                  onChange={this.handleGalvChange} />
                <label htmlFor="galvanneal"></label>
                <span className="helper-text">Galvanneal</span>
              </div>

              <div className="input-field ">
                <input placeholder="Sheets" id="glass" type="number" required
                  value={glass}
                  onChange={this.handleGlassChange} />
                <label htmlFor="glass"></label>
                <span className="helper-text">Glass</span>
              </div>

              <div className="input-field ">
                <input placeholder="Sheets" id="ss_steel" type="number" required
                  value={sSteel}
                  onChange={this.handleSSteelChange} />
                <label htmlFor="ss_steel"></label>
                <span className="helper-text">SS Steel</span>
              </div>

              <input className="add-widget-submit-btn waves-effect waves-light btn" type="submit" />

            </div>
          </form>
        </div>

      </div>
    );
  }
}

export default AddWidget;
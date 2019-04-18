import React, { Component } from 'react';
import './AddWidget.css'


class AddWidget extends Component {
  state = {
    // state object
  }

  handleSubmit = () => {
    console.log('hello')
  }

  render() {
    // Some JSX for the list of widgets inside Select

    return (
      <div className="add-widget">
        <h4 className="center">Add A Widget</h4>
      
        <div className="add-widget-row row">
        <form onSubmit={this.handleSubmit}>
          <div className="input-field col s2 offset-s1">
            <input placeholder="Name" id="widget_name" type="text" className="validate" required/>
            <label htmlFor="widget_name"></label>
            <span className="helper-text">Widget Name</span>

            <div className="input-field ">
              <input placeholder="Number" id="aluminum" type="number" className="validate" required/>
              <label htmlFor="aluminum"></label>
              <span className="helper-text">Aluminum</span>
            </div>

            <div className="input-field ">
              <input placeholder="Number" id="cr_steel" type="number" className="validate" required/>
              <label htmlFor="cr_steel"></label>
              <span className="helper-text">CR Steel</span>
            </div>

            <div className="input-field ">
              <input placeholder="Number" id="galvanneal" type="number" className="validate" required/>
              <label htmlFor="galvanneal"></label>
              <span className="helper-text">Galvanneal</span>
            </div>

            <div className="input-field ">
              <input placeholder="Number" id="glass" type="number" className="validate" required/>
              <label htmlFor="glass"></label>
              <span className="helper-text">Glass</span>
            </div>

            <div className="input-field ">
              <input placeholder="Number" id="ss_steel" type="number" className="validate" required/>
              <label htmlFor="ss_steel"></label>
              <span className="helper-text">SS Steel</span>
            </div>

            <input className="add-widget-submit-btn waves-effect waves-light btn" type="submit"/>

          </div>
          </form>
        </div>
        
      </div>
    );
  }
}

export default AddWidget;
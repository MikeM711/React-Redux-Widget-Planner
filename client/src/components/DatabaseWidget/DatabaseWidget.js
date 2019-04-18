import React, { Component } from 'react';
import './DatabaseWidget.css'

class DatabaseWidget extends Component {

  render() {
    // Some JSX for a databse widget
    const { widget, alum, crSteel, galv, glass, sSteel } = this.props

    return (
      <div className="db-widget" >
        <div className="db-widget-property widget">{widget}</div>
        <div className="db-widget-property alum">{alum}</div>
        <div className="db-widget-property crSteel">{crSteel}</div>
        <div className="db-widget-property galv">{galv}</div>
        <div className="db-widget-property glass">{glass}</div>
        <div className="db-widget-property sSteel">{sSteel}</div>
        <a href="" className="waves-effect waves-light btn">Delete</a>
      </div>
    );
  }
}

export default DatabaseWidget
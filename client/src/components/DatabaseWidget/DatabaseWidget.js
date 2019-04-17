import React, { Component } from 'react';
import './DatabaseWidget.css'

class DatabaseWidget extends Component {

  render() {
    // Some JSX for a databse widget
    const { widget, alum, crSteel, galv, glass, sSteel } = this.props

    return (
      <div className="db-widget" >
        <span className="db-widget-property widget">{widget}</span>
        <span className="db-widget-property alum">{alum}</span>
        <span className="db-widget-property crSteel">{crSteel}</span>
        <span className="db-widget-property galv">{galv}</span>
        <span className="db-widget-property glass">{glass}</span>
        <span className="db-widget-property sSteel">{sSteel}</span>
      </div>
    );
  }
}

export default DatabaseWidget
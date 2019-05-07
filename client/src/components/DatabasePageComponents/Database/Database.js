import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Database.css'
import Navbar from '../../Navbar/Navbar'
import DatabaseWidget from '../DatabaseWidget/DatabaseWidget'
import AddWidget from '../AddWidget/AddWidget'
import * as actions from '../../../actions'

class Database extends Component {

  constructor(props){
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAddWidgetToDB = this.handleAddWidgetToDB.bind(this);
    this.handleDeleteWidgetDB = this.handleDeleteWidgetDB.bind(this);
    this.handleUpdateWidgetDB = this.handleUpdateWidgetDB.bind(this);
  }

  async componentDidMount() {
    if (!this.props.widgets.length) {
      await this.props.fetchWidgetsDB()
    }
  }

  async handleAddWidgetToDB(data) {
    console.log(data)
    this.props.addWidgetDB(data)
  }

  async handleDeleteWidgetDB(id) {
    // delete widget in the database
    await this.props.deleteWidgetDB(id)
  }

  async handleUpdateWidgetDB(data) {
    console.log('Database received update', data)
    await this.props.updateWidgetDB(data)
  }

  render() {
    // Some JSX for the list of widgets inside Select
    const widgetList = this.props.widgets.map(widgetInfo => {
      // console.log(widgetInfo)
      return (
        <DatabaseWidget
          key={widgetInfo.id}
          id={widgetInfo.id}
          widget={widgetInfo.widget}
          alum={widgetInfo.alum}
          crSteel={widgetInfo.crSteel}
          galv={widgetInfo.galv}
          glass={widgetInfo.glass}
          sSteel={widgetInfo.sSteel}
          DeleteWidgetDB={this.handleDeleteWidgetDB}
          updateWidgetDB={this.handleUpdateWidgetDB}
        />
      )
    })

    return (
      <div className="database">
        <Navbar />
        <div className="database-form">
          <h4 className="center red-text">Widget Database</h4>
          <div className="full-db-widget-row">
            <div className="widget-property-names row" >
              <span className="widget-property-name col m8ths"><b>Edit Widget</b></span>
              <span className="widget-property-name col m8ths"><b>Widget Name</b></span>
              <span className="widget-property-name col m8ths"><b>Aluminum</b></span>
              <span className="widget-property-name col m8ths"><b>Cold Rolled Steel</b></span>
              <span className="widget-property-name col m8ths"><b>Galvanneal</b></span>
              <span className="widget-property-name col m8ths"><b>Glass</b></span>
              <span className="widget-property-name col m8ths"><b>Stainless Steel</b></span>
              <span className="widget-property-name col m8ths"><b>Delete Widget</b></span>
            </div>
            {widgetList}
          </div>
        </div>
        <AddWidget
          addWidgetToDB={this.handleAddWidgetToDB} 
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    widgets: state.widgetRed.widgets
  }
}

export default connect(mapStateToProps, actions)(Database);
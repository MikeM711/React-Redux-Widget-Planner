import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import DatabaseWidget from '../DatabaseWidget/DatabaseWidget'
import { connect } from 'react-redux';
import axios from 'axios'
import './Database.css'

class Database extends Component {
  state = {
    // widgetSelect: '',
    // qtySelect: '',
    // id: '',
    // errorMsg: '',
  }

  componentDidMount() {

    // When component mounts, display all todos from Database, by cycling through each widget
    axios.get('/widgets')
      .then(res => {
        for (let i = 0; i < res.data.widgets.length; i++) {
          // dispatch particular widget from DB to Redux
          this.props.fetchWidgets(res.data.widgets[i]);
        }
      })
      .catch(err => console.log(err))
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();

  // }

  render() {
    // Some JSX for the list of widgets inside Select
    const widgetList = this.props.widgets.map(widgetInfo => {
      console.log(widgetInfo)
      return (
        <DatabaseWidget
          key={widgetInfo.id}
          widget={widgetInfo.widget}
          alum={widgetInfo.alum}
          crSteel={widgetInfo.crSteel}
          galv={widgetInfo.galv}
          glass={widgetInfo.glass}
          sSteel={widgetInfo.sSteel}
        />
      )
    })

    return (
      <div className="database">
        <Navbar />
        <div className="database-form container">
          <h4 className="center red-text">Widget Database</h4>
          <div className="full-db-widget-row">
            <div className="widget-property-names" >
              <span className="widget-property-name"><b>Widget Name</b></span>
              <span className="widget-property-name"><b>Aluminum</b></span>
              <span className="widget-property-name"><b>Cold Rolled Steel</b></span>
              <span className="widget-property-name"><b>Galvanneal</b></span>
              <span className="widget-property-name"><b>Glass</b></span>
              <span className="widget-property-name"><b>Stainless Steel</b></span>
              <span><b>Delete</b></span>
            </div>
            {widgetList}
          </div>
          

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    widgets: state.widgets,
    state: state, // to keep tabs on Redux Store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addWidget: (widgetInfo) => { dispatch({ type: 'ADD_WIDGET_TO_DB', widgetInfo: widgetInfo }) },
    fetchWidgets: (widget) => { dispatch({ type: 'FETCH_WIDGETS', widget: widget }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Database);
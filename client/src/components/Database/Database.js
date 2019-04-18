import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import DatabaseWidget from '../DatabaseWidget/DatabaseWidget'
import AddWidget from '../AddWidget/AddWidget'
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

  handleAddWidgetToDB = (data) => {
    console.log(data)
    axios.post('/widgetPOST', {
      newWidget: data
    })
      .then((res) => {
        // console.log(res)
        // When complete, add widget to the Redux State (use id given by the database)
        const resWidget = res.data.data

        // dispatch newly created widget to redux store
        this.props.addWidgetDB(resWidget)

      })
      .catch((err) => console.log(err))
  }

  handleDeleteWidgetDB = (id) => {
    // delete widget in the database
    axios.delete(`/widgetDELETE/${id}`)
      .then((res) => {
        // if successful, send that id to the reducer to be deleted from the redux state
        this.props.deleteWidgetDB(id)
      })
      .catch(err => console.log(err))
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
          DeleteWidgetDB = {this.handleDeleteWidgetDB}
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
              <a className="waves-effect waves-light btn">Click to Edit</a>
            </div>
            {widgetList}
          </div>
        </div>
        <AddWidget
          addWidgetToDB={this.handleAddWidgetToDB} />
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
    addWidgetDB: (newWidget) => { dispatch({ type: 'ADD_WIDGET_TO_DB', newWidget: newWidget }) },
    deleteWidgetDB: (deleteWidget) => { dispatch({ type: 'DELETE_WIDGET_FROM_DB', deleteWidget: deleteWidget }) },
    fetchWidgets: (widget) => { dispatch({ type: 'FETCH_WIDGETS', widget: widget }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Database);
import React, { Component } from 'react';
import './DatabaseWidget.css'

class DatabaseWidget extends Component {

  state = {
    editToggleWidget: false
  }

  handleDeleteWidgetDB = (event) => {
    event.preventDefault()
    const { id } = this.props
    this.props.DeleteWidgetDB(id)
  }

  handleEditWidgetDB = (event) => {
    event.preventDefault()
    const editToggleWidget = this.state.editToggleWidget
    console.log('editing...')
    this.setState({
      editToggleWidget: !editToggleWidget
    })
  }

  render() {

    // Widget properties
    const { widget, alum, crSteel, galv, glass, sSteel, id, isEditingDB } = this.props

    const { editToggleWidget } = this.state

    // Some JSX for a databse widget
    return (
      <div className="db-widget" >
        {
          editToggleWidget ? (
            <div className="widget-properties">
              <div className="db-widget-property widget">
                <input type="text" />
              </div>
              <div className="db-widget-property alum">{alum}</div>
              <div className="db-widget-property crSteel">{crSteel}</div>
              <div className="db-widget-property galv">{galv}</div>
              <div className="db-widget-property glass">{glass}</div>
              <div className="db-widget-property sSteel">{sSteel}</div>
              <button href="" className="waves-effect waves-light btn"
                onClick={this.handleDeleteWidgetDB}
              >Delete</button>
            </div>
          ) : (
              <div className="widget-properties row">
                <button href="" className="waves-effect waves-light edit btn col m8ths"
                  onClick={this.handleEditWidgetDB}
                >Edit</button>
                <div className="db-widget-property widget col m8ths">{widget}</div>
                <div className="db-widget-property alum col m8ths">{alum}</div>
                <div className="db-widget-property crSteel col m8ths ">{crSteel}</div>
                <div className="db-widget-property galv col m8ths">{galv}</div>
                <div className="db-widget-property glass col m8ths">{glass}</div>
                <div className="db-widget-property sSteel col m8ths">{sSteel}</div>
                <button href="" className="waves-effect waves-light delete btn col m8ths"
                  onClick={this.handleDeleteWidgetDB}
                >Delete</button>
              </div>
            )
        }



      </div>
    );
  }
}

export default DatabaseWidget
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
                <input type="text"/>
              </div>
              <div className="db-widget-property alum">{alum}</div>
              <div className="db-widget-property crSteel">{crSteel}</div>
              <div className="db-widget-property galv">{galv}</div>
              <div className="db-widget-property glass">{glass}</div>
              <div className="db-widget-property sSteel">{sSteel}</div>
            </div>
          ) : (
            <div className="widget-properties">
              <div className="db-widget-property widget">{widget}</div>
              <div className="db-widget-property alum">{alum}</div>
              <div className="db-widget-property crSteel">{crSteel}</div>
              <div className="db-widget-property galv">{galv}</div>
              <div className="db-widget-property glass">{glass}</div>
              <div className="db-widget-property sSteel">{sSteel}</div>
            </div>
          )
        }

        {
          isEditingDB ? (
            <button href="" className="waves-effect waves-light btn"
            onClick={this.handleEditWidgetDB}
            >Edit</button>
          ) : (<button href="" className="waves-effect waves-light btn"
            onClick={this.handleDeleteWidgetDB}
          >Delete</button>)
        }

      </div>
    );
  }
}

export default DatabaseWidget
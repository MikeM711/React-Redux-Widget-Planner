import React, { Component } from 'react';

import './DatabaseWidget.css';

class DatabaseWidget extends Component {

  state = {
    editToggleWidget: false,
    widget: this.props.widget,
    alum: this.props.alum,
    crSteel: this.props.crSteel,
    galv: this.props.galv,
    glass: this.props.glass,
    sSteel: this.props.sSteel,
  };

  handleDeleteWidgetDB = (event) => {
    event.preventDefault();
    const { id } = this.props;
    this.props.DeleteWidgetDB(id);
  };

  handleEditWidgetDB = () => {
    const editToggleWidget = this.state.editToggleWidget;
    this.setState({
      editToggleWidget: !editToggleWidget
    });
  };

  handleEditWidgetState = (e) => {
    const targetId = e.target.id;
    const value = e.target.value;
    this.setState({
      [targetId]: value
    });
  };

  handleUpdateEnter = (event) => {
    if (event.key === 'Enter') {
      const widgetInfo = {
        id: this.props.id,
        name: this.state.widget,
        alum: this.state.alum,
        crSteel: this.state.crSteel,
        galv: this.state.galv,
        glass: this.state.glass,
        sSteel: this.state.sSteel,
      };
      this.props.updateWidgetDB(widgetInfo);
      this.setState({
        editToggleWidget: false,
      });
    };
  };

  render() {
    const { widget, alum, crSteel, galv, glass, sSteel } = this.props;
    const { editToggleWidget } = this.state;
    return (
      <div className="db-widget" >
        { editToggleWidget ? (
          <div className="widget-properties row">

            <div className="edit-widget-property">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={this.state.editToggleWidget}
                  onChange={this.handleEditWidgetDB}
                />
                <span>Edit</span>
              </label>
            </div>

            <div className="db-widget-property widget edit col m8ths">
              <div className="edit-col">
                <input type="text" id="widget"
                  value={this.state.widget}
                  onChange={this.handleEditWidgetState}
                  onKeyDown={this.handleUpdateEnter}
                />
              </div>
            </div>

            <div className="db-widget-property alum edit col m8ths">
              <div className="edit-col">
                <input type="number" id="alum"
                  value={this.state.alum}
                  onChange={this.handleEditWidgetState}
                  onKeyDown={this.handleUpdateEnter}
                />
              </div>
            </div>

            <div className="db-widget-property crSteel edit col m8ths">
              <div className="edit-col">
                <input type="number" id="crSteel"
                  value={this.state.crSteel}
                  onChange={this.handleEditWidgetState}
                  onKeyDown={this.handleUpdateEnter}
                />
              </div>
            </div>

            <div className="db-widget-property galv col edit m8ths">
              <div className="edit-col">
                <input type="number" id="galv"
                  value={this.state.galv}
                  onChange={this.handleEditWidgetState}
                  onKeyDown={this.handleUpdateEnter}
                />
              </div>
            </div>

            <div className="db-widget-property glass col edit m8ths">
              <div className="edit-col">
                <input type="number" id="glass"
                  value={this.state.glass}
                  onChange={this.handleEditWidgetState}
                  onKeyDown={this.handleUpdateEnter}
                />
              </div>
            </div>

            <div className="db-widget-property sSteel col edit m8ths">
              <div className="edit-col">
                <input type="number" id="sSteel"
                  value={this.state.sSteel}
                  onChange={this.handleEditWidgetState}
                  onKeyDown={this.handleUpdateEnter}
                />
              </div>
            </div>

            <button href="" className="#e57373 red lighten-2 delete btn col m8ths"
              onClick={this.handleDeleteWidgetDB}>Delete</button>
          </div>
        ) : (
            <div className="widget-properties row">
              <div className="edit-widget-property">
                <label>
                  <input
                    type="checkbox"
                    className="filled-in"
                    checked={editToggleWidget}
                    onChange={this.handleEditWidgetDB}
                  />
                  <span>Edit</span>
                </label>
              </div>
              <div className="db-widget-property widget col m8ths">{widget}</div>
              <div className="db-widget-property alum col m8ths">{alum}</div>
              <div className="db-widget-property crSteel col m8ths ">{crSteel}</div>
              <div className="db-widget-property galv col m8ths">{galv}</div>
              <div className="db-widget-property glass col m8ths">{glass}</div>
              <div className="db-widget-property sSteel col m8ths">{sSteel}</div>
              <button href="" className="#e57373 waves-effect waves-light red lighten-2 delete btn col m8ths"
                onClick={this.handleDeleteWidgetDB}
              >Delete</button>
            </div>
          )
        }
      </div>
    );
  };
};

export default DatabaseWidget;
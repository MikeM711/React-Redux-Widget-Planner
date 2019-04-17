import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  state = {
    widgetSelect: '',
    qtySelect: '',
    id: '',
    errorMsg: '',
  }

  handleWidgetChange = (event) => {
    let id = Math.random()
    this.setState({
      widgetSelect: event.target.value,
      id: id
    })
  }

  handleQtyChange = (event) => {
    this.setState({
      qtySelect: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // if Widget Select is blank or QTY Select is blank, handle error
    if (!this.state.widgetSelect || !this.state.qtySelect) {
      this.handleError()
    }

    // if Widget Select and QTY select are both filled
    if (this.state.widgetSelect && this.state.qtySelect) {
      this.props.addWidget(this.state)
      this.setState({
        widgetSelect: '',
        qtySelect: '',
        errorMsg: '',
      })
    }
  }

  handleError = () => {
    if (!this.state.widgetSelect && this.state.qtySelect) {
      this.setState({
        errorMsg: 'Please Select A Widget'
      })
    }

    if (!this.state.qtySelect && this.state.widgetSelect) {
      this.setState({
        errorMsg: 'Please Input A Quantity'
      })
    }

    if (!this.state.qtySelect && !this.state.widgetSelect) {
      this.setState({
        errorMsg: 'Please Select A Widget And Input A Quantity'
      })
    }

  }

  render() {
    // Some JSX for the list of widgets inside Select
    const widgetList = this.props.widgets.map(widgetInfo => {
      return (
        <option value={widgetInfo.widget} key={widgetInfo.id}>{widgetInfo.widget}</option>
      )
    })

    return (
      <div className="calculator-form">
        <h5 className="center red-text">Form Component</h5>
        <h5 className="red-text">{this.state.errorMsg}</h5>
        <form onSubmit={this.handleSubmit}>
          <select className="browser-default" onChange={this.handleWidgetChange} value={this.state.widgetSelect}>
            <option value=''>-- Choose A Widget --</option>
            {widgetList}
          </select>
          <input placeholder="Number of Widgets" id="widget_quantity" type="text" className="validate" value={this.state.qtySelect} onChange={this.handleQtyChange}></input>
          <br></br>
          <button className="btn waves-effect waves-light formbtn" >Calculate</button>
        </form>
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
    addWidget: (widgetInfo) => { dispatch({ type: 'ADD_WIDGET', widgetInfo: widgetInfo }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
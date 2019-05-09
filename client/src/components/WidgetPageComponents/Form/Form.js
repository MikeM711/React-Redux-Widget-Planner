import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Form.css'
import * as actions from '../../../actions'

class Form extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitProfileResults = this.submitProfileResults.bind(this);
    this.state = {
      widgetSelect: '',
      qtySelect: '',
      id: '',
      errorMsg: '',
    }
  }

  async componentDidMount() {
    if (!this.props.widgets.length) {
      await this.props.fetchWidgetsDB()
    }
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

  async handleSubmit(event) {
    event.preventDefault();

    // if Widget Select is blank or QTY Select is blank, handle error
    if (!this.state.widgetSelect || !this.state.qtySelect) {
      this.handleError()
    }

    // if Widget Select and QTY select are both filled
    if (this.state.widgetSelect && this.state.qtySelect) {
      await this.props.addWidgetHist(this.state)
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

  async submitProfileResults() {
    // console.log('Results have been submitted!')
    // console.log('userHistory', this.props.userHistory)
    // console.log('userHistTotal', this.props.userHistTotal)
    await this.props.submitProfileResults(this.props.userHistory, this.props.userHistTotal)
  }

  render() {
    // Some JSX for the list of widgets inside Select
    const widgetList = this.props.widgets.map(widgetInfo => {
      return (
        <option className="widget-dropdown-menu-options" value={widgetInfo.widget} key={widgetInfo.id}>{widgetInfo.widget}</option>
      )
    })

    return (
  
      <div className="calculator-form">
        <h5 className="center red-text">Form Component</h5>
        <h5 className="red-text">{this.state.errorMsg}</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <select className="browser-default widget-dropdown-menu" onChange={this.handleWidgetChange} value={this.state.widgetSelect}>
              <option value=''>-- Choose A Widget --</option>
              {widgetList}
            </select>
            <input placeholder="Number of Widgets" id="widget_quantity" type="number" className="validate" value={this.state.qtySelect} onChange={this.handleQtyChange}></input>
            <br/>
            <button className="btn waves-effect waves-light formbtn" >Calculate</button>

            {!this.props.userHistory.length === false ? (
                <button className="btn waves-effect waves-light resultsbtn"
                  type='button'
                  onClick={this.submitProfileResults}>
                  Submit Results to Profile
              </button>
              ) : null}
            
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    widgets: state.widgetRed.widgets,
    userHistory: state.widgetRed.userHistory,
    userHistTotal: state.widgetRed.userHistTotal,
  }
}

export default connect(mapStateToProps, actions)(Form);
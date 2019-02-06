import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  state = {
    doorSelect: '',
    qtySelect: '',
    id: '',
    errorMsg: '',
  }

  handleDoorChange = (event) => {
    let id = Math.random()
    this.setState({
      doorSelect: event.target.value,
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

    // if Door Select is blank or QTY Select is blank, handle error
    if(!this.state.doorSelect || !this.state.qtySelect){
      this.handleError()
    }
    
    // if Door Select and QTY select are both filled
    if(this.state.doorSelect && this.state.qtySelect){
      this.props.addDoor(this.state)
      this.setState({
        doorSelect: '',
        qtySelect: '',
        errorMsg: '',
      })
    }
  }

  handleError = () => {
    if(!this.state.doorSelect && this.state.qtySelect){
      this.setState({
        errorMsg: 'Please Select A Door'
      })
    }

    if(!this.state.qtySelect && this.state.doorSelect){
      this.setState({
        errorMsg: 'Please Input A Quantity'
      })
    }

    if(!this.state.qtySelect && !this.state.doorSelect){
      this.setState({
        errorMsg: 'Please Select A Door And Input A Quantity'
      })
    }

  }

  render() {
    // Some JSX for the list of doors inside Select
    const doorList = this.props.doors.map(doorInfo => {
      return (
        <option value={doorInfo.door} key={doorInfo.id}>{doorInfo.door}</option>
      )
    })

    return (
      <div className="calculator-form">
        <h5 className="center red-text">Form Component</h5>
        <h5 className="red-text">{this.state.errorMsg}</h5>
        <form onSubmit={this.handleSubmit}>
          <select className="browser-default" onChange={this.handleDoorChange} value={this.state.doorSelect}>
            <option value=''>-- Choose A Door --</option>
            {doorList}
          </select>
          <input placeholder="Number of Doors" id="door_quantity" type="text" className="validate" value={this.state.qtySelect} onChange={this.handleQtyChange}></input>
          <br></br>
          <button className="btn waves-effect waves-light formbtn" >Calculate</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    doors: state.doors,
    state: state, // to keep tabs on Redux Store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDoor: (doorInfo) => {dispatch({type:'ADD_DOOR', doorInfo: doorInfo})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
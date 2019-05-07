import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class SingleWidget extends Component {

  render() {

    // Destructuring off this.props
    let { alum, crSteel, galv, glass, sSteel, widgetSelect, qtySelect, id, handleDelete } = this.props

    // Return collapsible collection-items
    return (
      <div className="collection-item user-widget">
        <table>
          <tbody>
            <tr>
              <td className="collapsible-items">
                <Collapsible trigger={`Widget: ${widgetSelect} | QTY: ${qtySelect}`} transitionTime={50} open={false}>
                  <h6>Widget: {widgetSelect} | QTY: {qtySelect}</h6>
                  <p className="center">{alum} | Aluminum</p>
                  <p className="center">{crSteel} | Cold Rolled Steel</p>
                  <p className="center">{galv} | Galvanneal</p>
                  <p className="center">{glass} | Glass</p>
                  <p className="center">{sSteel} | Stainless Steel</p>
                </Collapsible>
              </td>
              <td className="delete-button">
                <button className="delete-btn btn-floating btn-large waves-effect waves-light red" onClick={() => { handleDelete(id) }}>X</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SingleWidget;
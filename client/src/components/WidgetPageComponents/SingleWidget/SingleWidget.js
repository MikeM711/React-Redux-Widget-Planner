import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

import './SingleWidget.css';
import deleteButton from '../../../images/delete-button.png';

class SingleWidget extends Component {

  render() {
    let { alum, crSteel, galv, glass, sSteel, widgetSelect, qtySelect, id, handleDelete } = this.props;
    return (
      <div className="collection-item user-widget">
        <table>
          <tbody>
            <tr>
              <td className="collapsible-items">
                <Collapsible
                  trigger={`Widget: ${widgetSelect} | QTY: ${qtySelect}`}
                  transitionTime={50}
                  open={false}>
                  <h6>Widget: {widgetSelect} | QTY: {qtySelect}</h6>
                  <p className="center">{alum} | Aluminum</p>
                  <p className="center">{crSteel} | Cold Rolled Steel</p>
                  <p className="center">{galv} | Galvanneal</p>
                  <p className="center">{glass} | Glass</p>
                  <p className="center">{sSteel} | Stainless Steel</p>
                </Collapsible>
              </td>
              <td className="delete-button-img">
                <img
                  src={deleteButton}
                  alt="delete-button"
                  onClick={() => { handleDelete(id) }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
};

export default SingleWidget;
// == Import npm
import React from 'react';

// == Import
import './admin.scss';

// == Composant
const Admin = () => {
  return (
    <div id="admin-wrapper">
      <div id="left-section">
              <div id="admin-top-section">
                <div className="left">
                  <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                  </label>
                  <span className="toggle-name">SERVICE : </span>
                  <span className="toggle-state on">ON</span>
                </div> 
                <div className="right">
                  <span>15:03</span>
                </div>
              </div>

              <div id="admin-middle-section">
                ticket
              </div>

              <div id="admin-bottom-section">
                bottom
              </div>
    </div>
    <div id="right-section">
      <div id="admin-side-section">
        ticketlist
      </div>
    </div>
  </div>
  )
};

// == Export
export default Admin;

// == Import npm
import React from 'react';

// == Import
import Ticket from './Ticket';
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
            <span>15h03</span>
          </div>
        </div>
        <div id="admin-middle-section">
          <div className="left">
            <div id="ticket-infos">
              <span>Nom : DUPONT</span>
              <span>Prénom : JEAN</span>
              <span>Horaire estimé : 16h45</span>
              <div id="ticket-ref">
              <span>Ref ticket : </span>
              <span className="ref"> 547</span>
            </div>
            </div>
          </div>
          <div className="right">
            <div id="covers-nb">
              <span className="covers-title">Nombre de couverts :</span>
              <span className="covers">4</span>
              <div></div>
            </div>
          </div>
        </div>
        <div id="admin-bottom-section">
          <div className="estimate-waiting-time">
            <span id="less-time">-</span>
            <span id="time">1h30</span>
            <span id="more-time">+</span>
          </div>
          <div className="add-ticket">
            <span>Ajouter un ticket</span>
            <button className="button">Ajouter</button>
          </div>
        </div>
      </div>
    <div id="right-section">
      <div id="admin-side-section">
        <ul id="ticket-list">
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
        </ul>
        <div className="tickets-count">
          <span>Tickets en attente : 32 tickets</span>
        </div>
      </div>
    </div>
  </div>
  )
};

// == Export
export default Admin;

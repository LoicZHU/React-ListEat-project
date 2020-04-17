// == Import npm
import React, { useEffect } from 'react';

// == Import
import Ticket from 'src/containers/Admin/Ticket';
import './admin.scss';

// == Composant
const Admin = ({
  status,
  averageEatingTime,
  handleDecreaseMinute,
  handleIncreaseMinute,
  handleChangeServiceStatus,
  loadingTicketsData,
  tickets,
  currentTime,
  refreshTime,
  currentTicket,
}) => {
  // handle click on '+'
  const handleRemoveClick = () => {
    handleDecreaseMinute();
  };

  // handle click on '-'
  const handleAddClick = () => {
    handleIncreaseMinute();
  };

  // handle click on the toggle
  const handleServiceClick = () => {
    handleChangeServiceStatus();
  };

  // get local time
  // const time = new Date();
  // const h = time.getHours();
  // const mn = time.getMinutes();

  useEffect(() => {
    setInterval(() => {
      refreshTime();
    }, 60000);
  }, []);

  // const refresh = setInterval(() => {
  //   refreshTime();
  // }, 1000);
  // console.log(date.toLocaleTimeString());
  // date = new Date();
  // console.log(date);

  return (
    (!loadingTicketsData && (
      <div id="admin-wrapper">

        {/* left section */}
        <div id="left-section">
          <div id="admin-top-section">
            <div className="left">
              <label className="switch">
                <input type="checkbox" checked={status} onChange={handleServiceClick} />
                <span className="slider round" />
              </label>
              <span className="toggle-name">SERVICE : </span>
              <span className="toggle-state on">ON</span>
            </div>
            <div className="right">
              <span>{currentTime}</span>
              {/* <span>{refresh}</span> */}
            </div>
          </div>

          <div id="admin-middle-section">
            <div className="left">
              <div id="ticket-infos">
                <span>Nom : {currentTicket.customer.lastName} </span>
                <span>Prénom : {currentTicket.customer.firstName}</span>
                <span>Horaire estimé :&nbsp;
                  {
                    currentTicket.estimatedEntryTime.substring
                    (currentTicket.estimatedEntryTime.indexOf('T') + 1, 
                    currentTicket.estimatedEntryTime.indexOf('T') + 6)
                  }
                </span>
                <div id="ticket-ref">
                  <span>Ref ticket : </span>
                  <span className="ref"> {currentTicket.id}</span>
                </div>
              </div>
            </div>
            <div className="right">
              <div id="covers-nb">
                <span className="covers-title">Nombre de couverts&nbsp;:</span>
                <span className="covers">{currentTicket.coversNb}</span>
                <div className="add-ticket">
                  <span id="confirm">Confirmer</span>
                  <span id="cancel">Annuler</span>
                </div>
              </div>
              
            </div>
          </div>
          <div id="admin-bottom-section">
              <div className="first">
              <h3>Temps d'attente actuel&nbsp;:</h3>
            <div className="estimate-waiting-time">
              <span id="less-time" onClick={handleRemoveClick}></span>
              <span id="time">{averageEatingTime} mn</span>
              <span id="more-time" onClick={handleAddClick}></span>
            </div>
            </div>
          </div>
        </div>

        {/* right section */}
        <div id="right-section">
          <div id="admin-side-section">
            <ul id="ticket-list">
              {tickets.map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} />
              ))}
            </ul>

            <div className="tickets-count">
              <span>Total en attente : 32</span><span id="add-ticket">Ajouter</span>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

// == Export
export default Admin;

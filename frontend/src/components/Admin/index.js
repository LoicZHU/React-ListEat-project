// == Import npm
import React, { useEffect } from 'react';
import Modal from 'react-modal';

// == Import
import Ticket from 'src/containers/Admin/Ticket';
import './admin.scss';
import Field from 'src/components/TicketForm/Field';

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
  cancelCurrentTicket,
  confirmCurrentTicket,

  // modal (ticket add)
  lastName,
  firstName,
  email,
  phone,
  cutlery,
  errors,
  changeTicketInputValue,
  // handleTicketSubscribe, TODO
}) => {
  useEffect(() => {
    // refresh the showed time
    setInterval(() => {
      refreshTime();
    }, 10000);
  }, []);

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

  const element = document.querySelector('#ticket-list > li');
  console.log(element);
  // const x = element.classList.add("current");

  // handle submit the ticket add
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleTicketSubscribe(); TODO
  };

  const handleConfirm = () => {
    let ticketId = currentTicket.id;
    confirmCurrentTicket(ticketId);
  }

  const handleCancel = () => {
    let ticketId = currentTicket.id;
    cancelCurrentTicket(ticketId);
  }

  // bind modal to the app div : root
  Modal.setAppElement('#root');

  // modal styles
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // modal mecanism
  let modalTitle;
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleOpen = () => {
    modalTitle.style.color = '#ff8400';
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            </div>
          </div>

          <div id="admin-middle-section">
            <div className="left">
              <div id="ticket-infos">
                <span>Nom : {currentTicket.customer.lastName} </span>
                <span>Prénom : {currentTicket.customer.firstName}</span>
                <span>Horaire estimé :&nbsp;
                  {currentTicket.estimatedEntryTime.substring(
                    currentTicket.estimatedEntryTime.indexOf('T') + 1,
                    currentTicket.estimatedEntryTime.indexOf('T') + 6,
                  )}
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
                  <span id="confirm" onClick={handleConfirm}>Placé</span>
                  <span id="cancel" onClick={handleCancel}>Absent</span>
                </div>
              </div>
            </div>
          </div>
          <div id="admin-bottom-section">
            <div className="first">
              <h3>Temps d'attente actuel&nbsp;:</h3>

              <div className="estimate-waiting-time">
                <span id="less-time" onClick={handleRemoveClick} />
                <span id="time">{averageEatingTime} mn</span>
                <span id="more-time" onClick={handleAddClick} />
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
              <span>Total en attente : {tickets.length}</span>

              <span id="add-ticket" onClick={openModal}>Ajouter</span>

              <Modal
                isOpen={open}
                onAfterOpen={handleOpen}
                onRequestClose={handleClose}
                style={customStyles}
                shouldFocusAfterRender
                shouldCloseOnEsc
                contentLabel="Ticket adding modal" // for screenreaders
              >
                <div className="modal-title">
                  <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Ajout de ticket</h2>
                  <div className="close-button" onClick={handleClose}>&#x274C;</div>
                </div>

                <div className="ticket-form--container">
                  <form className="ticket-form" onSubmit={handleSubmit}>
                    <Field
                      name="lastName"
                      placeholder="Nom"
                      onChange={changeTicketInputValue}
                      value={lastName}
                    />

                    <Field
                      name="firstName"
                      placeholder="Prénom"
                      onChange={changeTicketInputValue}
                      value={firstName}
                    />

                    <Field
                      name="email"
                      type="email"
                      placeholder="Adresse Email"
                      onChange={changeTicketInputValue}
                      value={email}
                    />

                    <Field
                      name="phone"
                      placeholder="Téléphone"
                      onChange={changeTicketInputValue}
                      value={phone}
                    />

                    <Field
                      name="cutlery"
                      type="number"
                      placeholder="Nombre de couverts"
                      onChange={changeTicketInputValue}
                      value={cutlery}
                    />

                    {errors && errors.field=='coversNb' && (
                        <span className="cover-error">{errors.message}</span>
                    )}
                    <button className="ticket-submit button-alt" type="submit">Inscription</button>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

// == Export
export default Admin;

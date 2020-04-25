// == Import npm
import React, { useEffect } from 'react';
import Modal from 'react-modal';

// == Import
import Ticket from 'src/containers/Admin/Ticket';
import './admin.scss';
import Field from 'src/components/TicketForm/Field';
import { store } from 'react-notifications-component';

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
  handleModalTicketValidate,
  handleModalTicketCancel,
  showModalTicketValidation,
  handleShowModalTicketForm,
  handleShowModalTicketValidation,
  showModalErrors,
  showModalEmailError,

  // modal (ticket add)
  lastName,
  firstName,
  email,
  phone,
  cutlery,
  errors,
  changeTicketInputValue,
  handleTicketSubscribe,
  estimatedEntryTime,
  modalErrors,
  emailError,

}) => {
  
  useEffect(() => {
    // refresh the showed time
    setInterval(() => {
      refreshTime();
    }, 10000);
  }, []);

  useEffect(() => {
    //set first ticket as current
    const setFirstTicketAsCurrent = () => {
      const actualCurrentElement = document.querySelector('#ticket-list li.current');
      if (actualCurrentElement == null && tickets.length > 0) {
        document.querySelector('#ticket-list > li').classList.add('current');
      } else {}
    };
    setFirstTicketAsCurrent();
  }, [tickets]);

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

  // handle submit the ticket add
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setOpen(false);
    store.addNotification({
      title: "Nouveau ticket",
      message: "Votre ticket a bien été ajouté !",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true
      },
    });
    handleTicketSubscribe();
  };

  const handleConfirm = () => {
    let ticketId = currentTicket.id;
    confirmCurrentTicket(ticketId);
  };

  const handleCancel = () => {
    let ticketId = currentTicket.id;
    cancelCurrentTicket(ticketId);
  };

  const handleTicketValidation = () => {
    // e.preventDefault();
    handleModalTicketValidate();
    handleModalTicketValidation();
  };

  const handleTicketCancel = () => {
    setOpen(false);
    handleModalTicketCancel();
    handleShowModalTicketForm();
  };

  const handleOnAfterClose = () => {
    handleShowModalTicketForm();
  };

  const handleModalErrors = () => {
    showModalErrors();
  };

  const handleModalEmailError = () => {
    showModalEmailError();
  };

  const handleModalTicketValidation = () => {
    if   ((!firstName.length > 0 || !lastName.length > 0 || !cutlery.length > 0)) {
      handleModalErrors();
    } else if ((email.length > 0 && !email.includes('@')) || (email.length > 0 && !email.includes('.'))) {
      handleModalEmailError();
    } else {
      handleShowModalTicketValidation();
    }
  };

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
 
  const url = new URL('http://localhost:3000/.well-known/mercure?topic=');
  url.searchParams.append('ticket', 'http://listeat.io/');
  const eventSource = new EventSource(url);
  eventSource.onmessage = e => console.log(JSON.parse(e));

  // const es = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://listeat.io/ticket'),
  //       {
  //         headers: {
  //             'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.NFCEbEEiI7zUxDU2Hj0YB71fQVT8YiQBGQWEyxWG0po',
  //         }
  //       }
  //     );
  //   es.onmessage = e => {
  //   // Will be called every time an update is published by the server
  //   console.log('ticket recu');
  // }

  return (
    (!loadingTicketsData && (
      <div id="admin-wrapper">
{/* 
         <Websocket url='ws://localhost:8001/mercure-test'
        onMessage={(data) => console.log(data)}
        /> */}

        {/* left section */}
        <div id="left-section">
          <div id="admin-top-section">
            <div className="left">
              <label className="switch">
                <input type="checkbox" checked={status} onChange={handleServiceClick} />
                <span className="slider round" />
              </label>
              <span className="toggle-name">SERVICE : </span>

              {(status === 1) &&
              <span className="toggle-state on">ON</span>
              }

              {!(status === 1) &&
              <span className="toggle-state off">OFF</span>
              }

            </div>
            <div className="right">
              <span>{currentTime}</span>
            </div>
          </div>

          <div id="admin-middle-section">
            <div className="left">
              <div id="ticket-infos">
                <span>Nom : {tickets.length > 0 ? currentTicket.customer.lastName : ''} </span>
                <span>Prénom : {tickets.length > 0 ? currentTicket.customer.firstName : ''}</span>
                <span>Horaire estimé :&nbsp; {tickets.length > 0 ? currentTicket.estimatedEntryTime.substring(
                  currentTicket.estimatedEntryTime.indexOf('T') + 1,
                  currentTicket.estimatedEntryTime.indexOf('T') + 6,
                ) : ''}
                </span>
                <div id="ticket-ref">
                  <span>Ref ticket : </span>
                  <span className="ref"> {tickets.length > 0 ? currentTicket.id : ''}</span>
                </div>
              </div>
            </div>
            <div className="right">
              <div id="covers-nb">
                <span className="covers-title">Nombre de couverts&nbsp;:</span>
                <span className="covers">{tickets.length > 0 ? currentTicket.coversNb : ''}</span>
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
                <span id="time">{averageEatingTime}</span>
                <span id="more-time" onClick={handleAddClick} />
              </div>
            </div>
            <div className="second">
              <h3>Total en attente : </h3>
                <span id="tickets-count">{tickets.length}{(tickets.length < 2 ? " ticket" : " tickets")}</span>
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
              <span id="add-ticket" onClick={openModal}>Ajouter un ticket</span>

              <Modal
                isOpen={open}
                onAfterOpen={handleOpen}
                onRequestClose={handleTicketCancel}
                onAfterClose={handleOnAfterClose}
                style={customStyles}
                shouldFocusAfterRender
                shouldCloseOnEsc
                contentLabel="Ticket adding modal" // for screenreaders
              >
                <div className="modal-title">                  
                {showModalTicketValidation && <div className="previous-button" onClick={handleShowModalTicketForm}></div>}
                {!showModalTicketValidation &&<div className="close-button" onClick={handleTicketCancel}>Fermer {/* &#x274C; */} </div>}
                </div>

                 <div className="ticket-form--container">
                  {!showModalTicketValidation && <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Ajout de ticket</h2> }
                  <form className="ticket-form" onSubmit={handleSubmit} >
                  {!showModalTicketValidation &&
                  <>
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
                      type="number"
                      step="5"
                      min="0"
                    />

                  { modalErrors &&
                    <div id="errors">
                      <span> Merci de compléter les champs <strong>Nom</strong>, <strong>Prénom</strong> et <strong>Nombre de couverts</strong>.</span>
                    </div>
                  }


                  { emailError &&
                    <div id="errors">
                      <span> Merci de vérifier l'adresse mail.</span>
                  </div>
                  }

                    {errors && errors.field=='coversNb' && (
                      <span className="cover-error">{errors.message}</span>
                    )}
                    </>
                  }

                    { showModalTicketValidation &&
                    <>
                    <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Récapitulatif</h2>
                    <h3>Prénom</h3>
                    <span>{lastName}</span>
                    <h3>Nom</h3>
                    <span>{firstName}</span>
                    {(email.length > 1) && 
                      <>
                        <h3>Email</h3>
                        <span>{email}</span>
                      </> 
                    }
                    {(phone.length > 1) && 
                      <>
                        <h3>Téléphone</h3>
                        <span>{phone}</span>
                      </> 
                    }
                    <h3>Nombre de couverts</h3>
                    <span>{cutlery}</span>
                    <h3>Heure estimée</h3>
                    <span id="estimated-entry">{estimatedEntryTime}</span>

                    <div className="bottom">
                      <div className="cancel-button" onClick={handleTicketCancel}>Annuler</div>
                      <button className="ticket-submit button-alt" type="submit" >Valider</button>
                    </div>
                    </>
                    }
                    
                    { !showModalTicketValidation &&
                      <div className="bottom">
                        <a className="ticket-next button-alt" onClick={handleTicketValidation}>
                          Suivant
                        </a>
                      </div>
                    }
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

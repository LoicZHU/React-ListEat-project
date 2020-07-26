== Import npm
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
  fetchTicketsData,
  restaurantId,
  handleMobileClockClick,

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
  mobileClockClickState,
  handleClearModalForm,

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
      const actualCurrentElement = document.querySelector('#admin-mobile-wrapper #ticket-list li.current');
      if (actualCurrentElement == null && tickets.length > 0) {
        document.querySelector('#admin-mobile-wrapper #ticket-list > li').classList.add('current');
      }
    };
    setFirstTicketAsCurrent();
  }, [tickets]);

  useEffect(() => {
    //set first ticket as current
    const setFirstTicketAsCurrentDesktop = () => {
      const actualCurrentElementDesktop = document.querySelector('#admin-desktop-wrapper #ticket-list li.current');
      if (actualCurrentElementDesktop == null && tickets.length > 0) {
        document.querySelector('#admin-desktop-wrapper #ticket-list > li').classList.add('current');
      }
    };
    setFirstTicketAsCurrentDesktop();
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
        onScreen: true,
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
    handleClearModalForm();
  };

  const handleOnAfterClose = () => {
    handleShowModalTicketForm();
    handleClearModalForm();
  };

  const handleModalErrors = () => {
    showModalErrors();
  };

  const handleModalEmailError = () => {
    showModalEmailError();
  };

  const handleModalTicketValidation = () => {
    if ((!firstName.length > 0 || !lastName.length > 0 || cutlery.length === 0 || cutlery == "0" )) {
      handleModalErrors();
    }

    else if ((email.length > 0 && !email.includes('@')) || (email.length > 0 && !email.includes('.'))) {
      handleModalEmailError();
    }

    else {
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

  // handle mobile clock button click
  const handleMobileClockButtonClick = () => {
    if (mobileClockClickState === 'flex') {
      handleMobileClockClick('none');
    } else {
      handleMobileClockClick('flex');
    }
  };
 
  // websocket to place a event listener on the topic 'ticket' with the current restaurantId
  var topic = 'ticket';
  // const url = new URL('https://www.listeat.io/hub/.well-known/mercure');
  // const url = new URL('http://localhost:3000/.well-known/mercure');
  // const url = new URL('http://ec2-100-26-241-214.compute-1.amazonaws.com:3000/.well-known/mercure');

  // url.searchParams.append('topic', `https://www.listeat.io/${topic}/${restaurantId}`);
  // url.searchParams.append('topic', `http://localhost:8080/${topic}/${restaurantId}`);
  // url.searchParams.append('topic', `http://ec2-100-26-241-214.compute-1.amazonaws.com/${topic}/${restaurantId}`);
  // const eventSource = new EventSource(url);

  // when a ticket is added to the DB, the server pushes a message to the front
  // then we update the ticket list 
  // eventSource.onmessage = function(event) {
  //      fetchTicketsData();
  // };

  // websocket to place a event listener on the topic 'ticket' with the current restaurantId
  var topicDelete = 'ticket-delete';
  // const urlDelete = new URL('http://localhost:3000/.well-known/mercure');
  // urlDelete.searchParams.append('topic', `http://localhost:8080/${topicDelete}/${restaurantId}`);
  // const urlDelete = new URL('https://www.listeat.io/hub/.well-known/mercure');
  // urlDelete.searchParams.append('topic', `https://www.listeat.io/${topicDelete}/${restaurantId}`);
  
  // const urlDelete = new URL('http://ec2-100-26-241-214.compute-1.amazonaws.com:3000/.well-known/mercure');
  // urlDelete.searchParams.append('topic', `http://ec2-100-26-241-214.compute-1.amazonaws.com/${topicDelete}/${restaurantId}`);
  // const eventSourceDelete = new EventSource(urlDelete);

  // when a ticket is deleteed in the DB, the server pushes a message to the front
  // then we update the ticket list 
//   eventSourceDelete.onmessage = function(event) {
//     fetchTicketsData();
// };

  

  return (
    (!loadingTicketsData && (
      <>
      <div id="admin-mobile-wrapper">

        {/* left section */}
        <div id="left-section">
          <div id="admin-top-section">
            <div className="left">
              <label className="switch">
                <input type="checkbox" checked={status} onChange={handleServiceClick} />
                <span className="slider round" />
              </label>
              <span className="toggle-name">SERVICE : </span>

              {(status === 1) && <span className="toggle-state on">ON</span>}

              {!(status === 1) && <span className="toggle-state off">OFF</span>}
            </div>

            <div className="right">
              <span>{currentTime}</span>
            </div>
          </div>

          <div id="admin-middle-section">
            {tickets.length === 0 && (
              <div id="empty-ticket-overlay">
                <span>Pas de ticket en cours</span>
              </div>
            )}

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
                <span className="covers">{tickets.length > 0 ? currentTicket.coversNb : ''}<i className="fa fa-cutlery" aria-hidden="true"></i></span>
                
                {tickets.length > 0 && <div className="add-ticket">
                  <span id="confirm" onClick={handleConfirm}>Placé</span>
                  <span id="cancel" onClick={handleCancel}>Absent</span>
                
                </div>}
              </div>
            </div>
          </div>

          <div id="admin-bottom-section" style={mobileClockClickState == 'none' ? {display: 'none'} : {display: 'flex'}}>
            <div className="first">
              <h3>Temps de repas moyen&nbsp;:</h3>

              <div className="estimate-waiting-time">
                {(status === 1) && <span id="less-time" onClick={handleRemoveClick} />}

                <div id="time-container">
                  <span id="time">{averageEatingTime}</span>
                </div>

                {(status === 1) && <span id="more-time" onClick={handleAddClick} />}
              </div>
            </div>
            <div className="second">
              <h3>Total en attente : </h3>
                <span id="tickets-count">{tickets.length}{(tickets.length < 2 ? ' ticket' : ' tickets')}</span>
            </div>
          </div>
        </div>

        {/* right section */}
        <div id="right-section">
          <div id="admin-side-section">
            <ul id="ticket-list">
              {tickets.length === 0 && (
                <div id="empty-list-add-ticket">
                  {(status === 0) && <span id="service-off">Pour ajouter un ticket, lancez le service.</span>}

                  {(status === 1) && (
                    <>
                      <span>Pour ajouter un ticket, c'est ici</span>
                      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.proctorgallagherinstitute.com%2Fwp-content%2Fuploads%2F2019%2F03%2Forange-curved-arrow.png&f=1&nofb=1"/>
                    </>
                  )}
                </div>
              )}

              {tickets.map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} />
              ))}
            </ul>

            <div className="tickets-count">
              {(status === 0) && <span id="service-off">Service à l'arrêt</span>}
              <span id="mobile-time-button" onClick={handleMobileClockButtonClick}><i className="fa fa-clock-o" aria-hidden="true"></i></span>
              {(status === 1) && <span id="add-ticket" onClick={openModal}>Ajouter un ticket</span>}

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
                  {showModalTicketValidation && <div className="previous-button" onClick={handleShowModalTicketForm} />}
                  {!showModalTicketValidation && <div className="close-button" onClick={handleTicketCancel}>Fermer {/* &#x274C; */} </div>}
                </div>

                <div className="ticket-form--container">
                  {!showModalTicketValidation && <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Ajout de ticket</h2> }

                  <form className="ticket-form" onSubmit={handleSubmit}>
                    {!showModalTicketValidation && (
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
                          step="5"
                          min="0"
                        />

                        { modalErrors && (
                          <div id="errors">
                            <span> Merci de compléter les champs <strong>Nom</strong>, <strong>Prénom</strong> et <strong>Nombre de couverts</strong>.</span>
                          </div>
                        )}


                        { emailError && (
                          <div id="errors">
                            <span> Merci de vérifier l'adresse mail.</span>
                          </div>
                        )}

                        {errors && errors.field=='coversNb' && (
                          <span className="cover-error">{errors.message}</span>
                        )}
                      </>
                    )}

                    { showModalTicketValidation && (
                      <>
                        <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Récapitulatif</h2>
                        <h3>Prénom</h3>
                        <span>{lastName}</span>

                        <h3>Nom</h3>
                        <span>{firstName}</span>
 
                        {(email.length > 1) && (
                          <>
                            <h3>Email</h3>
                            <span>{email}</span>
                          </>
                        )}

                        {(phone.length > 1) && (
                          <>
                            <h3>Téléphone</h3>
                            <span>{phone}</span>
                          </>
                        )}

                        <h3>Nombre de couverts</h3>
                        <span>{cutlery}</span>

                        <h3>Heure estimée</h3>
                        <span id="estimated-entry">{estimatedEntryTime}</span>

                        <div className="bottom">
                          <div className="cancel-button" onClick={handleTicketCancel}>Annuler</div>
                          <button className="ticket-submit button-alt" type="submit">Valider</button>
                        </div>
                      </>
                    )}

                    { !showModalTicketValidation && (
                      <div className="bottom">
                        <a className="ticket-next button-alt" onClick={handleTicketValidation}>
                          Suivant
                        </a>
                      </div>
                    )}
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <div id="admin-desktop-wrapper">

        {/* left section */}
        <div id="left-section">
          <div id="admin-top-section">
            <div className="left">
              <label className="switch">
                <input type="checkbox" checked={status} onChange={handleServiceClick} />
                <span className="slider round" />
              </label>
              <span className="toggle-name">SERVICE : </span>

              {(status === 1) && <span className="toggle-state on">ON</span>}

              {!(status === 1) && <span className="toggle-state off">OFF</span>}
            </div>

            <div className="right">
              <span>{currentTime}</span>
            </div>
          </div>

          <div id="admin-middle-section">
            {tickets.length === 0 && (
              <div id="empty-ticket-overlay">
                <span>Pas de ticket en cours</span>
              </div>
            )}

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
                <span className="covers">{tickets.length > 0 ? currentTicket.coversNb : ''}<i className="fa fa-cutlery" aria-hidden="true"></i></span>
                
                <div className="add-ticket">
                  <span id="confirm" onClick={handleConfirm}>Placé</span>
                  <span id="cancel" onClick={handleCancel}>Absent</span>
                </div>
              </div>
            </div>
          </div>

          <div id="admin-bottom-section" style={mobileClockClickState == 'none' ? {display: 'none'} : {display: 'flex'}}>
            <div className="first">
              <h3>Temps de repas moyen&nbsp;:</h3>

              <div className="estimate-waiting-time">
                {(status === 1) && <span id="less-time" onClick={handleRemoveClick} />}

                <div id="time-container">
                  <span id="time">{averageEatingTime}</span>
                </div>

                {(status === 1) && <span id="more-time" onClick={handleAddClick} />}
              </div>
            </div>
            <div className="second">
              <h3>Total en attente : </h3>
                <span id="tickets-count">{tickets.length}{(tickets.length < 2 ? ' ticket' : ' tickets')}</span>
            </div>
          </div>
        </div>

        {/* right section */}
        <div id="right-section">
          <div id="admin-side-section">
            <ul id="ticket-list">
              {tickets.length === 0 && (
                <div id="empty-list-add-ticket">
                  {(status === 0) && <span id="service-off">Pour ajouter un ticket, lancez le service.</span>}

                  {(status === 1) && (
                    <>
                      <span>Pour ajouter un ticket, c'est ici</span>
                      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.proctorgallagherinstitute.com%2Fwp-content%2Fuploads%2F2019%2F03%2Forange-curved-arrow.png&f=1&nofb=1"/>
                    </>
                  )}
                </div>
              )}

              {tickets.map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket} />
              ))}
            </ul>

            <div className="tickets-count">
              {(status === 0) && <span id="service-off">Service suspendu</span>}
              <span id="mobile-time-button" onClick={handleMobileClockButtonClick}><i className="fa fa-clock-o" aria-hidden="true"></i></span>
              {(status === 1) && <span id="add-ticket" onClick={openModal}>Ajouter un ticket</span>}

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
                  {showModalTicketValidation && <div className="previous-button" onClick={handleShowModalTicketForm} />}
                  {!showModalTicketValidation && <div className="close-button" onClick={handleTicketCancel}>Fermer {/* &#x274C; */} </div>}
                </div>

                <div className="ticket-form--container">
                  {!showModalTicketValidation && <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Ajout de ticket</h2> }

                  <form className="ticket-form" onSubmit={handleSubmit}>
                    {!showModalTicketValidation && (
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
                          step="5"
                          min="0"
                        />

                        { modalErrors && (
                          <div id="errors">
                            <span> Merci de compléter les champs <strong>Nom</strong>, <strong>Prénom</strong> et <strong>Nombre de couverts</strong>.</span>
                          </div>
                        )}


                        { emailError && (
                          <div id="errors">
                            <span> Merci de vérifier l'adresse mail.</span>
                          </div>
                        )}

                        {errors && errors.field=='coversNb' && (
                          <span className="cover-error">{errors.message}</span>
                        )}
                      </>
                    )}

                    { showModalTicketValidation && (
                      <>
                        <h2 ref={_modalTitle => (modalTitle = _modalTitle)}>Récapitulatif</h2>
                        <h3>Prénom</h3>
                        <span>{lastName}</span>

                        <h3>Nom</h3>
                        <span>{firstName}</span>
 
                        {(email.length > 1) && (
                          <>
                            <h3>Email</h3>
                            <span>{email}</span>
                          </>
                        )}

                        {(phone.length > 1) && (
                          <>
                            <h3>Téléphone</h3>
                            <span>{phone}</span>
                          </>
                        )}

                        <h3>Nombre de couverts</h3>
                        <span>{cutlery}</span>

                        <h3>Heure estimée</h3>
                        <span id="estimated-entry">{estimatedEntryTime}</span>

                        <div className="bottom">
                          <div className="cancel-button" onClick={handleTicketCancel}>Annuler</div>
                          <button className="ticket-submit button-alt" type="submit">Valider</button>
                        </div>
                      </>
                    )}

                    { !showModalTicketValidation && (
                      <div className="bottom">
                        <a className="ticket-next button-alt" onClick={handleTicketValidation}>
                          Suivant
                        </a>
                      </div>
                    )}
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      </>
    ))
  );
};

// == Export
export default Admin;

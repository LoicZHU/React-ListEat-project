// == Import npm
import React, { useEffect } from 'react';
// == Import
import './cancellationbymail.scss';
// == Composant
const CancellationByMail = ({
  fetchTicketDataToCancel,
  restaurantName,
  ticketId,
  lastName,
  firstName,
  cutlery,
  estimatedEntryTime,
  estimatedWaitingTime,
  status,
  ticketInfoLoaded,
  cancelTicket,
  displayCancelConfirmation,
}) => {
  useEffect(() => {
    fetchTicketDataToCancel();
  }, []);
  const handleCancel = () => {
    cancelTicket();
  };
  return (
    (ticketInfoLoaded && (
      <main id="cancellation-by-mail">
        <h1>Annulation de ticket </h1>
        <h2>{restaurantName}</h2>
        {displayCancelConfirmation && (
          <div id="cancel-confirmation">
            <span>
              Merci, vous avez bien annulé votre ticket. A bientôt !
            </span>
          </div>
        )}
        <div id="cancel-infos">
          <p>Numéro de ticket : <span>{ticketId}</span></p>
          <p>Nom : <span>{lastName}</span></p>
          <p>Prénom : <span>{firstName}</span></p>
          <p>Nombre de couverts : <span>{cutlery}</span></p>
          <p>Temps d'attente estimée : <span>{estimatedWaitingTime}</span></p>
          <p>Heure d'entrée estimée :
            <span> {estimatedEntryTime ? estimatedEntryTime.substring(
              estimatedEntryTime.indexOf('T') + 1,
              estimatedEntryTime.indexOf('T') + 6,
            ) : ''}
            </span>
          </p>
          {/* status 1 = ticket default value */}
          {status === 1 && !displayCancelConfirmation && (
            <>
              <p>Pour annuler votre ticket, appuyez sur le bouton suivant :</p>
              <button className="yes__button button-alt" type="button" onClick={handleCancel}>Annuler</button>
            </>
          )}
          {/* status 2 = ticket canceled */}
          {status === 2 && <div>Le ticket a été annulé.</div>}
        </div>
      </main>
    ))
  );
};
// == Export
export default CancellationByMail;

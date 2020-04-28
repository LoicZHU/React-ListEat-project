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
      <main>
        <h1>Annulation de ticket </h1>
        <h2>{restaurantName}</h2>

        {displayCancelConfirmation && (
          <div>
            <span id="cancel-confirmation">
              Merci, vous avez bien annulé votre ticket. A bientôt !
            </span>
          </div>
        )}

        <div>
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

          <p>Pour annuler votre ticket, appuyez sur le bouton suivant :</p>
          <button className="yes__button button" type="button" onClick={handleCancel}>Annuler</button>
        </div>
      </main>
    ))
  );
};

// == Export
export default CancellationByMail;

// == Import npm
import React from 'react';

// == Import
import './confirmation.scss';

// == Composant
const Confirmation = ({ ticketId, ticketCutlery, ticketEstimatedEntryTime }) => {

  window.scrollTo(0,0);

  return (
  <main className="ticket__confirmation">
    <h1>Félicitations, </h1>
    <h2>vous êtes sur la liste d'attente !</h2>

    <div className="ticket__confirmation__message">
      <p>Un email vous a été envoyé avec les informations de votre ticket, vous pouvez donc fermer cette page.</p>
      <p>Merci d'être présent à l'heure estimée et au complet.</p>
    </div>

    <div className="ticket__confirmation__infos">
      <p>Numéro de ticket : <span className="ticket__confirmation__info">{ticketId}</span></p>
      <p>Nombre de couverts : <span className="ticket__confirmation__info">{ticketCutlery}</span></p>
      <p>Heure d'entrée estimée :
        <span className="ticket__confirmation__info"> {ticketEstimatedEntryTime ? ticketEstimatedEntryTime.substring(
          ticketEstimatedEntryTime.indexOf('T') + 1,
          ticketEstimatedEntryTime.indexOf('T') + 6,
        ) : ''}
        </span>
      </p>
    </div>

  </main>
  )
};

// == Export
export default Confirmation;

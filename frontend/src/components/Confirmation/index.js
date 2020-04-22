// == Import npm
import React from 'react';

// == Import
import './confirmation.scss';

// == Composant
const Confirmation = ({ ticketId, ticketCutlery, ticketWaitingTime }) => (
  <main className="ticket__confirmation">
    <h1>Félicitations, vous êtes sur la liste d'attente !</h1>

    <div className="ticket__confirmation__message">
      <p>Vous serez notifié par e-mail lorsque vous tour sera imminent.<br />Le restaurateur vous invitera à vous installer.</p>
      <p>Merci de vous présenter au complet.</p>
    </div>

    <div className="ticket__confirmation__infos">
      <p>Numéro de ticket : <span className="ticket__confirmation__info">{ticketId}</span></p>
      <p>Nombre de couverts souhaités : <span className="ticket__confirmation__info">{ticketCutlery}</span></p>
      <p>Temps d'attente estimé : <span className="ticket__confirmation__info">{ticketWaitingTime} minutes</span></p>
    </div>
  </main>
);

// == Export
export default Confirmation;

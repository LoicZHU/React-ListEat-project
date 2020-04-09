// == Import npm
import React from 'react';

// == Import
import './confirmation.scss';

// == Composant
const Confirmation = () => (
  <main className="ticket__confirmation">
    <h1>Félicitation, vous êtes sur la liste d'attente !</h1>

    <div className="ticket__confirmation__message">
      <p>Vous serez appelez par le restaurateur quand votre tour viendra.</p>
      <p>Merci de vous présenter au complet dans la file d'attente.</p>
    </div>

    <div className="ticket__confirmation__infos">
      <p>Numéro de ticket : <span className="ticket__confirmation__info">XXXX</span></p>
      <p>Nombre de couverts souhaités : <span className="ticket__confirmation__info">XX</span></p>
      <p>Temps d'attente estimé : <span className="ticket__confirmation__info">XXX minutes</span></p>
    </div>
  </main>
);

// == Export
export default Confirmation;

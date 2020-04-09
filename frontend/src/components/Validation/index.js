// == Import npm
import React from 'react';

// == Import
import './validation.scss';

// == Composant
const Validation = () => (
  <main className="ticket__validation">
    <h1>Nom du resto</h1>

    <div className="ticket__validation__infos">
      <p>Nombre de couverts souhaités : <span className="ticket__validation__info">XX</span></p>
      <p>Temps d'attente estimé : <span className="ticket__validation__info">XXX minutes</span></p>
    </div>

    <div className="ticket__validation__question">
      <p>Souhaitez-vous vous inscrire sur la liste d'attente ?</p>

      <button className="yes__button button" type="button">Oui</button>
      <button className="no__button button" type="button">Non</button>
    </div>
  </main>
);

// == Export
export default Validation;

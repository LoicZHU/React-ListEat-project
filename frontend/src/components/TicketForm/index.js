// == Import npm
import React from 'react';

// == Import
import './ticketform.scss';
import Field from './Field';

// == Composant
const TicketForm = () => (
  <main className="ticket-form--container">
    <h1>S'inscrire sur la liste d'attente du restaurant XXXXXXXXXXXX</h1>

    <form className="ticket-form">
      <Field
        name="lastname"
        placeholder="Nom"
      />

      <Field
        name="firstname"
        placeholder="Prénom"
      />

      <Field
        name="email"
        type="email"
        placeholder="Adresse Email"
      />

      <Field
        name="phone"
        placeholder="Téléphone"
      />

      <Field
        name="cutlery"
        type="number"
        placeholder="Nombre de couverts"
      />

      <button className="ticket-submit button-alt" type="submit">Inscription</button>
    </form>
  </main>
);

// == Export
export default TicketForm;

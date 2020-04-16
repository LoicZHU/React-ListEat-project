// == Import npm
import React from 'react';

// == Import
import './ticketform.scss';
import Field from './Field';

// == Composant
const TicketForm = ({
  lastName,
  firstName,
  email,
  phone,
  cutlery,
  changeTicketInputValue,
  handleTicketSubscribe,
}) => {
  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleTicketSubscribe();
  };
  
  return (
    <main className="ticket-form--container">
      <h1>S'inscrire sur la liste d'attente du restaurant XXXXXXXXXXXX</h1>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <Field
          name="lastName"
          placeholder="Nom"
          onChange={changeTicketInputValue}
          value={lastName}
          required
        />

        <Field
          name="firstName"
          placeholder="Prénom"
          onChange={changeTicketInputValue}
          value={firstName}
          required
        />

        <Field
          name="email"
          type="email"
          placeholder="Adresse Email"
          onChange={changeTicketInputValue}
          value={email}
          required
        />

        <Field
          name="phone"
          placeholder="Téléphone"
          onChange={changeTicketInputValue}
          value={phone}
          required
        />

        <Field
          name="cutlery"
          type="number"
          placeholder="Nombre de couverts"
          onChange={changeTicketInputValue}
          value={cutlery}
          required
        />

        <button className="ticket-submit button-alt" type="submit">Inscription</button>
      </form>
    </main>
  );
};

// == Export
export default TicketForm;

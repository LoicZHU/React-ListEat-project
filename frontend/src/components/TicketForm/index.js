// == Import npm
import React, { useEffect } from 'react';

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
  errors,
}) => {
  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleTicketSubscribe();
  };

  if (errors && errors.field=='coversNb') {
    console.log(errors.message);
  }

  return (
    <main className="ticket-form--container">
      <h1>S'inscrire sur la liste d'attente du restaurant XXXXXXXXXXXX</h1>

      <form className="ticket-form" onSubmit={handleSubmit}>
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
        />

        {errors && errors.field=='coversNb' && (
            <span className="cover-error">{errors.message}</span>
        )}

        <button className="ticket-submit button-alt" type="submit">Inscription</button>
      </form>
    </main>
  );
};

// == Export
export default TicketForm;

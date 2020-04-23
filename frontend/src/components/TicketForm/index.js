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
  getRestaurantInfos,
  restaurantName,
  restaurantNameLoaded,
  restaurantServiceStatus,
  ticketSubscriptionErrors,
}) => {
  useEffect(() => {
    getRestaurantInfos();
  }, []);

  window.scrollTo(0,0);

  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (restaurantServiceStatus === 1) {
      handleTicketSubscribe();
    }
  };

  if (errors && errors.field=='coversNb') {
    console.log(errors.message);
  }

  return (
    <main className="ticket-form--container">
      {restaurantNameLoaded && (
        <>
          <h1>S'inscrire sur la liste d'attente du restaurant {restaurantName}</h1>

          {(restaurantServiceStatus === 0) && (
            <p className="service-off">Le restaurant est fermé ou ne peut plus accepter de nouveaux clients.</p>
          )}

          {(restaurantServiceStatus === 1) && (
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

              {(ticketSubscriptionErrors !== '') && (
                <div className="warning">{ticketSubscriptionErrors}</div>
              )}
            </form>
          )}
        </>
      )}
    </main>
  );
};

// == Export
export default TicketForm;

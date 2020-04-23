// == Import npm
import React from 'react';

// == Import
import './cancellation.scss';

// == Composant
const Cancellation = ({ restaurantUrlId }) => {
  
  window.scrollTo(0,0);

    return (
    <main className="ticket__cancellation">
      <h1>Dommage !</h1>

      <p>Vous avez annulé votre demande.</p>

      {/* <a className="ticket__cancellation__link" href={`/restaurant/${restaurantUrlId}/tickets/add`}> */}
      <a className="ticket__cancellation__link" href={`/restaurant/${localStorage.getItem('restaurantUrlId')}/tickets/add`}>
        Revenir sur la page d'inscription à la liste d'attente
      </a>
    </main>
    );
  };

// == Export
export default Cancellation;

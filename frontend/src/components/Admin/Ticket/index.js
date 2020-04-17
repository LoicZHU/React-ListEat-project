// == Import npm
import React from 'react';

// == Import
import './ticket.scss';

// == Composant
const Ticket = ({ ticket }) => {
  const { coversNb, customer } = ticket;

  return (
    <li className="ticket">
      <i className="fa fa-info-circle" aria-hidden="true"></i>{customer.firstName}<i className="fa fa-user" aria-hidden="true"></i>
      <span>{coversNb}</span>
    </li>
  )
};

// == Export
export default Ticket;

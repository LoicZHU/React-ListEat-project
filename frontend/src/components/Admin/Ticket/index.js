// == Import npm
import React from 'react';

// == Import
import './ticket.scss';

// == Composant
const Ticket = ({ ticket, updateCurrentTicket }) => {
  const { coversNb, customer } = ticket;

  return (
    <li className="ticket" id={ticket.id} onClick={() => updateCurrentTicket(ticket)} >
      <i className="fa fa-info-circle" aria-hidden="true"></i>{customer.firstName}<i className="fa fa-user" aria-hidden="true">
      <span>{coversNb}</span> </i>
    </li>
  )
};

// == Export
export default Ticket;

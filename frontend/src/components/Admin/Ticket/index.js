// == Import npm
import React from 'react';

// == Import
import './ticket.scss';

// == Composant
const Ticket = ({ ticket, updateCurrentTicket }) => {
  const { coversNb, customer } = ticket;

  const handleClick = (e) => {
    updateCurrentTicket(ticket);
    const elements = document.querySelectorAll('.current');
    elements.forEach(element => {
      element.classList.remove('current');
    });
    const element = e.target;
    element.classList.toggle('current');
  };

  return (
    <li className="ticket" id={ticket.id} onClick={(e) => handleClick(e)} >
      <i className="fa fa-info-circle" aria-hidden="true"></i>{customer.firstName}<i className="fa fa-user" aria-hidden="true">
      <span>{coversNb}</span> </i>
    </li>
  )
};

// == Export
export default Ticket;

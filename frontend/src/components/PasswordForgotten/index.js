import React from 'react';
// import PropTypes from 'prop-types';

import ConfirmationMessage from './ConfirmationMessage';

import './passwordforgotten.scss';

const Login = () => {

  return (
    <div className="form-container">
      <h1>Réinitialisez votre mot de passe</h1>    
      <form id="login-form">
      <input id="user-input" placeholder="Adresse email"/>
      {false && <ConfirmationMessage />}
      {true && <button className="button">Envoyer</button>}
    </form>
    </div>
  );

};

export default Login;

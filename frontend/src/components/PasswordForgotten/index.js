import React from 'react';
// import PropTypes from 'prop-types';

import ConfirmationMessage from './ConfirmationMessage';

import './passwordforgotten.scss';

const Login = () => (
  <div className="form-container">
    <h1>Réinitialisez votre mot de passe</h1>

    <form id="login-form">
      <input
        id="user-input"
        placeholder="Nouveau mot de passe"
        required
      />

      {false && <ConfirmationMessage />}

      {true && <button className="button">Envoyer</button>}
    </form>
  </div>
);

export default Login;

import React from 'react';
// import PropTypes from 'prop-types';

import './passwordforgotten.scss';
import ConfirmationMessage from './ConfirmationMessage';
import ErrorMessage from './ErrorMessage'

const Login = ({
  changePasswordResetInputValue,
  handleSendEmail,
  email,
  emailError,
  emailConfirmation,
  resetPasswordRequestSent,
}) => {

  // handle input change
  const handleChange = (evt) => {
    changePasswordResetInputValue(evt.target.value, evt.target.name);
  };

    // handle form submit
    const handleSubmit = (e) => {
      e.preventDefault();
      handleSendEmail();
    };


    return (
    <div className="form-container">
      <h1>Réinitialisez votre mot de passe</h1>

      <form id="login-form" onSubmit={handleSubmit}>
        <p>Merci d'indiquer l'adresse mail rattachée à votre compte </p>
        <input
          onChange={handleChange}
          value={email}
          id="user-input"
          name="email"
          placeholder="Adresse email"
          type="email"
          required
        />

        {emailConfirmation && <ConfirmationMessage />}
        {emailError && <ErrorMessage />}

        {true && <button className="button">Envoyer</button>}
      </form>
    </div>
    );
  };

export default Login;

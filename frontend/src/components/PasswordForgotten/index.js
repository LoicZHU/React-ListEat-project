// import npm
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

// import
import './passwordforgotten.scss';
import ConfirmationMessage from './ConfirmationMessage';
import NewPasswordConfirmationMessage from './NewPasswordConfirmationMessage';
import NewPasswordErrorMessage from './NewPasswordErrorMessage';

import ErrorMessage from './ErrorMessage';
import CodeErrorMessage from './CodeErrorMessage';

const Login = ({
  changePasswordResetInputValue,
  handleSendEmail,
  email,
  emailError,
  emailConfirmation,
  inputCode,
  serverCode,
  showNewPasswordField,
  showVerificationCodeError,
  newPasswordField,
  verificationCodeError,
  newPassword,
  newPasswordSubmit,
  newPasswordConfirmed,
  clearForgottenPasswordPage,
}) => {
  useEffect(() => {
    clearForgottenPasswordPage();
  }, []);

  // handle input change
  const handleChange = (evt) => {
    changePasswordResetInputValue(evt.target.value, evt.target.name);
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendEmail();
  };

  // handle verification submit
  const handleCodeSubmit = (e) => {
    e.preventDefault();

    if (serverCode == inputCode) {
      showNewPasswordField();
    }
    else {
      showVerificationCodeError();
    }
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    newPasswordSubmit();
  };

  return (
    <div className="form-container">
      <h1>Réinitialisez votre mot de passe</h1>

      {(!emailConfirmation && !newPasswordConfirmed) && (
        <form id="password-reset-form" onSubmit={handleSubmit}>
          <p>Merci d'indiquer l'adresse mail rattachée à votre compte.</p>
          <input
            onChange={handleChange}
            value={email}
            id="user-input"
            name="email"
            placeholder="Adresse email"
            type="email"
            required
          />

          {emailError && <ErrorMessage />}

          {true && <button className="button-alt" type="submit">Envoyer</button>}
        </form>
      )}

      {emailConfirmation && !newPasswordField && (
        <form id="password-reset-form" onSubmit={handleCodeSubmit}>
          <p>Merci d'indiquer le code de vérification envoyé par email.</p>

          <input
            placeholder="Code de confirmation"
            // type="number"
            // maxLength="6"
            name="inputCode"
            onChange={handleChange}
            value={inputCode}
            required
          />

          { verificationCodeError && <CodeErrorMessage />}

          {true && <button className="button-alt" type="submit">Envoyer</button>}
        </form>
      )}

      {emailConfirmation && newPasswordField && !newPasswordConfirmed && (
        <form id="password-reset-form" onSubmit={handleNewPasswordSubmit}>
          <p>Merci d'indiquer votre nouveau mot de passe.</p>

          <input
            placeholder="Nouveau mot de passe"
            minLength="6"
            type="password"
            name="newPassword"
            onChange={handleChange}
            value={newPassword}
            required
          />

          <button className="button-alt" type="submit">Envoyer</button>
        </form>
      )}

      {newPasswordConfirmed && <NewPasswordConfirmationMessage />}
    </div>
  );
};

export default Login;

// import npm
import React from 'react';
import PropTypes from 'prop-types';

// import
import './form.scss';
import ErrorMessage from './ErrorMessage';

// component
const Form = ({
  email,
  password,
  changeInputValue,
  handleLogin,
  errorMessage,
}) => {
  // handle input change
  const handleChange = (evt) => {
    changeInputValue(evt.target.value, evt.target.name);
  };

  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <input
        id="user-input"
        name="email"
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={handleChange}
        required
      />
      <input
        id="password-input"
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={handleChange}
        required
      />

      {errorMessage && <ErrorMessage />}

      <button className="button" type="submit">Connexion</button>

      <span className="bottom-links"><a href="/forgotten-password">Identifiant ou mot de passe oublié&nbsp;?</a></span>

      <span className="bottom-links"><a href="/signup">Vous n'avez pas de compte ? Créez-en un en 5 minutes&nbsp;!</a></span>
    </form>
  );
};

// props check
Form.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeInputValue: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

// export
export default Form;

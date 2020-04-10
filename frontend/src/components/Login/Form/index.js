import React from 'react';
import ErrorMessage from './ErrorMessage';
import './form.scss';


const Form = () => {
  return (
    <form id="login-form">
      <input id="user-input" placeholder="Adresse email"/>
      <input id="password-input" placeholder="Mot de passe" type="password"/>
      {false && <ErrorMessage />}
      <span className="bottom-links"><a href="/forgotten-password">Identifiant ou mot de passe oublié ?</a></span>
      <button className="button">Connexion</button>
      <span className="bottom-links"><a href="/signup">Vous n'avez pas de compte ? Créez-en un en 5 minutes !</a></span>
    </form>
  )
};

export default Form;

import React from 'react';
import './form.scss';


const Form = () => (
  <form id="login-form">
    <input id="user-input" placeholder="Adresse email"/>
    <input id="password-input" placeholder="Mot de passe" type="password"/>
    <span class="bottom-links"><a href="">Identifiant ou mot de passe oublié ?</a></span>
    <button className="button">Connexion</button>
    <span class="bottom-links"><a href="">Vous n'avez pas de compte ? Créez-en un en 5 minutes !</a></span>
  </form>
);

export default Form;

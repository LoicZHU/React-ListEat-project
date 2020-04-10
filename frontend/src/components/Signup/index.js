// == Import npm
import React from 'react';

// == Import
import './signup.scss';

// == Composant
const Signup = () => (
  <div className="signup-wrapper">
    <h1>Inscription</h1>
    <form id="signup-form">
      <span>Vous concernant</span>
      <input className="user" placeholder="Nom" id="lastname"></input>
      <input className="user" placeholder="Prénom" id="firstname"></input>
      <input className="user" placeholder="Adresse email" id="email"></input>
      <input className="user" placeholder="Mot de passe" id="password"></input>
      <input className="user" placeholder="Confirmation du mot de passe" id="password-confirmation"></input>
      <span>Concernant votre restaurant</span>
      <input className="restaurant" placeholder="Nom de votre restaurant" id="name"></input>
      <input className="restaurant" placeholder="Adresse" id="address"></input>
      <input className="restaurant" placeholder="Code postal" id="postcode"></input>
      <input className="restaurant" placeholder="Ville" id="city"></input>
      <input className="restaurant" placeholder="Pays" id="country"></input>
      <input className="restaurant" placeholder="N°SIRET" id="siret"></input>
      <input className="restaurant" placeholder="Temps moyen d'un repas en minutes" id="average-eating-time" type="number"></input>
      <input className="restaurant" placeholder="Nombre de places assises de votre établissement" id="covers-nomber" type="number"></input>
    </form>
    <button className="button-alt">Inscription</button>
  </div>


);

// == Export
export default Signup;

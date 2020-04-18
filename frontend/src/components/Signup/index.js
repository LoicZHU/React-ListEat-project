// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import
import './signup.scss';

// == Composant d 
const Signup = ({
  lastname,
  firstname,
  email,
  password,
  passwordConfirmation,
  restaurantName,
  address,
  postcode,
  city,
  country,
  phone,
  cis,
  averageEatingTime,
  coversNumber, 
  changeSignUpInputValue,
  handleSubscribe,
  showPasswordError,
  handleChangePasswordConfirmation,
  signupErrors,
}) => {

  // handle input change
  const handleChange = (evt) => {
    changeSignUpInputValue(evt.target.value, evt.target.name);
  };

  // const areSamePassword = false;

  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (password === passwordConfirmation && password.length > 0 ) {
      handleSubscribe();
    }
  };

  const checkPasswordConfirmation = (e) => {
    if (e.target.value == password) {
      handleChangePasswordConfirmation(false);
      handleChange(e);
    } else {
      handleChangePasswordConfirmation(true);
      handleChange(e);
    }
  };

  const checkPassword = (e) => {
    if (e.target.value == passwordConfirmation) {
      handleChangePasswordConfirmation(false);
      handleChange(e);
    }
    else {
      handleChangePasswordConfirmation(true);
      handleChange(e);
    }
  };

  return (
    <div className="signup-wrapper">
      <h1>Inscription</h1>

      <form id="signup-form" onSubmit={handleSubmit}>

        <span>Vous concernant</span>
        { signupErrors.length > 0 && (
        <div id="errors">
          <h4>Des erreurs ont été détectées :</h4>
          <ul>
            {signupErrors.map((error) => {
              if (error.field === 'email') {
                return <li><span>Email :</span> {error.message}</li>;
              }
              if (error.field === 'password') {
                return <li><span>Mot de passe :</span> {error.message}</li>;
              }
              if (error.field === 'lastname') {
                return <li><span>Nom :</span> {error.message}</li>;
              }
              if (error.field === 'firstname') {
                return <li><span>Prénom :</span> {error.message}</li>;
              }
              if (error.field === 'siretCode') {
                return <li><span>SIRET :</span> {error.message}</li>;
              }
              if (error.field === 'name') {
                return <li><span>Nom du restaurant :</span> {error.message}</li>;
              }
              if (error.field === 'address') {
                return <li><span>Adresse restaurant :</span> {error.message}</li>;
              }
              if (error.field === 'city') {
                return <li><span>Ville :</span> {error.message}</li>;
              }
              if (error.field === 'country') {
                return <li><span>Pays :</span> {error.message}</li>;
              }
              if (error.field === 'phone') {
                return <li><span>Téléphone :</span> {error.message}</li>;
              }
            })}
          </ul>
        </div>
        )}

        <input
          name="lastname"
          placeholder="Nom"
          id="lastname"
          value={lastname}
          onChange={handleChange}
          required
        />
        <input
          name="firstname"
          placeholder="Prénom"
          id="firstname"
          value={firstname}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Adresse email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          name="password" 
          type="password"
          placeholder="Mot de passe"
          id="password"
          value={password}
          onChange={handleChange, checkPassword}
        />
        <input
          name="passwordConfirmation"
          type="password"
          placeholder="Confirmation du mot de passe"
          id="password-confirmation"
          value={passwordConfirmation}
          onChange={checkPasswordConfirmation}
        />

        { showPasswordError && <span id="password-error">Les deux mots de passe ne correspondent pas.</span>}

        <span>Concernant votre restaurant</span>
        <input
          name="restaurantName"
          placeholder="Nom de votre restaurant"
          id="name"
          value={restaurantName}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Adresse"
          id="address"
          value={address}
          onChange={handleChange}
          required
        />
        <input
          name="postcode"
          placeholder="Code postal"
          id="postcode"
          value={postcode}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="Ville"
          id="city"
          value={city}
          onChange={handleChange}
          required
        />
        <input
          name="country"
          placeholder="Pays"
          id="country"
          value={country}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Téléphone"
          id="phone"
          value={phone}
          onChange={handleChange}
          required
        />
        <input
          name="cis"
          placeholder="N°SIRET"
          id="cis"
          value={cis}
          onChange={handleChange}
          required
        />
        <input
          name="averageEatingTime"
          placeholder="Temps moyen de repas en minutes"
          id="average-eating-time"
          type="number"
          value={averageEatingTime}
          onChange={handleChange}
          required
        />
        <input
          name="coversNumber"
          placeholder="Nombre de couverts"
          id="covers-number"
          type="number"
          value={coversNumber}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button-alt">Inscription</button>
      </form>
    </div>
  );
};

// props check
Signup.propTypes = {
  lastname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // number
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cis: PropTypes.PropTypes.string.isRequired,
  averageEatingTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // number
  coversNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // number 
  changeSignUpInputValue: PropTypes.func.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
};

// == Export
export default Signup;

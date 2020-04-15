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
  handleChangePasswordConfirmation
}) => {
  
  // handle input change
  const handleChange = (evt) => {
    changeSignUpInputValue(evt.target.value, evt.target.name);
  };
  
  // const areSamePassword = false;

  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSubscribe();

 


    // if (password === passwordConfirmation) {
    //   handleSubscribe();
    // }
    // else {
    //   console.log(areSamePassword);
    //   areSamePassword = true;
    //   console.log(areSamePassword);
    // }
  };

  const checkPasswordConfirmation = (e) => {
    if (e.target.value == password) {
      handleChangePasswordConfirmation(false);
      handleChange(e);
    } else {
      handleChangePasswordConfirmation(true);
      handleChange(e);
    }
  }


  // const passwordVerify = {
  //   showError: false,
  //   checkError: function(evt, handleChange) {
  //     if (evt.target.value == password) {
  //       passwordVerify.showError = false;
  //       passwordVerify.handleChange(evt);
  //       return false;
  //     } else {
  //       passwordVerify.showError = true;
  //       passwordVerify.handleChange(evt);
  //       return true;
  //     }
  //   },
  //   handleChange: function(evt){
  //     handleChange(evt);
  //   }
  // }
  
  return (
    <div className="signup-wrapper">
      <h1>Inscription</h1>

      <form id="signup-form" onSubmit={handleSubmit}>
        <span>Vous concernant</span>
        <input
          name="lastname" 
          placeholder="Nom" 
          id="lastname"
          value={lastname}
          onChange={handleChange}
        />
        <input
          name="firstname" 
          placeholder="Prénom" 
          id="firstname"
          value={firstname}
          onChange={handleChange}
        />
        <input
          name="email" 
          type="email"
          placeholder="Adresse email" 
          id="email"
          value={email}
          onChange={handleChange}
        />
        <input
          name="password" 
          type="password"
          placeholder="Mot de passe" 
          id="password"
          value={password}
          onChange={handleChange}
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
        />
        <input
          name="address"
          placeholder="Adresse" 
          id="address"
          value={address}
          onChange={handleChange}
        />
        <input
          name="postcode"
          placeholder="Code postal" 
          id="postcode"
          value={postcode}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="Ville" 
          id="city"
          value={city}
          onChange={handleChange}
        />
        <input
          name="country"
          placeholder="Pays" 
          id="country"
          value={country}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Téléphone" 
          id="phone"
          value={phone}
          onChange={handleChange}
        />
        <input
          name="cis"
          placeholder="N°SIRET" 
          id="cis"
          value={cis}
          onChange={handleChange}
        />
        <input
          name="averageEatingTime"
          placeholder="Temps moyen de repas en minutes" 
          id="average-eating-time" 
          type="number"
          value={averageEatingTime}
          onChange={handleChange}
        />
        <input
          name="coversNumber"
          placeholder="Nombre de couverts" 
          id="covers-number" 
          type="number"
          value={coversNumber}
          onChange={handleChange}
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

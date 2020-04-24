// import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import
import './restaurantprofile.scss';
import Field from './Field';

// component
const RestaurantProfile = ({
  restaurantName,
  address,
  postcode,
  city,
  country,
  phone,
  newPass,
  newPassConfirmation,
  actualPass,
  changeRestaurantProfileInputValue,
  handleRestaurantEdit,
  handleQrCode,
  displayEditConfirmation,
  displayEditError,
  editErrorMessage,
  isNewPassConfirmed,
  changeIsNewPassConfirmed,
  clearShowedConfirmationOrErrorMessage,
}) => {
  // useEffect( () => {
  //   clearShowedConfirmationOrErrorMessage();
  // }, []);

  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (newPass === newPassConfirmation) {
      handleRestaurantEdit();
      changeIsNewPassConfirmed(true);
    }
    else {
      changeIsNewPassConfirmed(false);
    }
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    changeRestaurantProfileInputValue(evt.target.value, evt.target.name);
  };

  return (
    <div className="profile-container">
      <form className="infos-container" onSubmit={handleSubmit}>
        <div>
          {displayEditConfirmation && <div className="confirmation">Vos modifications ont bien été prises en compte.</div>}
          {displayEditError && <span className="error">{editErrorMessage}</span>}

          <p>Modifier les informations de mon restaurant</p>

          <Field
            name="restaurantName"
            placeholder="Nom de l'établissement"
            onChange={changeRestaurantProfileInputValue}
            value={restaurantName}
          />

          <Field
            name="address"
            placeholder="Adresse"
            onChange={changeRestaurantProfileInputValue}
            value={address}
          />

          <div className="postcode__city">
            <Field
              name="postcode"
              placeholder="Code postal"
              onChange={changeRestaurantProfileInputValue}
              value={postcode}
            />

            <Field
              className="city"
              name="city"
              placeholder="Ville"
              onChange={changeRestaurantProfileInputValue}
              value={city}
            />
          </div>

          <Field
            name="country"
            placeholder="Pays"
            onChange={changeRestaurantProfileInputValue}
            value={country}
          />

          <Field
            name="phone"
            placeholder="Téléphone"
            onChange={changeRestaurantProfileInputValue}
            value={phone}
          />
        </div>

        <div>
          <p>Modifier mes informations personnelles</p>

          <Field
            name="newPass"
            type="password"
            placeholder="Nouveau mot de passe"
            onChange={changeRestaurantProfileInputValue}
            value={newPass}
          />

          <Field
            name="newPassConfirmation"
            type="password"
            placeholder="Confirmation du nouveau mot de passe"
            onChange={changeRestaurantProfileInputValue}
            value={newPassConfirmation}
          />

          {!isNewPassConfirmed && <span className="error">Les champs du nouveau mot de passe ne correspondent pas.</span>}
        </div>

        <div className="actual-pass">
          <div className="actual-pass-info">
            Pour valider ces modifications, merci d'indiquer votre mot de passe actuel
          </div>

          {/* <Field
            name="actualPass"
            type="password"
            placeholder="Mot de passe actuel"
            onChange={changeRestaurantProfileInputValue}
            value={actualPass}
          /> */}

          <input
            id="actualPass"
            type="password"
            className="field input"
            placeholder="Mot de passe actuel"
            name="actualPass"
            value={actualPass}
            onChange={handleChange}
            required
          />
        </div>
        <button className="save-button button-alt" type="submit">Enregistrer</button>
      </form>

      <div className="qr-container" onClick={handleQrCode}>
        <span>Télécharger</span>
        <p>mon QR code</p>
        <i className="fa fa-qrcode" aria-hidden="true" />

        {/* <button className="download-button button-alt" onClick={handleQrCode}>Télécharger</button> */}
      </div>
    </div>
  );
};

// props check
RestaurantProfile.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // number
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  newPass: PropTypes.string.isRequired,
  newPassConfirmation: PropTypes.string.isRequired,
  actualPass: PropTypes.string.isRequired,
  changeRestaurantProfileInputValue: PropTypes.func.isRequired,
  handleRestaurantEdit: PropTypes.func.isRequired,
};

// export
export default RestaurantProfile;

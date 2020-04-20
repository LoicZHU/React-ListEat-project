// import npm
import React from 'react';
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
}) => {
  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRestaurantEdit();
  };

  return (
    <div className="profile-container">
      <form className="infos-container" onSubmit={handleSubmit}>
        <div>
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
            placeholder="Nouveau mot de passe"
            onChange={changeRestaurantProfileInputValue}
            value={newPass}
          />

          <Field
            name="newPassConfirmation"
            placeholder="Confirmation du nouveau mot de passe"
            onChange={changeRestaurantProfileInputValue}
            value={newPassConfirmation}
          />
        </div>

        <div className="actual-pass">
          <div className="actual-pass-info">
            Pour valider ces modifications, merci d'indiquer votre mot de passe actuel
          </div>

          <Field
            name="actualPass"
            type="password"
            placeholder="Mot de passe actuel"
            onChange={changeRestaurantProfileInputValue}
            value={actualPass}
          />
        </div>
        <button className="save-button button-alt" type="submit">Enregistrer</button>
      </form>

      <div className="qr-container">
        <p>Mon QR code</p>

        <button className="download-button button-alt" onClick={handleQrCode}>Télécharger</button>
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

import React from 'react';
// import PropTypes from 'prop-types';

import './restaurantprofile.scss';
import Field from './Field';

const RestaurantProfile = () => {

  return (
    <div className="profile-container">
      <div className="infos-container">
        <div>
          <p>Modifier les informations de mon restaurant</p>

          <Field
            name="restaurant"
            placeholder="Nom de l'établissement"
          />

          <Field
            name="address"
            placeholder="Adresse"
          />

          <div className="postcode__city">
            <Field
              name="postcode"
              placeholder="Code postal"
            />

            <Field
              name="city"
              placeholder="Ville"
            />
          </div>

          <Field
            name="country"
            placeholder="Pays"
          />

          <Field
            name="phone"
            placeholder="Téléphone"
          />
        </div>

        <div>
          <p>Modifier mes informations personnelles</p>


        </div>
      </div>

      <div className="qr-container">
        <p>Mon QR code</p>

        LE QR CODE

        <button className="download-button button-alt" type="button">Télécharger</button>
      </div>
    </div>
  );

};

export default RestaurantProfile;

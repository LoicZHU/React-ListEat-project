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
              className="city"
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

          <Field
            name="email"
            placeholder="Téléphone"
          />

          <Field
            name="newpass"
            placeholder="Nouveau mot de passe"
          />

          <Field
            name="newpassconfirmation"
            placeholder="Confirmation du nouveau mot de passe"
          />
        </div>

        <div className="actual-pass">
          <div className="actual-pass-info">
            Pour valider ces modifications, merci d'indiquer votre mot de passe actuel
          </div>

          <Field
            name="actualpass"
            type="password"
            placeholder="Mot de passe actuel"
          />
        </div>
        <button className="save-button button-alt" type="button">Enregistrer</button>
      </div>

      <div className="qr-container">
        <p>Mon QR code</p>

        <button className="download-button button-alt" type="button">Télécharger</button>
      </div>
    </div>
  );

};

export default RestaurantProfile;

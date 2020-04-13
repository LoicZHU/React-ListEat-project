import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'src/assets/img/logo.svg';
import './header.scss';

const Header = ({ isRestaurantLogged, handleLogout }) => {
  const handleClick = () => {
    handleLogout();
  };

  return (
    <header>
      <nav>
        <ul>
          <a href="/">
            <li id="home-button" className="header-nav-button button">Accueil</li>
            <li id="home-button-mobile" className="header-mobile-nav-button"><i className="fa fa-home" aria-hidden="true"></i></li>
          </a>
          <a href="/faq">
            <li id="help-button" className="header-nav-button button">Aide <span id="help-button-span">?</span></li>
            <li id="help-button-mobile">?</li>
          </a>
          {isRestaurantLogged && (
              <a href="/partner/:id/administration">
                <li id="help-button" className="header-nav-button button">Mon profil</li>
              </a>
          )}
        </ul>
        <div id="logo-container">
          <a href="/"><img src={Logo}/></a>
        </div>


        {isRestaurantLogged && (
          <a href="/login"><span className="header-nav-button button">Connexion</span></a>
        )}

        {!isRestaurantLogged && (
          <a onClick={handleClick}><span className="header-nav-button button">Déconnexion</span></a>
        )}

      </nav>
    </header>
  );
};

// props check
Header.propTypes = {
  isRestaurantLogged: PropTypes.bool.isRequired,
};

// export
export default Header;

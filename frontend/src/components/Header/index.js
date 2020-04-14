import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'src/assets/img/logo.svg';
import './header.scss';

const Header = ({ isRestaurantLogged, handleLogout, restaurantId }) => {
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
        </ul>
        <div id="logo-container">
          <a href="/"><img src={Logo}/></a>
        </div>

        <ul>
          {/* if not logged */}
          {!isRestaurantLogged && (
            <a href="/signup"><li className="header-nav-button button">Inscription</li></a>
          )}

          {/* if not logged */}
          {!isRestaurantLogged && (
            <a href="/login"><li className="header-nav-button button">Connexion</li></a>
          )}

          {/* if logged */}
          {isRestaurantLogged && (
            <a href={`/partner/${restaurantId}/administration/`}>
              <li id="help-button" className="header-nav-button button">Mon espace</li>
            </a>
          )}
          {isRestaurantLogged && (
            <a href={`/partner/${restaurantId}/administration/edit`}>
              <li id="help-button" className="header-nav-button button">Mon profil</li>
            </a>
          )}

          {isRestaurantLogged && (
            <a onClick={handleClick}>
              <li className="header-nav-button button">Déconnexion</li>
            </a>
          )}
        </ul>

      </nav>
    </header>
  );
};

// props check
Header.propTypes = {
  isRestaurantLogged: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

// export
export default Header;

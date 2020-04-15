import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'src/assets/img/logo.png';
import './header.scss';

const Header = ({ isRestaurantLogged, handleLogout, restaurantId }) => {
  const handleClick = () => {
    handleLogout();
  };

  return (
    <header>
      <nav>
      <div id="mobile-nav">
        <div class="header">
          <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"/>
          <label for="openSidebarMenu" class="sidebarIconToggle">
            <div class="spinner diagonal part-1"></div>
            <div class="spinner horizontal"></div>
            <div class="spinner diagonal part-2"></div>
          </label>

          <div id="logo-container">
            <a href="/"><img src={Logo}/></a>
          </div>

          <div id="sidebarMenu">
            <ul class="sidebarMenuInner">

            <a href="/">
              <li>Accueil</li>
            </a>
            <a href="/faq">
              <li id="help">Aide <span id="help-button-span">?</span></li>
            </a>
              {/* if not logged */}
              {!isRestaurantLogged && (
                <a href="/signup"><li>Inscription</li></a>
              )}

              {/* if not logged */}
              {!isRestaurantLogged && (
                <a href="/login"><li>Connexion</li></a>
              )}

              {/* if logged */}
              {isRestaurantLogged && (
                <a href={`/partner/${restaurantId}/administration/`}>
                  <li>Mon espace</li>
                </a>
              )}
              {isRestaurantLogged && (
                <a href={`/partner/${restaurantId}/administration/edit`}>
                  <li>Mon profil</li>
                </a>
              )}

              {isRestaurantLogged && (
                <a onClick={handleClick}>
                  <li>Déconnexion</li>
                </a>
              )}
            </ul>
          </div>
      </div>
    </div>
    <div id="desktop-menu">
      <ul id="desktop-left-nav">
        <a href="/">
          <li id="home-button" className="header-nav-button button">Accueil</li>
        </a>
        <a href="/faq">
          <li id="help-button" className="header-nav-button button">Aide <span id="help-button-span">?</span></li>
        </a>
      </ul>
      <div id="logo-container">
        <a href="/"><img src={Logo}/></a>
      </div>
      <ul id="desktop-right-nav">
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
    </div>
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

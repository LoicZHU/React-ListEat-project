import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Link,
} from 'react-router-dom';

import HamburgerMenu from 'react-hamburger-menu';
import Logo from 'src/assets/img/logo.png';
import './header.scss';

const Header = ({
  isRestaurantLogged,
  handleLogout,
  restaurantId,
  mobileMenuOpened,
  handleMobileMenuOpened,
  closeMobileMenu,
}) => {

  const handleClick = () => {
    handleLogout();
  };

  const handleCloseMobileMenu = () => {
    closeMobileMenu();
  };

  window.addEventListener('scroll', handleCloseMobileMenu);

  return (
    <header>
      <nav>
      <div id="mobile-nav">
        <div className="header">
        
        <HamburgerMenu
        isOpen={mobileMenuOpened}
        menuClicked={handleMobileMenuOpened}
        width={25}
        height={15}
        strokeWidth={3}
        rotate={0}
        color='black'
        borderRadius={0}
        animationDuration={0.5}
        />

          <div id="logo-container">
            <a href="/"><img src={Logo}/></a>
          </div>
          
        </div>

        {mobileMenuOpened && 
        <>
        <div id="mobile-menu-overlay" onClick={handleCloseMobileMenu} ></div>
          <div id="mobile-menu-container" onScroll={handleCloseMobileMenu}>

          <ul>
              <a href="/">
                <li>Accueil<i className="fa fa-home" aria-hidden="true"></i></li>
              </a>
              <a href="/faq">
                <li id="help">Aide<i className="fa fa-question-circle" aria-hidden="true"></i></li>
              </a>
                {!isRestaurantLogged && (
                  <a href="/signup"><li>Inscription<i className="fa fa-user-plus" aria-hidden="true"></i></li></a>
                )}

                {!isRestaurantLogged && (
                  <a href="/login"><li>Connexion<i className="fa fa-sign-in" aria-hidden="true"></i></li></a>
                )}

                {isRestaurantLogged && (
                  <a href={`/partner/${restaurantId}/administration/`}>
                    <li>Mon espace<i className="fa fa-ticket" aria-hidden="true"></i></li>
                  </a>
                )}
                {isRestaurantLogged && (
                  <a href={`/partner/${restaurantId}/administration/edit`}>
                    <li>Mon profil<i className="fa fa-user" aria-hidden="true"></i></li>
                  </a>
                )}

                {isRestaurantLogged && (
                  <a onClick={handleClick}>
                    <li>Déconnexion<i className="fa fa-sign-out" aria-hidden="true"></i></li>
                  </a>
                )}
              </ul>
          
          </div>
          </>
          }

          
          {/* <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
          <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
            <div className="spinner diagonal part-1"></div>
            <div className="spinner horizontal"></div>
            <div className="spinner diagonal part-2"></div>
          </label>

          <div id="logo-container">
            <a href="/"><img src={Logo}/></a>
          </div>

          <div id="sidebarMenu">
            <ul className="sidebarMenuInner">

            <a href="/">
              <li>Accueil</li>
            </a>
            <a href="/faq">
              <li id="help">Aide <span id="help-button-span">?</span></li>
            </a>
              {!isRestaurantLogged && (
                <a href="/signup"><li>Inscription</li></a>
              )}

              {!isRestaurantLogged && (
                <a href="/login"><li>Connexion</li></a>
              )}

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
              </div> */}

    </div>
    <div id="divider"></div>
    <div id="desktop-menu">
      <ul id="desktop-left-nav">

      <NavLink exact to="/">
          <li id="home-button" className="header-nav-button button">
              Accueil
          </li>
      </NavLink>

      <NavLink exact activeClassName="menu-link" to="/faq">
        <li id="help-button" className="header-nav-button button">
            Aide <span id="help-button-span">?</span>
        </li>
      </NavLink>
      </ul>

      <Link to="/">
        <div id="logo-container">
          <img src={Logo}/>
        </div>
      </Link>

      <ul id="desktop-right-nav">
        {/* if not logged */}
        {!isRestaurantLogged && (
      <NavLink exact activeClassName="menu-link" to="/signup">
        <li className="header-nav-button button">Inscription</li>
      </NavLink>
        )}

        {/* if not logged */}
        {!isRestaurantLogged && (
      <NavLink exact activeClassName="menu-link" to="/login">
        <li className="header-nav-button button">Connexion</li>
      </NavLink>
        )}

        {/* if logged */}
        {isRestaurantLogged && (
          <NavLink exact activeClassName="menu-link" to={`/partner/${restaurantId}/administration/`}>
            <li id="help-button" className="header-nav-button button">Mon espace</li>
          </NavLink>
        )}
        {isRestaurantLogged && (
          <NavLink exact activeClassName="menu-link" to={`/partner/${restaurantId}/administration/edit`}>
            <li id="help-button" className="header-nav-button button">Mon profil</li>
          </NavLink>
        )}

        {isRestaurantLogged && (
          <NavLink exact to="" onClick={handleClick}>
            <li className="header-nav-button button">Déconnexion</li>
          </NavLink>
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

import React from 'react';
import Logo from 'src/assets/img/logo.svg';
import './header.scss';

const Header = () => {
  return (
  <header>
    <nav>
      <ul>
        <a href="#">
          <li id="home-button" className="header-nav-button button">Accueil</li>
          <li id="home-button-mobile" className="header-mobile-nav-button button"><i class="fa fa-home" aria-hidden="true"></i></li>
        </a>
        <a href="#">
          <li id="help-button" className="header-nav-button button">Aide <span id="help-button-span">?</span></li>
          <li id="help-button-mobile">?</li>
        </a>
      </ul>
      <div id="logo-container">
      <a href="#"><img src={Logo}/></a>
      </div>
      <a href="#"><span className="header-nav-button button">Connexion</span></a>
    </nav>
  </header>
  )
};
export default Header;

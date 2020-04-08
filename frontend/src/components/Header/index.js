import React from 'react';
import Logo from 'src/assets/img/logo.svg';
import './header.scss';

const Header = () => {
  return (
  <header>
    <nav>
      <ul>
        <a href="#">
          <li id="home-button" className="header-nav-button">Accueil</li>
        </a>
        <a href="#">
          <li id="help-button">?</li>
        </a>
      </ul>
      <div id="logo-container">
      <a href="#"><img src={Logo}/></a>
      </div>
      <a href="#"><span className="header-nav-button">Connexion</span></a>
    </nav>
  </header>
  )
};
export default Header;

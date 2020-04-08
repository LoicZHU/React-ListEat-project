import React from 'react';
import Logo from 'src/assets/img/logo.svg';
import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <div id="footer-first">
        <nav>
          <ul>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Politique de protection des données</a></li>
          </ul>
        </nav>
        <div id="contact-block">
          <img id="logo" src={Logo}/>
          <div className="contact-infos">
            <span className="title">Pour nous contacter :</span>
            <span><i class="fa fa-envelope-o" aria-hidden="true"></i> Par mail: <a href="mailto:hello@listeat.io">hello@listeat.io</a></span>
            <span><i class="fa fa-phone" aria-hidden="true"></i> Par téléphone: <a href="tel:+33158987845">01 58 98 78 45</a></span>
          </div>
        </div>
      </div>
      <div id="footer-last">
        <span>Copyright ListEat 2020</span>
      </div>
    </footer>
  )
};

export default Footer;

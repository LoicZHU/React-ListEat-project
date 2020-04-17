// == Import npm
import React from 'react';
import background from 'src/assets/img/home-background.jpeg';

// == Import
import './home.scss';

// == Composant
const Top = () => (
  <section className="home__top" style={{ backgroundImage:`url(${background})` }}>
    <div id="layer-opacity">
      <div className="home__top__slogan">
        <p>
          L'attente n'aura jamais été aussi agréable.
        </p>
        <p id="desktop-slogan-description">Optimisez vos flux, gagnez du temps ! Pour en savoir plus, vous pouvez consulter notre <a href="/faq">rubrique Aide</a>. </p>
        <button
          className="button-alt mobile"
          type="button"       
        >
          <a href="/signup">Inscrivez-vous</a>
        </button>
      </div>
    </div>

    <div className="home__top__partner">
      <p className="partner-title">Devenez restaurateur partenaire</p><p className="partner-argument">EN MOINS DE 5 MINUTES !</p>

      <a href="/signup">
        <button
          className="home__top__partner__subscribe-button button-alt"
          type="button"       
        >
          <span>Inscription</span>
        </button>
      </a>

      <a className="home__top__partner__link" href="/faq">
        Une question ?<br />
        Consultez notre rubrique d'aide
      </a>
    </div>
  </section>
);

// == Export
export default Top;

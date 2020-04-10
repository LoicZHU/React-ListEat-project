// == Import npm
import React from 'react';

// == Import
import './home.scss';

// == Composant
const Top = () => (
  <section className="home__top">
    <div className="home__top__slogan">
      <p>
        Slogan accrocheur
      </p>
    </div>

    <div className="home__top__partner">
      <p>Devenez partenaire<br />EN MOINS DE 5 MINUTES !</p>

      <button
        className="home__top__partner__subscribe-button"
        type="button"       
      >
        <a href="/signup">Inscription</a>
      </button>

      <a className="home__top__partner__link" href="/faq">
        Une question ?<br />
        Consultez notre rubrique d'aide
      </a>
    </div>
  </section>
);

// == Export
export default Top;

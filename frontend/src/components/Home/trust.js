// == Import npm
import React from 'react';
import logo1 from 'src/assets/img/customers-logos/logo-1.png';
import logo2 from 'src/assets/img/customers-logos/logo-2.png';
import logo3 from 'src/assets/img/customers-logos/logo-3.png';
import logo4 from 'src/assets/img/customers-logos/logo-4.png';
import logo5 from 'src/assets/img/customers-logos/logo-5.png';
import logo6 from 'src/assets/img/customers-logos/logo-6.png';


// == Import
import './home.scss';

// == Composant
const Trust = () => (
  <section className="home__trust">
    <div className="home__trust__statement">
      <h2>Témoignages</h2>
      <span className="statement">
        <p>
        Grâce à ListEat, je gère facilement ma liste d’attente sur ma tablette, l’application est intuitive, fini le papier, les ratures&nbsp;!
        </p>
        <span className="author">Julie,</span><span className="company">propriétaire du restaurant Chez Julie (75)</span>
      </span>
      <span className="statement">
        <p>
        J’utilise ListEat depuis maintenant 6 mois dans notre établissement très fréquenté et je peux constater que cela a considérablement diminué le nombre de no-shows&nbsp;!
        </p>
        <span className="author">Pierre,</span><span className="company">manager du restaurant Chez Baba (33)</span>
      </span>
    </div>

    <div className="home__trust__partner">
      <h2>Ils nous font confiance</h2>
    
      <div className="clients-logo-list">
        <img src={logo1} />
        <img src={logo2} />
        <img src={logo3} />
        <img src={logo4} />
        <img src={logo5} />
        <img src={logo6} />

      </div>
    </div>
  </section>
);

// == Export
export default Trust;

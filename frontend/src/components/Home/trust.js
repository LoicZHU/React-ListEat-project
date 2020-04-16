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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum alias, architecto voluptates incidunt minima et, omnis nesciunt, temporibus assumenda eius ipsum pariatur aspernatur molestiae consequuntur sapiente exercitationem amet nostrum qui?
        </p>
        <span className="author">Auteur,</span><span className="company">Company</span>
      </span>
      <span className="statement">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum alias, architecto voluptates incidunt minima et, omnis nesciunt, temporibus assumenda eius ipsum pariatur aspernatur molestiae consequuntur sapiente exercitationem amet nostrum qui?
        </p>
        <span className="author">Auteur,</span><span className="company">Company</span>
      </span>
    </div>

    <div className="home__trust__partner">
      <h2>Ils nous font confiance</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nostrum architecto unde quas dolor deleniti minima ad officia labore nam voluptate quod, sapiente maxime autem consequuntur ipsa? Voluptate, nam officiis.
      </p>
      <div className="clients-logo-list">
        <img src={logo1}></img>
        <img src={logo2}></img>
        <img src={logo3}></img>
        <img src={logo4}></img>
        <img src={logo5}></img>
        <img src={logo6}></img>

      </div>
    </div>
  </section>
);

// == Export
export default Trust;

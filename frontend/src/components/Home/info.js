// == Import npm
import React from 'react';
import imgComp from 'src/assets/img/1529835299686.jpeg';

// == Import
import './home.scss';

// == Composant
const Info = () => (
  <section className="home__info">
    <div className="home__info__image" style={{ backgroundImage:`url(${imgComp})` }} >
    </div>

    <div className="home__info__content">
      <div className="home__info__content__detail">
        <h2>Simplement efficace.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum alias, architecto voluptates incidunt minima et, omnis nesciunt, temporibus assumenda eius ipsum pariatur aspernatur molestiae consequuntur sapiente exercitationem amet nostrum qui?
        </p>
      </div>
      <div className="home__info__content__detail">
        <h2>Comment ça marche ?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nostrum architecto unde quas dolor deleniti minima ad officia labore nam voluptate quod, sapiente maxime autem consequuntur ipsa? Voluptate, nam officiis.</p>
        <ol>
          <li>Lorem dolor adipisicing elit sit amet, consectetur.</li>
          <li>Lorem adipisicing ipsum dolor sit amet,  ipsum consectetur.</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
        </ol>
      </div>
    </div>
  </section>
);

// == Export
export default Info;

// == Import npm
import React from 'react';

// == Import
import './home.scss';
import earth from 'src/assets/earth.jpg';

// == Composant
const Info = () => (
  <section className="home__info">
    <div className="home__info__image">
      <img src={earth} alt="earth"/>
    </div>

    <div className="home__info__content">
      <div className="home__info__content__detail">
        <h2>Description</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum alias, architecto voluptates incidunt minima et, omnis nesciunt, temporibus assumenda eius ipsum pariatur aspernatur molestiae consequuntur sapiente exercitationem amet nostrum qui?
        </p>
      </div>
      <div className="home__info__content__detail">
        <h2>Comment ça marche ?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nostrum architecto unde quas dolor deleniti minima ad officia labore nam voluptate quod, sapiente maxime autem consequuntur ipsa? Voluptate, nam officiis.</p>
      </div>
    </div>
  </section>
);

// == Export
export default Info;

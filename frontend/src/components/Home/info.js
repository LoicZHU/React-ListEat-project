// == Import npm
import React from 'react';
import imgComp from 'src/assets/img/1529835299686.jpeg';
import { Parallax } from 'react-scroll-parallax';

// == Import
import './home.scss';

// == Composant
const Info = () => {


  return (
  <section className="home__info">
    <Parallax className="desktop-parallax" y={[-30, 30]} tagOuter="figure">
      <img src={imgComp} />
    </Parallax>
    <img className="mobile-parallax" src={imgComp} />

    <div className="home__info__content">
      <div className="home__info__content__detail">
        <h2>Simplement efficace.</h2>
        <p>
          Collez votre QR code sur la vitrine de votre restaurant. Vos clients le scannent, saisissent quelques renseignements, obtiennent une estimation de leur temps d’attente et sont automatiquement inscrits sur la liste d’attente. Il ne manque plus qu’à les placer lorsqu’une table se libère !
        </p>
      </div>
      <div className="home__info__content__detail">
        <h2>Comment ça marche ?</h2>
        <ol>
          <li>Créez votre compte partenaire en quelques minutes.</li>
          <li>Téléchargez votre QR code. Imprimez-le et collez-le sur votre vitrine.</li>
          <li>Vos clients scannent le QR code, renseignent quelques informations dont le nombre de couverts souhaités et obtiennent un ticket avec une estimation du temps d’attente. Ils recevront une notification automatique à l’approche de leur horaire de passage estimé.</li>
          <li>Vous gérez vos tickets via votre espace partenaire, soit en plaçant les clients lorsqu’une table se libère, soit en annulant leur venue.</li>
        </ol>
        <p>Pratique, pour vous et vos clients !</p>
      </div>
    </div>
  </section>
  );
};

// == Export
export default Info;

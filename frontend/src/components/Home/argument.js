
// == Import npm
import React from 'react';

// == Import
import './home.scss';

// == Composant
const Argument = () => (
  <section className="home__argument">
    <span id="arguments-title">Votre métier, notre priorité.</span>
    <div className="content">
      <article className="home__argument__article">
        <h1>Fini le papier, gérez votre liste d’attente numériquement&nbsp;!</h1>
        <p>
          Vous tenez une liste d’attente papier ? Notre application vous permet de la gérer en ligne de façon très simple : les clients scannent un QR code pour s’inscrire sur la liste d’attente de votre restaurant, que vous pourrez manipuler sur tablette, pc ou smartphone.
        </p>
      </article>

      <article className="home__argument__article">
        <h1>Réduisez le nombre de “no-shows”&nbsp;!</h1>
        <p>
          Victime de clients indélicats ne prenant pas la peine d’annuler leurs réservations ? Notre application est faite pour vous ! Les clients s’inscrivant sur votre liste d’attente via le scan de votre QR code apposé sur votre vitrine, vous pouvez être sûrs qu’ils sont à proximité et qu’ils reviendront lorsque leur tour arrivera.
        </p>
      </article>

      <article className="home__argument__article">
        <h1>Stop aux files interminables devant vos restaurants&nbsp;!</h1>
        <p>
          Victime de votre succès, vous ne prenez plus de réservations et la file devant votre restaurant semble interminable ? Grâce à la gestion numérique de votre liste d’attente, vos clients ne sont plus obligés d’attendre devant votre restaurant, gênant souvent les passants, décourageant parfois d’autres clients potentiels. Par ailleurs, vos clients peuvent mettre à profit le temps d’attente.
        </p>
      </article>
      </div>
  </section>
);

// == Export
export default Argument;

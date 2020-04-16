// == Import npm
import React from 'react';

// == Import
import './notfound.scss';

// == Composant
const NotFound = () => (
  <main className="main">
    <div>Il semblerait que vous essayez d'accéder à une ressource non existante...</div>

    <a className="link" href="/">
      Revenir sur la page d'accueil
    </a>
  </main>
);

// == Export
export default NotFound;

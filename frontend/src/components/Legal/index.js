// == Import npm
import React from 'react';

// == Import
import './legal.scss';

// == Composant
const Legal = () => (
  <main className="legal">
    <h1>Mentions légales</h1>

    <div className="legal__content">
      <div>
        <h2>Editeur</h2>

        <p>
          ListEat, équipe de 4 développeurs formés chez O’clock au capital de 1 658 475 cafés, ayant son siège social chez eux.
        </p>
      </div>

      <div>
        <h2>Directeur de publication</h2>

        <p>
          Mystère…
        </p>
      </div>

      <div>
        <h2>Adresse électronique</h2>

        <p>
          hello@listeat.io
        </p>
      </div>

      <div>
        <h2>Hébergeur</h2>

        <p>
          Amazon Web Services, Inc.<br />
          P.O. Box 81226<br />
          Seattle, WA 98108-1226
        </p>
      </div>

      <div>
        <h2>Déclaration CNIL</h2>

        <p>
          ¯\_(ツ)_/¯
        </p>
      </div>
    </div>
  </main>
);

// == Export
export default Legal;

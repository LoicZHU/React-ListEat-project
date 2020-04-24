// == Import npm
import React from 'react';

// == Import
import './faq.scss';

// == Composant
const Faq = ({
  isRestaurantContentOpen,
  isClientContentOpen,
  openRestaurantContent,
  openClientContent,
}) => {
  const handleRestaurantClick = () => {
    openRestaurantContent();
  };

  const handleClientClick = () => {
    openClientContent();
  };

  return (
    <main className="faq">
      <h1>Aide</h1>

      <p className="faq__choice">Je suis...</p>

      <div className="faq__links">
        <a className={`faq__link partner ${(isRestaurantContentOpen) ? 'active' : ''}`} onClick={handleRestaurantClick}>Restaurateur</a>
        <a className={`faq__link customer ${(isClientContentOpen) ? 'active' : ''}`} onClick={handleClientClick}>Client</a>
      </div>

      {/* restaurant FAQ */}
      {isRestaurantContentOpen && (
        <div className="faq__container">
          <div className="faq__content">
            <p className="faq__content__question">Qui peut utiliser l’application ListEat ?</p>

            <p className="faq__content__answer">
              Tout restaurateur gérant un établissement de restauration commerciale et possédant un code siret valide peut s’inscrire et utiliser ListEat.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Qu’est-ce qu’un QR code ?</p>

            <p className="faq__content__answer">
              Un QR code est un type de code-barre pouvant être scanné depuis un smartphone (ou autres appareils compatibles), stockant des informations telles que l’adresse d’un site internet. Dans le cas présent, il s’agira de l’adresse menant à la page internet qui permettra au client de s’inscrire sur la liste d’attente d’un restaurant, chaque QR code étant propre à chaque restaurant.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Que faire si un client ne possède pas de smartphone ?</p>

            <p className="faq__content__answer">
              Si certains de vos clients ne possèdent pas de téléphone compatible (ou d’une connexion internet), vous pouvez ponctuellement ajouter un ticket via votre espace partenaire
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Comment est calculé le temps d’attente estimé ?</p>

            <p className="faq__content__answer">
              Lors de votre inscription, vous renseignez les informations liées à votre restaurant dont le temps moyen d’un repas, le nombre de places disponibles dans votre établissement. En fonction de ces informations, notre algorithme calcule le temps d’attente et l’horaire de passage estimés.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Est-il possible de changer le temps moyen d’un repas selon le moment de la journée ?</p>

            <p className="faq__content__answer">
              Oui, selon la fluctuation de la fréquentation (ex : déjeuner, coupure, dîner, semaine, week-end), vous pouvez faire varier le temps moyen d’un repas dans votre restaurant afin d’ajuster au mieux l’estimation du temps d’attente.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Que se passe-t-il si un client ne se présente pas lorsque son tour arrive ?</p>

            <p className="faq__content__answer">
              En cas de no-show, il vous suffit de cliquer sur le bouton “absent” en dessous du nombre de couverts du ticket afin de retirer le client de votre liste d’attente.
            </p>
          </div>
        </div>
      )}

      {/* client FAQ */}
      {isClientContentOpen && (
        <div className="faq__container">
          <div className="faq__content">
            <p className="faq__content__question">Qui peut utiliser l’application ListEat ?</p>

            <p className="faq__content__answer">
              Tout client possédant un smartphone doté d’une application de lecture de QR code et d’une connexion internet.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Qu’est-ce qu’un QR code ?</p>

            <p className="faq__content__answer">
              Un QR code est un type de code-barre pouvant être scanné depuis un smartphone (ou autres appareils compatibles), stockant des informations telles que l’adresse d’un site internet. Dans le cas présent, il s’agira de l’adresse menant à la page internet qui permettra de s’inscrire sur la liste d’attente d’un restaurant, chaque QR code étant propre à chaque restaurant.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Ai-je besoin d’un compte pour utiliser l’application ListEat ?</p>

            <p className="faq__content__answer">
              Non, vous n’avez pas besoin de créer un compte pour vous inscrire sur la liste d’attente d’un restaurant partenaire.
            </p>
          </div>

          <div className="faq__content">
            <p className="faq__content__question">Que faire si je souhaite annuler mon inscription sur la liste d’attente ?</p>

            <p className="faq__content__answer">
              Si vous ne pouvez pas vous rendre au restaurant à l’horaire indiqué, nous vous remercions d’annuler votre inscription via le lien d’annulation fourni dans l’email de confirmation. Vous libéreriez ainsi une place pour d’autres clients.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

// == Export
export default Faq;

// == Import npm
import React from 'react';

// == Import
import './data.scss';

// == Composant
const Data = () => (
  <main className="data">
    <h1>Politique de protection des données</h1>

    <p>
      Dans le cadre de l’utilisation de ses services, ListEat, en qualité de responsable de traitement, est susceptible de collecter et traiter des données à caractère personnel vous concernant. Conformément au principe de minimisation, nous ne collectons que les données nécessaires au regard des finalités pour lesquelles elles sont traitées.
    </p>

    <div className="data__content">
      <div>
        <h2>Quelles données recueillons-nous ?</h2>

        <ul>
          Les différentes catégories de données collectées dans le cadre de votre utilisation de nos services sont les suivantes :
          <li>
            - Données d’identification (notamment nom, prénom, nom de votre établissement, siret, adresse postale),
          </li>
          <li>
            - Données de contact (notamment numéro de téléphone, adresse email),
          </li>
          <li>
            - Données d’usage (notamment pages web visitées, quantité de tickets créés),
          </li>
          <li>
            - Données de connexion (notamment adresse IP de votre ordinateur, logs de connexion et d’usage),
          </li>
          <li>
            - Données de localisation.
          </li>
        </ul>
      </div>

      <div>
        <h2>À quoi servent les données susceptibles d'être collectées par ListEat ?</h2>

        <p>
          La finalité est notamment, et sans que cette liste soit exhaustive, de faire bénéficier les utilisateurs de l’ensemble des services disponibles sur le site de ListEat (création d’un compte partenaire, inscription sur les listes d’attente des restaurants partenaires…), de permettre la navigation sur son site internet, de permettre la communication avec ses utilisateurs.
        </p>

        <p>
          ListEat traite vos informations aux fins décrites dans les présentes règles et conformément à la loi, avec votre consentement, afin de traiter vos informations à des fins spécifiques. Vous êtes libre de revenir sur votre consentement à tout moment.
        </p>
      </div>

      <div>
        <h2>Combien de temps vos données sont-elles conservées ?</h2>

        <p>
          Nous ne conservons vos données que pendant la durée nécessaire à l’accomplissement des finalités mentionnées ci-dessus ou pour nous permettre de répondre à nos obligations légales.
        </p>
      </div>

      <div>
        <h2>Qui est susceptible d'accéder à vos données personnelles ?</h2>

        <p>
          Vos données à caractère personnel pourront être traitées par le personnel habilité de ListEat, de ses partenaires ou prestataires. Le recours à ces partenaires ou prestataires est nécessaire au bon fonctionnement des services proposés.
        </p>

        <p>
          Si ces destinataires sont amenés à traiter vos données en dehors de l’Union européenne, les transferts seront réalisés dans le respect de la Réglementation.
        </p>
      </div>

      <div>
        <h2>Quelle sécurité pour vos données ?</h2>

        <p>
          ListEat met en œuvre toutes les mesures techniques et organisationnelles utiles, au regard de la nature, de la portée et du contexte des données personnelles que vous nous communiquez et des risques présentés par leur traitement, pour préserver la sécurité de vos données personnelles et, notamment, empêcher toute destruction, perte, altération, divulgation, intrusion ou accès non autorisé à ces données, de manière accidentelle ou illicite.
        </p>

        <p>
          Le respect de la sécurité et de la protection de vos données s’impose également à nos prestataires.
        </p>
      </div>

      <div>
        <h2>Comment exercer vos droits ?</h2>

        <p>
          Conformément à la réglementation applicable en matière de protection des données personnelles, vous pouvez, à tout moment, exercer vos droits d’accès, de rectification, de suppression des données vous concernant ainsi que vos droits de limitation et d’opposition au traitement et à la portabilité de vos données personnelles.
        </p>

        <p>
          En outre, vous disposez légalement du droit de définir des directives relatives au sort de vos données à caractère personnel post mortem.
        </p>

        <p>
          Ces droits s’exercent par email à l’adresse suivante :
        </p>

        <p>
          <div className="data__content__contact">
            Délégué à la Protection des Données<br />
            hello@listeat.io
          </div>
        </p>

        <p>
          Dans ce cadre, nous vous prions de bien vouloir accompagner votre demande des éléments nécessaires à votre identification (nom, prénom, email) ainsi que toute autre information nécessaire à la confirmation de votre identité.
        </p>

        <p>
          Pour certains services spécifiques, ces droits sont susceptibles de s’exercer directement en ligne (gestion de votre compte utilisateur, gestion de vos abonnements aux newsletters, etc.).
        </p>

        <p>
          Vous disposez également d’un droit de recours auprès de la Commission nationale de l’informatique et des libertés en cas de violation de la réglementation applicable en matière de protection des données personnelles.
        </p>
      </div>

      <div>
        <h2>
          Modifications
        </h2>

        <p>
          ListEat se réserve le droit de faire évoluer la présente politique de protection des données personnelles, applicable à compter du 22 avril 2020 et s’engage à vous informer sur son site internet des futures modifications éventuelles.
        </p>
      </div>
    </div>
  </main>
);

// == Export
export default Data;

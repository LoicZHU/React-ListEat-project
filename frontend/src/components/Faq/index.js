// == Import npm
import React from 'react';

// == Import
import './faq.scss';

// == Composant
const Faq = () => (
  <main className="faq">
    <h1>Aide</h1>

    <p className="faq__choice">Je suis...</p>

    <div className="faq__links">
      <a className="faq__link" href="#">Restaurateur</a>
      <a className="faq__link" href="#">Client</a>
    </div>

    <div className="faq__container">
      <div className="faq__content">
        <p className="faq__content__question">Lorem ipsum dolor sit amet ?</p>

        <p className="faq__content__answer">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus blanditiis voluptas ad, fugiat, dolorem optio vel consequuntur, repudiandae porro facilis ipsa eligendi distinctio? Hic amet vero beatae quis ullam quas.
        </p>
      </div>

      <div className="faq__content">
        <p className="faq__content__question">Lorem ipsum dolor sit amet ?</p>

        <p className="faq__content__answer">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus blanditiis voluptas ad, fugiat, dolorem optio vel consequuntur, repudiandae porro facilis ipsa eligendi distinctio? Hic amet vero beatae quis ullam quas.
        </p>
      </div>

      <div className="faq__content">
        <p className="faq__content__question">Lorem ipsum dolor sit amet ?</p>

        <p className="faq__content__answer">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus blanditiis voluptas ad, fugiat, dolorem optio vel consequuntur, repudiandae porro facilis ipsa eligendi distinctio? Hic amet vero beatae quis ullam quas.
        </p>
      </div>

      <div className="faq__content">
        <p className="faq__content__question">Lorem ipsum dolor sit amet ?</p>

        <p className="faq__content__answer">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus blanditiis voluptas ad, fugiat, dolorem optio vel consequuntur, repudiandae porro facilis ipsa eligendi distinctio? Hic amet vero beatae quis ullam quas.
        </p>
      </div>
    </div>
  </main>
);

// == Export
export default Faq;

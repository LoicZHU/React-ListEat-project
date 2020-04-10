// == Import : npm
import React from 'react';
// import PropTypes from 'prop-types';

// == Import : local
import './field.scss';

// == Composant
const Field = ({ name, type, placeholder }) => (
  <div>
    <input
      id={name}
      type={type}
      className=""
      placeholder={placeholder}
      name={name}
    />
  </div>
);

// == Export
export default Field;

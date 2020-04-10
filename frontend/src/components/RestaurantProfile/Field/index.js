// == Import : npm
import React from 'react';
// import PropTypes from 'prop-types';

// == Import : local
import './field.scss';

// == Composant
const Field = ({ name, type, placeholder }) => (
  <input
    id={name}
    type={type}
    className="field input"
    placeholder={placeholder}
    name={name}
  />
);

// == Export
export default Field;

// == Import : npm
import React from 'react';
// import PropTypes from 'prop-types';

// == Import : local
import './field.scss';

// == Composant
const Field = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  // handle input change
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  return (
    <input
      id={name}
      type={type}
      className="field input"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

// == Export
export default Field;

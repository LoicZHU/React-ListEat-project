// == Import : npm
import React from 'react';
// import PropTypes from 'prop-types';

// == Import : local
import 'src/components/TicketForm/Field/field.scss';

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
    <div>
      <input
        id={name}
        type={type}
        className="ticket__form__field"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        min="1"
        required
      />
    </div>
  );
};

// == Export
export default Field;

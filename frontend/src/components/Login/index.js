import React from 'react';
// import PropTypes from 'prop-types';

import Form from 'src/containers/Login/Form';
import './login.scss';

const Login = () => {

  return (
    <div className="login-container">
      <h1>Identifiez-vous</h1>
      <Form />
    </div>
  );

};

export default Login;

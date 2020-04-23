import React from 'react';
// import PropTypes from 'prop-types';

import Form from 'src/containers/Login/Form';
import './login.scss';

const Login = () => {

  return (
    <div className="page-container">
      <div className="login-container">
        <h1>Identifiez-vous</h1>
        <Form />
      </div>
    </div>
  );

};

export default Login;

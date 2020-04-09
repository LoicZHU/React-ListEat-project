// == Import npm
import React from 'react';

// == Import Components 
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import TicketForm from 'src/components/TicketForm';
import PasswordForgotten from 'src/components/PasswordForgotten';
import Validation from 'src/components/Validation';
import Confirmation from 'src/components/Confirmation';

// == Import
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    {/* <Login /> */}
    {/* <Home /> */}
    {/* <TicketForm /> */}
    {/* <PasswordForgotten /> */}
    <Validation />
    <Footer />
  </div>
);

// == Export
export default App;

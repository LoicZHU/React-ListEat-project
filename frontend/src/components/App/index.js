// == Import npm
import React from 'react';

// == Import Components 
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import TicketForm from 'src/components/TicketForm';

// == Import
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    {/* <Login /> */}
    {/* <Home /> */}
    <TicketForm />
    <Footer />
  </div>
);

// == Export
export default App;

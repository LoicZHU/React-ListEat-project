// == Import npm
import React from 'react';

// == Import Components 
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
// == Import
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <Home />
    {/* <Login /> */}
    <Footer />
  </div>
);

// == Export
export default App;

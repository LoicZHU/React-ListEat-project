// == Import npm
import React from 'react';

import { Route } from 'react-router-dom';

// == Import Components 
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import TicketForm from 'src/components/TicketForm';
import PasswordForgotten from 'src/components/PasswordForgotten';
import Validation from 'src/components/Validation';
import Confirmation from 'src/components/Confirmation';
import Admin from 'src/components/Admin';
import Legal from 'src/components/Legal';
import Data from 'src/components/Data';
import Faq from 'src/components/Faq';

// == Import
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    {/* <Login /> */}
    {/* <TicketForm /> */}
    {/* <PasswordForgotten /> */}
    {/* <Confirmation />  */}
     {/* <Admin /> */}

    {/* Home */}
    <Route path="/" exact >
      <Header />
      <Home />
      <Footer />
    </Route>

    {/* Log in */}
    <Route path="/login" exact >
      <Header />
      <Login />
      <Footer />
    </Route>

    {/* Subscribe */}
    <Route path="/signup" exact >
      <Header />
      
      <Footer />
    </Route>

    {/* Forgotten pass */}
    <Route path="/forgotten-password" exact >
      <Header />
      <PasswordForgotten />
      <Footer />
    </Route>

    {/* Admin */}
    <Route path="/restaurant" >
      <Header />
      <Admin />
      <Footer />
    </Route>

    {/* Client : Get a ticket */}
    <Route path="/restaurant/:id/tickets/add" exact >
      <Header />
      <TicketForm />
      <Footer />
    </Route>

    {/* Client : Validate the ticket */}
    <Route path="/restaurant/:id/tickets/validate" exact >
      <Header />
      <Validation />
      <Footer />
    </Route>
    

    {/* Client : Confirmation of ticket */}
    <Route path="/tickets/:id" exact >
      <Header />
      <Confirmation />
      <Footer />
    </Route>

    {/* Client : Cancelllation of ticket */}
    <Route path="/tickets/:id/cancel" exact >
      <Header />
      <Confirmation />
      <Footer />
    </Route>

    {/* FAQ */}
    <Route path="/faq" exact >
      <Header />
      <Faq />
      <Footer />
    </Route>

    {/* Legal mentions */}
    <Route path="/legal" exact >
      <Header />
      <Legal />
      <Footer />
    </Route>

    {/* Data protection */}
    <Route path="/data-protection" exact >
      <Header />
      <Data />
      <Footer />
    </Route>
    

    
{/*
 /
/login
/signup
/forgotten-password
/forgotten-password/confirmation
/restaurant/id/tickets/add
/restaurant/id/tickets/validate
/tickets/id/
/tickets/cancel
/tickets/id/cancel
/faq
/legal
/data-protection */}




  </div>
);

// == Export
export default App;

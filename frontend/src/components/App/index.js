// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, Switch } from 'react-router-dom';

// == Import Components
import Header from 'src/containers/Header';
import Home from 'src/components/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import TicketForm from 'src/components/TicketForm';
import PasswordForgotten from 'src/components/PasswordForgotten';
import Validation from 'src/components/Validation';
import Confirmation from 'src/components/Confirmation';
import Cancellation from 'src/components/Cancellation';
import Admin from 'src/containers/Admin';
import Legal from 'src/components/Legal';
import Data from 'src/components/Data';
import Faq from 'src/components/Faq';
import Signup from 'src/containers/Signup';
import RestaurantProfile from 'src/containers/RestaurantProfile';
import NotFound from 'src/components/NotFound';

// == Import
import './styles.css';

// == Composant
const App = ({
  isRestaurantLogged,
  checkLoggedRestaurant,
  checkingLoggedRestaurant, 
  restaurantId,
  fetchRestaurantData,
}) => {
  useEffect(() => {
    checkLoggedRestaurant();
  }, []);

  if (isRestaurantLogged) {
    fetchRestaurantData(restaurantId);
  }

  return (
    <div className="app">
      {!checkingLoggedRestaurant && (
        <Switch>
          {/* Home */}
          <Route path="/" exact>
            <Header />
            <Home />
            <Footer />
          </Route>

          {/* FAQ */}
          <Route path="/faq" exact>
            <Header />
            <Faq />
            <Footer />
          </Route>

          {/* Legal mentions */}
          <Route path="/legal" exact>
            <Header />
            <Legal />
            <Footer />
          </Route>

          {/* Data protection */}
          <Route path="/data-protection" exact>
            <Header />
            <Data />
            <Footer />
          </Route>

          {/* Log in */}
          <Route path="/login" exact>
            <Header />
            {!isRestaurantLogged && <Login />}
            {isRestaurantLogged && <Redirect to={`/partner/${restaurantId}/administration`} />}
            <Footer />
          </Route>

          {/* Subscribe */}
          <Route path="/signup" exact>
            <Header />
            <Signup />
            <Footer />
          </Route>

          {/* Forgotten pass */}
          <Route path="/forgotten-password" exact>
            <Header />
            <PasswordForgotten />
            <Footer />
          </Route>

          {/* Restaurant (Admin) */}
          <Route path={`/partner/${restaurantId}/administration`} exact>
            <Header />
            {isRestaurantLogged && <Admin />}
            {!isRestaurantLogged && <Redirect from={`/partner/${restaurantId}/administration`} to="/" />}
          </Route>

          {/* Restaurant (Admin) */}
          <Route path={`/partner/${restaurantId}/administration/edit`}>
            <Header />
            {isRestaurantLogged && <RestaurantProfile />}
            {!isRestaurantLogged && <Redirect from={`/partner/${restaurantId}/administration/edit`} to="/" />}
          </Route>

          {/* Client : Get a ticket */}
          <Route path="/restaurant/:id/tickets/add" exact>
            <Header />
            <TicketForm />
          </Route>

          {/* Client : Validate the ticket */}
          <Route path="/restaurant/:id/tickets/validate" exact>
            <Header />
            <Validation />
          </Route>

          {/* Client : Confirmation of ticket */}
          <Route path="/tickets/:id" exact>
            <Header />
            <Confirmation />
          </Route>

          {/* Client : Cancellation of ticket */}
          <Route path="/tickets/:id/cancel" exact>
            <Header />
            <Cancellation />
          </Route>

          <Route path="*">
            <Header />
            <NotFound />
            <Footer />
          </Route> 
        </Switch>
      )}
    </div>
  );
};

// props check
App.propTypes = {
  isRestaurantLogged: PropTypes.bool.isRequired,
  checkLoggedRestaurant: PropTypes.func.isRequired,
  checkingLoggedRestaurant: PropTypes.bool.isRequired,
  restaurantId: PropTypes.number,
  fetchRestaurantData: PropTypes.func.isRequired,
};

// == Export
export default App;

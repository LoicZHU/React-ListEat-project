// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, Switch } from 'react-router-dom';

// == Import Components
import Header from 'src/containers/Header';
import Home from 'src/components/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import TicketForm from 'src/containers/TicketForm';
import PasswordForgotten from 'src/components/PasswordForgotten';
import Validation from 'src/containers/Validation';
import Confirmation from 'src/containers/Confirmation';
import Cancellation from 'src/containers/Cancellation';
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
  fetchTicketsData,
  checkFetchedTicketsData,
  loadingTicketsData,
  isTemporarySubscribedTicket,
  isTicketValidate,
  // checkTemporarySubscribedTicket,
  // checkingTemporarySubscribedTicket
}) => {
  useEffect(() => {
    checkLoggedRestaurant();
    // checkTemporarySubscribedTicket();
  }, []);

  if (isRestaurantLogged) {
    fetchRestaurantData(restaurantId);
    fetchTicketsData();
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
            {!isTemporarySubscribedTicket && <TicketForm />}
            {isTemporarySubscribedTicket && <Redirect to="/restaurant/tickets/validate" />}
          </Route>

          {/* Client : Validate the ticket */}
          {isTemporarySubscribedTicket && (
            <Route path="/restaurant/tickets/validate" exact>
              <Header />
              {isTicketValidate === '' && <Validation />}
              {isTicketValidate !== '' && isTicketValidate && <Redirect to="/tickets/confirmation" />}
              {isTicketValidate !== '' && !isTicketValidate && <Redirect to="/tickets/cancellation" />}
            </Route>
          )}

          {/* Client : Confirmation of ticket */}
          <Route path="/tickets/confirmation" exact>
            <Header />
            <Confirmation />
          </Route>

          {/* Client : Cancellation of ticket */}
          <Route path="/tickets/cancellation" exact>
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

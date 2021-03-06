// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


// == Import Components
import Header from 'src/containers/Header';
import Home from 'src/containers/Home';
import Login from 'src/components/Login';
import Footer from 'src/components/Footer';
import TicketForm from 'src/containers/TicketForm';
import PasswordForgotten from 'src/containers/PasswordForgotten';
import Validation from 'src/containers/Validation';
import Confirmation from 'src/containers/Confirmation';
import Cancellation from 'src/containers/Cancellation';
import Admin from 'src/containers/Admin';
import Legal from 'src/components/Legal';
import Data from 'src/components/Data';
import Faq from 'src/containers/Faq';
import Signup from 'src/containers/Signup';
import RestaurantProfile from 'src/containers/RestaurantProfile';
import NotFound from 'src/components/NotFound';
import CancellationByMail from 'src/containers/CancellationByMail';
import Team from 'src/components/Team';

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
      <ReactNotification />
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

          {/* Team */}
          <Route path="/team" exact>
            <Header />
            <Team />
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
            {!isRestaurantLogged && <Signup />}
            {isRestaurantLogged && <Redirect to="/" />}
            <Footer />
          </Route>

          {/* Forgotten pass */}
          <Route path="/forgotten-password" exact>
            <Header />
            <PasswordForgotten />
            <Footer />
          </Route>

          {/* Restaurant (Admin) */}
          {/* <Route path={`/partner/${restaurantId}/administration`} exact></Route> */}
          <Route path="/partner/:id/administration" exact>
            <Header />
            {isRestaurantLogged && <Admin />}
            {/* {!isRestaurantLogged && <Redirect from={`/partner/${restaurantId}/administration`} to="/" />} */}
            {!isRestaurantLogged && <Redirect to="/login" />}
          </Route>

          {/* Restaurant (Admin) */}
          {/* <Route path={`/partner/${restaurantId}/administration/edit`}> */}
          <Route path="/partner/:id/administration/edit" exact>
            <Header />
            {isRestaurantLogged && <RestaurantProfile />}
            {/* {!isRestaurantLogged && <Redirect from={`/partner/${restaurantId}/administration/edit`} to="/" />} */}
            {!isRestaurantLogged && <Redirect to="/login" />}
          </Route>

          {/* Client : Get a ticket */}
          <Route path="/restaurant/:id/tickets/add" exact>
            {!isTemporarySubscribedTicket && <TicketForm />}
            {isTemporarySubscribedTicket && <Redirect to="/restaurant/tickets/validate" />}
          </Route>

          {/* Client : Validate the ticket */}
          {isTemporarySubscribedTicket && (
            <Route path="/restaurant/tickets/validate" exact>
              {isTicketValidate === '' && <Validation />}
              {isTicketValidate !== '' && isTicketValidate && <Redirect to="/tickets/confirmation" />}
              {isTicketValidate !== '' && !isTicketValidate && <Redirect to="/tickets/cancellation" />}
            </Route>
          )}
          {!isTemporarySubscribedTicket && (
            <Route path="/restaurant/tickets/validate" exact>
              <Redirect to={`/restaurant/${localStorage.getItem('restaurantUrlId')}/tickets/add`} />
            </Route>
          )}

          {/* Client : Confirmation of ticket */}
          <Route path="/tickets/confirmation" exact>
            {isTicketValidate && <Confirmation />}
            {!isTicketValidate && <Redirect to={`/restaurant/${localStorage.getItem('restaurantUrlId')}/tickets/add`} />}
          </Route>

          {/* Client : Cancellation of ticket */}
          <Route path="/tickets/cancellation" exact>
            {!isTicketValidate && <Cancellation />}
            {isTicketValidate === '' && <Redirect to={`/restaurant/${localStorage.getItem('restaurantUrlId')}/tickets/add`} />}
          </Route>

          {/* Client : Cancellation of ticket by mail */}
          <Route path="/tickets/:id/customer-cancellation" exact>
            <CancellationByMail />
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

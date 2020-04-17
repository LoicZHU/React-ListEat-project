// import npm
import { connect } from 'react-redux';

// import
import App from 'src/components/App';
import { 
  checkLoggedRestaurant,
  fetchRestaurantData,
  fetchTicketsData,
} from 'src/actions/user';
// import { changeCheckingTemporarySubscribedTicket } from 'src/actions/ticket';

const mapStateToProps = (state) => ({
  isRestaurantLogged: state.user.isLogged,
  checkingLoggedRestaurant: state.user.checking,
  restaurantId: state.user.restaurantId,
  isTemporarySubscribedTicket: state.tickets.isTemporarySubscribedTicket,
  checkingTemporarySubscribedTicket: state.tickets.checkingTemporarySubscribedTicket,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoggedRestaurant: () => {
    dispatch(checkLoggedRestaurant());
  },
  fetchRestaurantData: () => {
    dispatch(fetchRestaurantData());
  },
  fetchTicketsData: () => {
    dispatch(fetchTicketsData());
  },
  // checkTemporarySubscribedTicket: () => {
  //   dispatch(changeCheckingTemporarySubscribedTicket());
  // },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

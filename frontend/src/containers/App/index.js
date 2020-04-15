import { connect } from 'react-redux';

import App from 'src/components/App';
import { checkLoggedRestaurant } from 'src/actions/user';


const mapStateToProps = (state) => ({
  isRestaurantLogged: state.user.isLogged,
  checkingLoggedRestaurant: state.user.checking,
  restaurantId: state.user.restaurantId,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoggedRestaurant: () => {
    dispatch(checkLoggedRestaurant());
  },
  fetchRestaurantData: () => {
    dispatch(fetchRestaurantData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

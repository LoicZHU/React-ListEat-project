import { connect } from 'react-redux';

import Header from 'src/components/Header';
import { logOut, handleMobileMenuOpened, closeMobileMenu } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isRestaurantLogged: state.user.isLogged,
  restaurantId: state.user.restaurantId,
  mobileMenuOpened: state.user.mobileMenuOpened,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logOut());
  },

  handleMobileMenuOpened: () => {
    dispatch(handleMobileMenuOpened());
  },

  closeMobileMenu: () => {
    dispatch(closeMobileMenu());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

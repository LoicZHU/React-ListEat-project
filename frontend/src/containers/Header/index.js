import { connect } from 'react-redux';

import Header from 'src/components/Header';
import { logOut } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isRestaurantLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

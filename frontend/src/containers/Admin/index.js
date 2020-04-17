// import npm
import { connect } from 'react-redux';

// import
import Admin from 'src/components/Admin';
import {
  increaseMinute,
  decreaseMinute,
  changeServiceStatus,
  refreshTime,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  status: state.user.restaurantProfileEditInput.status,
  averageEatingTime: state.user.restaurantProfileEditInput.averageEatingTime,
  tickets: state.user.restaurantTicketsData,
  loadingTicketsData: state.user.loadingTickets,
  // hour
  currentTime: state.user.currentTime,
});

const mapDispatchToProps = (dispatch) => ({
  handleDecreaseMinute: () => {
    dispatch(decreaseMinute());
  },
  handleIncreaseMinute: () => {
    dispatch(increaseMinute());
  },
  handleChangeServiceStatus: () => {
    dispatch(changeServiceStatus());
  },
  refreshTime: () => {
    dispatch(refreshTime());
  },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);

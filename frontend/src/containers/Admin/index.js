// import npm
import { connect } from 'react-redux';

// import
import Admin from 'src/components/Admin';
import { increaseMinute, decreaseMinute } from 'src/actions/user';

const mapStateToProps = (state) => ({
  status: state.user.restaurantProfileEditInput.status,
  averageEatingTime: state.user.restaurantProfileEditInput.averageEatingTime,
});

const mapDispatchToProps = (dispatch) => ({
  handleDecreaseMinute: () => {
    dispatch(decreaseMinute());
  },
  handleIncreaseMinute: () => {
    dispatch(increaseMinute());
  },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);

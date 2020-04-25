// imprto npm
import { connect } from 'react-redux';

// import
import RestaurantProfile from 'src/components/RestaurantProfile';
import {
  changeRestaurantProfileInputValue,
  editRestaurant,
  qrCodeDownload,
  changeIsNewPassConfirmed,
  clearShowedConfirmationOrErrorMessage,
  clearPasswordInputs,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  restaurantName: state.user.restaurantProfileEditInput.restaurantName,
  address: state.user.restaurantProfileEditInput.address,
  postcode: state.user.restaurantProfileEditInput.postcode,
  city: state.user.restaurantProfileEditInput.city,
  country: state.user.restaurantProfileEditInput.country,
  phone: state.user.restaurantProfileEditInput.phone,
  newPass: state.user.restaurantProfileEditInput.newPass,
  newPassConfirmation: state.user.restaurantProfileEditInput.newPassConfirmation,
  actualPass: state.user.restaurantProfileEditInput.actualPass,
  displayEditConfirmation: state.user.restaurantProfileEditInput.displayEditConfirmation,
  displayEditError: state.user.restaurantProfileEditInput.displayEditError,
  editErrorMessage: state.user.restaurantProfileEditInput.editErrorMessage,
  isNewPassConfirmed: state.user.restaurantProfileEditInput.isNewPassConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  changeRestaurantProfileInputValue: (newValue, fieldName) => {
    dispatch(changeRestaurantProfileInputValue(newValue, fieldName));
  },

  handleRestaurantEdit: () => {
    dispatch(editRestaurant());
  },

  handleQrCode: () => {
    dispatch(qrCodeDownload());
  },

  changeIsNewPassConfirmed: (newValue) => {
    dispatch(changeIsNewPassConfirmed(newValue));
  },

  clearShowedConfirmationOrErrorMessage: () => {
    dispatch(clearShowedConfirmationOrErrorMessage());
  },

  clearPasswordInputs: () => {
    dispatch(clearPasswordInputs());
  }
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantProfile);

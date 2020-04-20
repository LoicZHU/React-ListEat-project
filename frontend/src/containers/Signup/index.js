import { connect } from 'react-redux';

import Signup from 'src/components/Signup';
import { changeSignUpInputValue, signUp, changeShowPasswordError } from 'src/actions/user';

const mapStateToProps = (state) => ({
  lastname: state.user.signupInput.lastname,
  firstname: state.user.signupInput.firstname,
  email: state.user.signupInput.email,
  password: state.user.signupInput.password,
  passwordConfirmation: state.user.signupInput.passwordConfirmation,
  restaurantName: state.user.signupInput.restaurantName,
  address: state.user.signupInput.address,
  postcode: state.user.signupInput.postcode,
  city: state.user.signupInput.city,
  country: state.user.signupInput.country,
  phone: state.user.signupInput.phone,
  cis: state.user.signupInput.cis,
  averageEatingTime: state.user.signupInput.averageEatingTime,
  coversNumber: state.user.signupInput.coversNumber,
  showPasswordError: state.user.signupInput.showPasswordError,
  signupErrors: state.user.signupErrors,
  showSignupConfirmation: state.user.signupConfirmation,
});

const mapDispatchToProps = (dispatch) => ({
  changeSignUpInputValue: (newValue, fieldName) => {
    dispatch(changeSignUpInputValue(newValue, fieldName));

  },
  handleSubscribe: () => {
    dispatch(signUp());
  },

  handleChangePasswordConfirmation: (newValue) => {
    dispatch(changeShowPasswordError(newValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

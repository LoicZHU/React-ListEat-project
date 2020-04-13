import { connect } from 'react-redux';

import Form from 'src/components/Login/Form';
import { changeInputValue, logIn, showLoginError } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  errorMessage: state.user.loginErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (newValue, fieldName) => {
    dispatch(changeInputValue(newValue, fieldName));
  },
  handleLogin: () => {
    dispatch(logIn());
  },

  showLoginError: () => {
    dispatch(showLoginError());
  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

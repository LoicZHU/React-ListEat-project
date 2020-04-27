import { connect } from 'react-redux';

import PasswordForgotten from 'src/components/PasswordForgotten';
import {
  changePasswordResetInputValue,
  passwordResetCheckEmail,
  showVerificationCodeError,
  showNewPasswordField,
  newPasswordSubmit,
  clearForgottenPasswordPage,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.passwordReset.email,
  emailConfirmation: state.user.passwordReset.emailConfirmation,
  emailError: state.user.passwordReset.emailError,
  inputCode: state.user.passwordReset.inputCode,
  serverCode: state.user.passwordReset.serverCode,
  verificationCodeError: state.user.passwordReset.verificationCodeError,
  newPasswordField: state.user.passwordReset.newPasswordField,
  newPassword: state.user.passwordReset.newPassword,
  newPasswordConfirmed: state.user.passwordReset.newPasswordConfirmed,
});

const mapDispatchToProps = (dispatch) => ({

  changePasswordResetInputValue: (newValue, fieldName) => {
    dispatch(changePasswordResetInputValue(newValue, fieldName));
  },

  handleSendEmail: () => {
    dispatch(passwordResetCheckEmail());
  },

  showVerificationCodeError: () => {
    dispatch(showVerificationCodeError());
  },

  showNewPasswordField: () => {
    dispatch(showNewPasswordField());
  },

  newPasswordSubmit: () => {
    dispatch(newPasswordSubmit());
  },

  clearForgottenPasswordPage: () => {
    dispatch(clearForgottenPasswordPage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordForgotten);

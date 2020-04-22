import { connect } from 'react-redux';

import PasswordForgotten from 'src/components/PasswordForgotten';
import { changePasswordResetInputValue, passwordResetCheckEmail } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.passwordReset.email,
  emailConfirmation: state.user.passwordReset.emailConfirmation,
  emailError: state.user.passwordReset.emailError,
});

const mapDispatchToProps = (dispatch) => ({

  changePasswordResetInputValue: (newValue, fieldName) => {
    dispatch(changePasswordResetInputValue(newValue, fieldName));
  },

  handleSendEmail: () => {
    dispatch(passwordResetCheckEmail());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordForgotten);

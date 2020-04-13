import { connect } from 'react-redux';

import Form from 'src/components/Login/Form';
import { changeInputValue, logIn } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (newValue, fieldName) => {
    dispatch(changeInputValue(newValue, fieldName));
  },
  handleLogin: () => {
    dispatch(logIn());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

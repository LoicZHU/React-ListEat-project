// import
import { CHANGE_INPUT_VALUE, LOG_USER, LOG_OUT, SHOW_LOGIN_ERROR } from 'src/actions/user';

// initial state
const initialState = {
  email: '',
  password: '',
  isLogged: false,
  checking: true,
  loginErrorMessage: false,
};

// reducer
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };

    case LOG_USER:
      return {
        ...state,
        isLogged: action.isLogged,
        checking: false,
      };

    case LOG_OUT:
      return {
        ...state,
        isLogged: action.isLogged,
      };

    case SHOW_LOGIN_ERROR:
      return {
        ...state,
        loginErrorMessage: true,
      };

    default: return state;
  }
};

// export
export default userReducer;

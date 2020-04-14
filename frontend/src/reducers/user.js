// import
import { CHANGE_INPUT_VALUE, LOG_USER, LOG_OUT, SHOW_LOGIN_ERROR, CHANGE_CHECKING_RESTAURANT_LOGGED } from 'src/actions/user';

// initial state
const initialState = {
  // login
  email: '',
  password: '',
  isLogged: false,
  loginErrorMessage: false,

  // checking if logged
  checking: true,

  // restaurant
  restaurantId: null,
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
        restaurantId: action.restaurantId,
      };

    case LOG_OUT:
      return {
        ...state,
        isLogged: false,
      };

    case SHOW_LOGIN_ERROR:
      return {
        ...state,
        loginErrorMessage: true,
      };

    case CHANGE_CHECKING_RESTAURANT_LOGGED:
      return {
        ...state,
        checking: false,
      }

    default: return state;
  }
};

// export
export default userReducer;

// import
import {
  CHANGE_INPUT_VALUE,
  LOG_USER,
  LOG_OUT,
  SHOW_LOGIN_ERROR,
  CHANGE_CHECKING_RESTAURANT_LOGGED,
  CHANGE_SIGNUP_INPUT_VALUE,
  CHANGE_RESTAURANT_PROFILE_INPUT_VALUE,
  CHANGE_SHOW_PASSWORD_ERROR,
} from 'src/actions/user';

// initial state
const initialState = {
  // login
  email: '',
  password: '',
  isLogged: false,
  loginErrorMessage: false,
  checking: true,
  restaurantId: null, // int

  // sign up infos
  signupInput: {
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    restaurantName: '',
    address: '',
    postcode: '', // int
    city: '',
    country: '',
    phone: '',
    cis: '',
    averageEatingTime: '', // int
    coversNumber: '',
    showPasswordError: false, // int
  },

  // restaurant profile edit infos
  restaurantProfileEditInput: {
    restaurantName: '',
    address: '',
    postcode: '', // int
    city: '',
    country: '',
    phone: '',
    newPass: '',
    newPassConfirmation: '',
    actualPass: '',
  },
};

// reducer
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };

    case CHANGE_SIGNUP_INPUT_VALUE:
      return {
        ...state,
        signupInput: {
          ...state.signupInput,
          [action.fieldName]: action.newValue,
        },
      };

    case CHANGE_RESTAURANT_PROFILE_INPUT_VALUE:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          [action.fieldName]: action.newValue,
        },
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

    case CHANGE_CHECKING_RESTAURANT_LOGGED:
      return {
        ...state,
        checking: false,
      };

      case CHANGE_SHOW_PASSWORD_ERROR:
          console.log(action.newValue);
        return {
          ...state,
          signupInput: {
            ...state.signupInput,
            showPasswordError: action.newValue,
          },
        }


    default: return state;
  }
};

// export
export default userReducer;

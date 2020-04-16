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
  SAVE_RESTAURANT_DATA,
  SAVE_INCREASED_AVERAGE_TIME,
  SAVE_DECREASED_AVERAGE_TIME,
  SAVE_SIGN_UP_ERRORS,
  SAVE_CHANGED_SERVICE_STATUS,
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

  // sign up errors
  signupErrors: {},

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
    // page "administration" (mon espace)
    averageEatingTime: '', // int
    status: '', // int
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
      };

    case SAVE_RESTAURANT_DATA:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          averageEatingTime: action.averageEatingTime,
          status: action.status,
        },
      };

    case SAVE_INCREASED_AVERAGE_TIME:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          averageEatingTime: action.increasedAverageEatingTime,
        },
      };

    case SAVE_DECREASED_AVERAGE_TIME:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          averageEatingTime: action.decreasedAverageEatingTime,
        },
      };
      
    case SAVE_SIGN_UP_ERRORS:
      return {
        ...state,
        signupErrors: action.errors,
      };

    case SAVE_CHANGED_SERVICE_STATUS:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          status: newStatusService,
        },
      };

    default: return state;
  }
};

// export
export default userReducer;

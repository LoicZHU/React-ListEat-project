// import
import {
  CHANGE_INPUT_VALUE,
  LOG_USER,
  CLEAR_LOGIN_PAGE,
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
  SAVE_TICKETS_DATA,
  REFRESH_TIME,
  SHOW_SIGNUP_CONFIRMATION,
  MOBILE_MENU_OPENED,
  CLOSE_MOBILE_MENU,
  CHANGE_PASSWORDRESET_INPUT_VALUE,
  SHOW_PASSWORDRESET_EMAIL_ERROR,
  SHOW_PASSWORDRESET_EMAIL_CONFIRMATION,
  STORE_SERVER_TEMP_CODE,
  SHOW_NEW_PASSWORD_FIELD,
  SHOW_VERIFICATION_CODE_ERROR,
  STORE_SERVER_TEMP_USERID,
  CONFIRM_NEW_PASSWORD,
  OPEN_RESTAURANT_CONTENT,
  OPEN_CLIENT_CONTENT,
  DISPLAY_EDIT_CONFIRMATION,
  DISPLAY_EDIT_ERROR,
  CHANGE_IS_NEW_PASS_CONFIRMED,
  CLEAR_SHOWED_CONFIRMATION_OR_ERROR_MESSAGE,
  CLEAR_PASSWORD_INPUTS,
  CHANGE_IS_PASS_CONFIRMED,
  CLEAR_ALL,
  MOBILE_CLOCK_CLICK,
  CHANGE_IS_PASS_TOO_SHORT,
  CLEAR_FORGOTTEN_PASSWORD_PAGE,
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
    isPassConfirmed: true,
    isPassTooShort: false,
  },

  // sign up errors
  signupErrors: [],

  signupConfirmation: false,

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
    displayEditConfirmation: false,
    displayEditError: false,
    editErrorMessage: '',
    isNewPassConfirmed: true,
  },

  showElements: {
    mobileTimeEstimation: 'none',
  },

  // time
  currentTime: new Date().toLocaleTimeString("fr-FR", {hour: '2-digit', minute:'2-digit'}),

  // restaurant tickets data
  loadingTickets: true,
  restaurantTicketsData: [],

  // mobile menu handling
  mobileMenuOpened: false,

  // password reset
  passwordReset: {
    email: '',
    newPassword: '',
    inputCode: '',
    serverCode: '',
    userId: null,
    emailConfirmation: false,
    emailError: false,
    verificationCodeError: false,
    newPasswordField: false,
    newPasswordConfirmed: null,
  },

  // FAQ
  isRestaurantContentOpen: true,
  isClientContentOpen: false,
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
        signupConfirmation: false,
      };

    case CHANGE_RESTAURANT_PROFILE_INPUT_VALUE:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          [action.fieldName]: action.newValue,
          displayEditConfirmation: false,
          displayEditError: false,
          editErrorMessage: '',
          isNewPassConfirmed: true,
        },
      };

    case LOG_USER:
      return {
        ...state,
        isLogged: action.isLogged,
        checking: false,
        restaurantId: action.restaurantId,
      };

    case CLEAR_LOGIN_PAGE:
      return {
        ...state,
        email: '',
        password: '',
        loginErrorMessage: false,
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
      };

    case CHANGE_SHOW_PASSWORD_ERROR:
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
          restaurantName: action.restaurantName,
          address: action.address,
          postcode: action.postcode,
          city: action.city,
          country: action.country,
          phone: action.phone,
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
        signupConfirmation: false,
      };

    case SAVE_CHANGED_SERVICE_STATUS:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          status: action.newStatusService,
        },
      };

    case SAVE_TICKETS_DATA:
      return {
        ...state,
        loadingTickets: false,
        restaurantTicketsData: action.ticketsData,
      };

    case SHOW_SIGNUP_CONFIRMATION:
      return {
        ...state,
        signupConfirmation: true,
        signupErrors: [],
        // clear all inputs
        signupInput: {
          lastname: '',
          firstname: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          restaurantName: '',
          address: '',
          postcode: '',
          city: '',
          country: '',
          phone: '',
          cis: '',
          averageEatingTime: '',
          coversNumber: '',
          showPasswordError: false,
          isPassConfirmed: true,
        },
      };

    case REFRESH_TIME:
      return {
        ...state,
        currentTime: new Date().toLocaleTimeString("fr-FR", {hour: '2-digit', minute:'2-digit'}),
      };

    case MOBILE_MENU_OPENED:
      return {
        ...state,
        mobileMenuOpened: !state.mobileMenuOpened,
      };

    case CLOSE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuOpened: false,
      };

    case CHANGE_PASSWORDRESET_INPUT_VALUE:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          [action.fieldName]: action.newValue,
        },
      };

    case SHOW_PASSWORDRESET_EMAIL_ERROR:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          emailError: action.newValue,
        },
      };

    case SHOW_PASSWORDRESET_EMAIL_CONFIRMATION:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          emailConfirmation: action.newValue,
        },
      };

          case STORE_SERVER_TEMP_CODE:
              return {
                ...state,
                passwordReset: {
                  ...state.passwordReset,
                  serverCode: action.newValue,
                },
              }; 

          case STORE_SERVER_TEMP_USERID:
              return {
                ...state,
                passwordReset: {
                  ...state.passwordReset,
                  userId: action.newValue,
                },
              }; 

          case STORE_SERVER_TEMP_CODE:
              return {
                ...state,
                passwordReset: {
                  ...state.passwordReset,
                  serverCode: action.newValue,
                  customerId: action.userId,
                },
              }; 


    case SHOW_VERIFICATION_CODE_ERROR:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          verificationCodeError: true,
        },
      };

    case SHOW_NEW_PASSWORD_FIELD:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          newPasswordField: true,
        },
      };

    case CONFIRM_NEW_PASSWORD:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          newPasswordConfirmed: action.newValue,
          inputCode: '', // to have new page
          emailConfirmation: false, // to have new page
          newPasswordField: false, // to have new page
        },
      };

      // case SHOW_PASSWORDRESET_EMAIL_ERROR:
      //   return {
      //     ...state,
      //     passwordReset: {
      //       ...state.passwordReset,
      //       emailError: action.newValue,
      //     },
      //   };

      // case SHOW_PASSWORDRESET_EMAIL_CONFIRMATION:
      //   return {
      //     ...state,
      //     passwordReset: {
      //       ...state.passwordReset,
      //       emailConfirmation: action.newValue,
      //     },
      //   };

    case CLEAR_FORGOTTEN_PASSWORD_PAGE:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          email: '',
          newPassword: '',
          // inputCode: '',
          // serverCode: '',
          // userId: null,
          // emailConfirmation: false,
          emailError: false,
          verificationCodeError: false,
          // newPasswordField: false,
          newPasswordConfirmed: false,
        },
      };

    case OPEN_RESTAURANT_CONTENT:
      return {
        ...state,
        isRestaurantContentOpen: true,
        isClientContentOpen: false,
      };

    case OPEN_CLIENT_CONTENT:
      return {
        ...state,
        isRestaurantContentOpen: false,
        isClientContentOpen: true,
      };

    case DISPLAY_EDIT_CONFIRMATION:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          displayEditConfirmation: true,
          displayEditError: false,
          actualPass: '',
        },
      };

    case DISPLAY_EDIT_ERROR:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          displayEditConfirmation: false,
          displayEditError: true,
          editErrorMessage: action.editErrorMessage,
          actualPass: '',
        },
      };

    case CHANGE_IS_NEW_PASS_CONFIRMED:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          isNewPassConfirmed: action.newValue,
          newPass: '',
          newPassConfirmation: '',
          actualPass: '',
          displayEditConfirmation: false,
          displayEditError: false,
        },
      };

    case CLEAR_SHOWED_CONFIRMATION_OR_ERROR_MESSAGE:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          displayEditConfirmation: false,
          displayEditError: false,
          isNewPassConfirmed: true,
        },
      };

    case CLEAR_PASSWORD_INPUTS:
      return {
        ...state,
        restaurantProfileEditInput: {
          ...state.restaurantProfileEditInput,
          newPass: '',
          newPassConfirmation: '',
          actualPass: '',
        },
      };

    case CHANGE_IS_PASS_CONFIRMED:
      return {
        ...state,
        signupInput: {
          ...state.signupInput,
          isPassConfirmed: action.newValue,
        },
      };

    case MOBILE_CLOCK_CLICK:
      return {
        ...state,
        showElements: {
          ...state.showElements,
          mobileTimeEstimation: action.newValue,
        },
      };

    case CLEAR_ALL:
      return {
        ...state,
        signupInput: {
          ...state.signupInput,
          lastname: '',
          firstname: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          restaurantName: '',
          address: '',
          postcode: '',
          city: '',
          country: '',
          phone: '',
          cis: '',
          averageEatingTime: '',
          coversNumber: '',
          showPasswordError: false,
          isPassConfirmed: true,
          isPassTooShort: false,
        },
        signupErrors: [],
        signupConfirmation: false,
      };

    case CHANGE_IS_PASS_TOO_SHORT:
      return {
        ...state,
        signupInput: {
          ...state.signupInput,
          isPassTooShort: action.newValue,
        },
      };

    default: return state;
  }
};

// export
export default userReducer;

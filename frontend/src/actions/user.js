// action type
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const LOG_IN = 'LOG_IN';
export const LOG_USER = 'LOG_USER';
export const CHECK_LOGGED_RESTAURANT = 'CHECK_LOGGED_RESTAURANT';
export const LOG_OUT = 'LOG_OUT';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';

// action creator
export const changeInputValue = (newValue, fieldName) => ({
  type: CHANGE_INPUT_VALUE,
  newValue,
  fieldName,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const logUser = (isLogged) => ({
  type: LOG_USER,
  isLogged,
});

export const checkLoggedRestaurant = () => ({
  type: CHECK_LOGGED_RESTAURANT,
});

export const logOut = (isLogged) => ({
  type: LOG_OUT,
  isLogged,
});

export const showLoginError = () => ({
  type: SHOW_LOGIN_ERROR,
});

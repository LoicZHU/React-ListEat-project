// action type
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const LOG_IN = 'LOG_IN';
export const LOG_USER = 'LOG_USER';
export const CHECK_LOGGED_RESTAURANT = 'CHECK_LOGGED_RESTAURANT';
export const LOG_OUT = 'LOG_OUT';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
export const CHANGE_CHECKING_RESTAURANT_LOGGED = 'CHANGE_CHECKING_RESTAURANT_LOGGED';

// action creator
export const changeInputValue = (newValue, fieldName) => ({
  type: CHANGE_INPUT_VALUE,
  newValue,
  fieldName,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const logUser = (isLogged, restaurantId) => ({
  type: LOG_USER,
  isLogged,
  restaurantId,
});

export const checkLoggedRestaurant = () => ({
  type: CHECK_LOGGED_RESTAURANT,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const showLoginError = () => ({
  type: SHOW_LOGIN_ERROR,
});

export const changeCheckingRestaurantLogged = () => ({
  type: CHANGE_CHECKING_RESTAURANT_LOGGED,
});


// action type
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CHANGE_SIGNUP_INPUT_VALUE = 'CHANGE_SIGNUP_INPUT_VALUE';
export const CHANGE_RESTAURANT_PROFILE_INPUT_VALUE = 'CHANGE_RESTAURANT_PROFILE_INPUT_VALUE';
export const LOG_IN = 'LOG_IN';
export const LOG_USER = 'LOG_USER';
export const CHECK_LOGGED_RESTAURANT = 'CHECK_LOGGED_RESTAURANT';
export const LOG_OUT = 'LOG_OUT';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
export const CHANGE_CHECKING_RESTAURANT_LOGGED = 'CHANGE_CHECKING_RESTAURANT_LOGGED';
export const FETCH_RESTAURANT_DATA = 'FETCH_RESTAURANT_DATA';
export const CHANGE_SHOW_PASSWORD_ERROR = 'CHANGE_SHOW_PASSWORD_ERROR';
export const SIGN_UP = 'SIGN_UP';
export const EDIT_RESTAURANT = 'EDIT_RESTAURANT';

// action creator
export const changeInputValue = (newValue, fieldName) => ({
  type: CHANGE_INPUT_VALUE,
  newValue,
  fieldName,
});

export const changeSignUpInputValue = (newValue, fieldName) => ({
  type: CHANGE_SIGNUP_INPUT_VALUE,
  newValue,
  fieldName,
});

export const changeRestaurantProfileInputValue = (newValue, fieldName) => ({
  type: CHANGE_RESTAURANT_PROFILE_INPUT_VALUE,
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

export const changeShowPasswordError = (newValue) => ({
  type: CHANGE_SHOW_PASSWORD_ERROR,
  newValue,
});

export const fetchRestaurantData = (restaurantId) => ({
  type: FETCH_RESTAURANT_DATA,
  restaurantId,
});

export const signUp = () => ({
  type: SIGN_UP,
});

export const editRestaurant = () => ({
  type: EDIT_RESTAURANT,
});

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
export const SAVE_SIGN_UP_ERRORS = 'SAVE_SIGN_UP_ERRORS';
export const EDIT_RESTAURANT = 'EDIT_RESTAURANT';
export const SAVE_RESTAURANT_DATA = 'SAVE_RESTAURANT_DATA';
export const INCREASE_MINUTE = 'INCREASE_MINUTE';
export const SAVE_INCREASED_AVERAGE_TIME = 'SAVE_INCREASED_AVERAGE_TIME';
export const DECREASE_MINUTE = 'DECREASE_MINUTE';
export const SAVE_DECREASED_AVERAGE_TIME = 'SAVE_DECREASED_AVERAGE_TIME'
export const CHANGE_SERVICE_STATUS = 'CHANGE_SERVICE_STATUS';
export const SAVE_CHANGED_SERVICE_STATUS = 'SAVE_CHANGED_SERVICE_STATUS';
export const CHANGE_TICKET_INPUT_VALUE = 'CHANGE_TICKET_INPUT_VALUE';
export const FETCH_TICKETS_DATA = 'FETCH_TICKETS_DATA';
export const SAVE_TICKETS_DATA = 'SAVE_TICKETS_DATA';
export const REFRESH_TIME = 'REFRESH_TIME';
export const SHOW_SIGNUP_CONFIRMATION = 'SHOW_SIGNUP_CONFIRMATION';
export const QRCODE_DOWNLOAD = 'QRCODE_DOWNLOAD';
export const MOBILE_MENU_OPENED = 'MOBILE_MENU_OPENED';
export const CLOSE_MOBILE_MENU = 'CLOSE_MOBILE_MENU';
export const CHANGE_PASSWORDRESET_INPUT_VALUE = 'CHANGE_PASSWORDRESET_INPUT_VALUE';
export const PASSWORD_RESET_CHECK_EMAIL = 'PASSWORD_RESET_CHECK_EMAIL';
export const SHOW_PASSWORDRESET_EMAIL_ERROR = 'SHOW_PASSWORDRESET_EMAIL_ERROR';
export const SHOW_PASSWORDRESET_EMAIL_CONFIRMATION = 'SHOW_PASSWORDRESET_EMAIL_CONFIRMATION';
export const STORE_SERVER_TEMP_CODE = 'STORE_SERVER_TEMP_CODE';
export const SHOW_VERIFICATION_CODE_ERROR = 'SHOW_VERIFICATION_CODE_ERROR';
export const SHOW_NEW_PASSWORD_FIELD = 'SHOW_NEW_PASSWORD_FIELD';
export const SUBMIT_NEW_PASSWORD = 'SUBMIT_NEW_PASSWORD';
export const STORE_SERVER_TEMP_USERID = 'STORE_SERVER_TEMP_USERID';
export const CONFIRM_NEW_PASSWORD = 'CONFIRM_NEW_PASSWORD';
export const OPEN_RESTAURANT_CONTENT = 'OPEN_RESTAURANT_CONTENT';
export const OPEN_CLIENT_CONTENT = 'OPEN_CLIENT_CONTENT';
export const DISPLAY_EDIT_CONFIRMATION = 'DISPLAY_EDIT_CONFIRMATION';
export const DISPLAY_EDIT_ERROR = 'DISPLAY_EDIT_ERROR';
export const CHANGE_IS_NEW_PASS_CONFIRMED = 'CHANGE_IS_NEW_PASS_CONFIRMED';
export const CLEAR_SHOWED_CONFIRMATION_OR_ERROR_MESSAGE = 'CLEAR_SHOWED_CONFIRMATION_OR_ERROR_MESSAGE';
export const CHANGE_IS_PASS_CONFIRMED = 'CHANGE_IS_PASS_CONFIRMED';
export const CLEAR_ALL = 'CLEAR_ALL';

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

export const showSignupConfirmation = () => ({
  type: SHOW_SIGNUP_CONFIRMATION,
});

export const saveSignUpErrors = (errors) => ({
  type: SAVE_SIGN_UP_ERRORS,
  errors,
});

export const editRestaurant = () => ({
  type: EDIT_RESTAURANT,
});

export const saveRestaurantData = (
  averageEatingTime,
  status,
  restaurantName,
  address,
  postcode,
  city,
  country,
  phone,
) => ({
  type: SAVE_RESTAURANT_DATA,
  averageEatingTime,
  status,
  restaurantName,
  address,
  postcode,
  city,
  country,
  phone,
});

export const increaseMinute = () => ({
  type: INCREASE_MINUTE,
});

export const saveIncreasedAverageEatingTime = (increasedAverageEatingTime) => ({
  type: SAVE_INCREASED_AVERAGE_TIME,
  increasedAverageEatingTime,
});

export const decreaseMinute = () => ({
  type: DECREASE_MINUTE,
});

export const saveDecreasedAverageEatingTime = (decreasedAverageEatingTime) => ({
  type: SAVE_DECREASED_AVERAGE_TIME,
  decreasedAverageEatingTime,
});

export const changeServiceStatus = () => ({
  type: CHANGE_SERVICE_STATUS,
});

export const saveChangedServiceStatus = (newStatusService) => ({
  type: SAVE_CHANGED_SERVICE_STATUS,
  newStatusService,
});


export const fetchTicketsData = () => ({
  type: FETCH_TICKETS_DATA,
});

export const saveTicketsData = (ticketsData) => ({
  type: SAVE_TICKETS_DATA,
  ticketsData,
});

export const changeTicketInputValue = (newValue, fieldName) => ({
  type: CHANGE_TICKET_INPUT_VALUE,
  newValue,
  fieldName,
});

export const refreshTime = () => ({
  type: REFRESH_TIME,
});

export const qrCodeDownload = () => ({
  type: QRCODE_DOWNLOAD,
});

export const handleMobileMenuOpened = () => ({
  type: MOBILE_MENU_OPENED,
});

export const closeMobileMenu = () => ({
  type: CLOSE_MOBILE_MENU,
});

export const changePasswordResetInputValue = (newValue, fieldName) => ({
  type: CHANGE_PASSWORDRESET_INPUT_VALUE,
  newValue,
  fieldName,
});

export const passwordResetCheckEmail = () => ({
  type: PASSWORD_RESET_CHECK_EMAIL,
});

export const showPasswordResetEmailConfirmation = (newValue) => ({
  type: SHOW_PASSWORDRESET_EMAIL_CONFIRMATION,
  newValue,
});

export const showPasswordResetEmailError = (newValue) => ({
  type: SHOW_PASSWORDRESET_EMAIL_ERROR,
  newValue,
});

export const storeServerCode = (newValue, userId) => ({
  type: STORE_SERVER_TEMP_CODE,
  newValue,
});

export const storeUserId = (newValue) => ({
  type: STORE_SERVER_TEMP_USERID,
  newValue,
});

export const showNewPasswordField = () => ({
  type: SHOW_NEW_PASSWORD_FIELD,
});

export const showVerificationCodeError = () => ({
  type: SHOW_VERIFICATION_CODE_ERROR,
});

export const newPasswordSubmit = () => ({
  type: SUBMIT_NEW_PASSWORD,
});

export const confirmNewPassword = (newValue) => ({
  type: CONFIRM_NEW_PASSWORD,
  newValue,
});

export const openRestaurantContent = () => ({
  type: OPEN_RESTAURANT_CONTENT,
});

export const openClientContent = () => ({
  type: OPEN_CLIENT_CONTENT,
});

export const displayEditConfirmation = () => ({
  type: DISPLAY_EDIT_CONFIRMATION,
});

export const displayEditError = (editErrorMessage) => ({
  type: DISPLAY_EDIT_ERROR,
  editErrorMessage,
});

export const changeIsNewPassConfirmed = (newValue) => ({
  type: CHANGE_IS_NEW_PASS_CONFIRMED,
  newValue,
});

export const clearShowedConfirmationOrErrorMessage = () => ({
  type: CLEAR_SHOWED_CONFIRMATION_OR_ERROR_MESSAGE,
});

export const changeIsPassConfirmed = (newValue) => ({
  type: CHANGE_IS_PASS_CONFIRMED,
  newValue,
});

export const clearAll = () => ({
  type: CLEAR_ALL,
});

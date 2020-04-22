// action type
export const CHANGE_TICKET_INPUT_VALUE = 'CHANGE_TICKET_INPUT_VALUE';
export const SUBSCRIBE_TO_WAITING_LIST = 'SUBSCRIBE_TO_WAITING_LIST';
export const SAVE_SUBSCRIBE_TICKET_ERRORS = 'SAVE_SUBSCRIBE_TICKET_ERRORS';
export const SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION = 'SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION';
export const UPDATE_CURRENT_TICKET = 'UPDATE_CURRENT_TICKET';
export const CONFIRM_CURRENT_TICKET = 'CONFIRM_CURRENT_TICKET';
export const CANCEL_CURRENT_TICKET = 'CANCEL_CURRENT_TICKET';
export const GET_RESTAURANT_INFOS = 'GET_RESTAURANT_INFOS';
export const SAVE_RESTAURANT_INFOS = 'SAVE_RESTAURANT_INFOS';
export const SEND_TICKET_VALIDATION = 'SEND_TICKET_VALIDATION';
export const SAVE_TICKET_STATUS = 'SAVE_TICKET_STATUS';
export const MODAL_TICKET_ADD = 'MODAL_TICKET_ADD';
export const GET_RESTAURANT_NAME = 'GET_RESTAURANT_NAME';
export const SAVE_RESTAURANT_NAME = 'SAVE_RESTAURANT_NAME';
export const SHOW_MODAL_TICKET_FORM = 'SHOW_MODAL_TICKET_FORM';
export const SHOW_MODAL_TICKET_VALIDATION = 'SHOW_MODAL_TICKET_VALIDATION';
export const MODAL_TICKET_VALIDATE = 'MODAL_TICKET_VALIDATE';
export const MODAL_TICKET_STORE_TEMP = 'MODAL_TICKET_STORE_TEMP';
export const MODAL_TICKET_CANCEL = 'MODAL_TICKET_CANCEL';
export const SHOW_MODAL_EMAIL_ERROR = 'SHOW_MODAL_EMAIL_ERROR';
export const SHOW_MODAL_ERRORS = 'SHOW_MODAL_ERRORS';
export const CLEAR_MODAL_FORM = 'CLEAR_MODAL_FORM';

// export const CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET = 'CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET';

// action creator
export const changeTicketInputValue = (newValue, fieldName) => ({
  type: CHANGE_TICKET_INPUT_VALUE,
  newValue,
  fieldName,
});

export const subscribeToWaitingList = () => ({
  type: SUBSCRIBE_TO_WAITING_LIST,
});

export const saveSubscribeTicketErrors = (errors) => ({
  type: SAVE_SUBSCRIBE_TICKET_ERRORS,
  errors,
});

export const updateCurrentTicket = (newValue) => ({
  type: UPDATE_CURRENT_TICKET,
  newValue,
});

export const confirmCurrentTicket = () => ({
  type: CONFIRM_CURRENT_TICKET,
});

export const cancelCurrentTicket = () => ({
  type: CANCEL_CURRENT_TICKET,
});

export const modalTicketAdd = () => ({
  type: MODAL_TICKET_ADD,
});

export const modalTicketValidate = () => ({
  type: MODAL_TICKET_VALIDATE,
});

export const modalTicketStoreTemp = (estimatedEntryTime, ticketId) => ({
  type: MODAL_TICKET_STORE_TEMP,
  estimatedEntryTime,
  ticketId,
});

export const getRestaurantName = () => ({
  type: GET_RESTAURANT_NAME,
});

export const getRestaurantInfos = () => ({
  type: GET_RESTAURANT_INFOS,
});


export const showModalTicketForm = () => ({
  type: SHOW_MODAL_TICKET_FORM,
});

export const showModalTicketValidation = () => ({
  type: SHOW_MODAL_TICKET_VALIDATION,
});

export const handleModalTicketCancel = () => ({
  type: MODAL_TICKET_CANCEL,
});

export const showModalEmailError = () => ({
  type: SHOW_MODAL_EMAIL_ERROR,
});

export const showModalErrors = () => ({
  type: SHOW_MODAL_ERRORS,
});

export const saveRestaurantInfos = (restaurantId, restaurantName, restaurantUrlId) => ({
  type: SAVE_RESTAURANT_INFOS,
  restaurantId,
  restaurantName,
  restaurantUrlId,

});

export const saveSubscribeTicketSubscription = (ticketId, ticketCutlery, ticketWaitingTime) => ({
  type: SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION,
  ticketId,
  ticketCutlery,
  ticketWaitingTime,
});

export const sendTicketValidation = (newValue) => ({
  type: SEND_TICKET_VALIDATION,
  newValue,
});

export const saveTicketStatus = (newValue, isValidate, estimatedEntryTime) => ({
  type: SAVE_TICKET_STATUS,
  newValue,
  isValidate,
  estimatedEntryTime,
});

export const handleClearModalForm = () => ({
  type: CLEAR_MODAL_FORM,
});

// export const changeCheckingTemporarySubscribedTicket = () => ({
//   type: CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET,
// });

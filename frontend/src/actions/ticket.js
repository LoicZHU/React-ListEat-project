// action type
export const CHANGE_TICKET_INPUT_VALUE = 'CHANGE_TICKET_INPUT_VALUE';
export const SUBSCRIBE_TO_WAITING_LIST = 'SUBSCRIBE_TO_WAITING_LIST';
export const SAVE_SUBSCRIBE_TICKET_ERRORS = 'SAVE_SUBSCRIBE_TICKET_ERRORS';
export const SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION = 'SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION';
export const UPDATE_CURRENT_TICKET = 'UPDATE_CURRENT_TICKET';
export const CONFIRM_CURRENT_TICKET = 'CONFIRM_CURRENT_TICKET';
export const CANCEL_CURRENT_TICKET = 'CANCEL_CURRENT_TICKET';

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


// export const saveSubscribeTicketSubscription = () => ({
//   type: SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION,
// });

// export const changeCheckingTemporarySubscribedTicket = () => ({
//   type: CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET,
// });

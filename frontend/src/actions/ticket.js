// action type
export const CHANGE_TICKET_INPUT_VALUE = 'CHANGE_TICKET_INPUT_VALUE';
export const SUBSCRIBE_TO_WAITING_LIST = 'SUBSCRIBE_TO_WAITING_LIST';
export const SAVE_SUBSCRIBE_TICKET_ERRORS = 'SAVE_SUBSCRIBE_TICKET_ERRORS';
export const SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION = 'SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION';
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

// export const saveSubscribeTicketSubscription = () => ({
//   type: SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION,
// });

// export const changeCheckingTemporarySubscribedTicket = () => ({
//   type: CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET,
// });

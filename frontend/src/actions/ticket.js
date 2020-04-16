// action type
export const CHANGE_TICKET_INPUT_VALUE = 'CHANGE_TICKET_INPUT_VALUE';
export const SUBSCRIBE_TO_WAITING_LIST = 'SUBSCRIBE_TO_WAITING_LIST';

// action creator
export const changeTicketInputValue = (newValue, fieldName) => ({
  type: CHANGE_TICKET_INPUT_VALUE,
  newValue,
  fieldName,
});

export const subscribeToWaitingList = () => ({
  type: SUBSCRIBE_TO_WAITING_LIST,
});

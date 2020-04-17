// import
import {
  CHANGE_TICKET_INPUT_VALUE,
  SAVE_SUBSCRIBE_TICKET_ERRORS,
  // SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION,
  // CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET,
} from 'src/actions/ticket';

// initial state
const initialState = {
  // checkingTemporarySubscribedTicket: true,

  // ticket inscription infos
  ticketInscriptionInput: {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    cutlery: '', // int
  },

  // ticket subscription errors
  ticketSubscriptionErrors: [],

  // subscribe ticket (subscription)
  // isTemporarySubscribedTicket: false,
};

// reducer
const ticketsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_TICKET_INPUT_VALUE:
      return {
        ...state,
        ticketInscriptionInput: {
          ...state.ticketInscriptionInput,
          [action.fieldName]: action.newValue,
        },
      };

    case SAVE_SUBSCRIBE_TICKET_ERRORS:
      return {
        ...state,
        ticketSubscriptionErrors: action.errors,
      };

    // case SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION:
    //   return {
    //     ...state,
    //     isTemporarySubscribedTicket: true,
    //   };

    // case CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET:
    //   console.log('change tempo checking');
    //   return {
    //     ...state,
    //     checkingTemporarySubscribedTicket: false,
    //   };

    default: return state;
  }
};


// export
export default ticketsReducer;

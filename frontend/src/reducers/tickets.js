// import
import {
  CHANGE_TICKET_INPUT_VALUE,
  SAVE_SUBSCRIBE_TICKET_ERRORS,
  UPDATE_CURRENT_TICKET,
  SAVE_RESTAURANT_INFOS,
  SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION,
  SAVE_TICKET_STATUS,
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

  currentTicket: {
    id: 0,
    coversNb: 0,
    status: 0,
    customer: {
      id: 0,
      lastName: '',
      firstName: '',
      cellPhone: '',
      email: '',
    },
    estimatedWaitingTime: 0,
    estimatedEntryTime: "2020-04-16T21:20:18+02:00"
  },

  // client : restaurant infos (on ticket form)
  restaurantId: '',
  restaurantName: '',
  restaurantUrlId: '',
  restaurantNameLoaded: false,

  // client : temporary ticket infos (ticket form submit)
  isTemporarySubscribedTicket: false,
  ticketId: '',
  ticketCutlery: '',
  ticketWaitingTime: '',

  ticketStatus: '',
  isTicketValidate: '',
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

      case UPDATE_CURRENT_TICKET:
        return {
          ...state,
          currentTicket: action.newValue,
        };

    case SAVE_SUBSCRIBE_TICKET_SUBSCRIPTION:
      return {
        ...state,
        ticketId: action.ticketId,
        ticketCutlery: action.ticketCutlery,
        ticketWaitingTime: action.ticketWaitingTime,
        isTemporarySubscribedTicket: true,
      };

    // case CHANGE_CHECKING_TEMPORARY_SUBSCRIBED_TICKET:
    //   console.log('change tempo checking');
    //   return {
    //     ...state,
    //     checkingTemporarySubscribedTicket: false,
    //   };

    case SAVE_RESTAURANT_INFOS:
      return {
        ...state,
        restaurantId: action.restaurantId,
        restaurantName: action.restaurantName,
        restaurantUrlId: action.restaurantUrlId,
        restaurantNameLoaded: true,
      };

    case SAVE_TICKET_STATUS:
      return {
        ...state,
        ticketStatus: action.newValue,
        isTicketValidate: action.isValidate,
      };

    default: return state;
  }
};


// export
export default ticketsReducer;

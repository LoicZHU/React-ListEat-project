// import
import {
  CHANGE_TICKET_INPUT_VALUE,
} from 'src/actions/ticket';

// initial state
const initialState = {
    // ticket inscription infos
    ticketInscriptionInput: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      coversNumber: '',
      cutlery: '',
    },
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

    default: return state;
  }
};


// export
export default ticketsReducer;

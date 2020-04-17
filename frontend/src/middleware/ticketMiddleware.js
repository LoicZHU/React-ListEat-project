// import npm
import axios from 'axios';

// import
import {
  SUBSCRIBE_TO_WAITING_LIST,
  saveSubscribeTicketErrors,
  // saveSubscribeTicketSubscription,
} from 'src/actions/ticket';

// const baseUrl = '54.162.210.163:8080';
const baseUrl = 'localhost:8001';
const url = 'localhost:8080';

// middleware
const ticketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBSCRIBE_TO_WAITING_LIST:
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/tickets`,
        data: {
          lastName: store.getState().tickets.ticketInscriptionInput.lastName,
          firstName: store.getState().tickets.ticketInscriptionInput.firstName,
          cellPhone: store.getState().tickets.ticketInscriptionInput.phone,
          email: store.getState().tickets.ticketInscriptionInput.email,
          restaurant: '3', // TODO: récup l'id
          ticket: {
            coversNb: Number(store.getState().tickets.ticketInscriptionInput.cutlery),
          },
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          // console.log('save tempo ticket');
          // store.dispatch(saveSubscribeTicketSubscription());
          window.location.replace(`http://${url}/restaurant/3/tickets/validate`); // TODO récup id
        })
        .catch((error) => {
          console.warn(error.response);
          store.dispatch(saveSubscribeTicketErrors(error.response.data));
        });
      next(action);
      break;

    default:
      next(action);
  }
};

// export
export default ticketMiddleware;

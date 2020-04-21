// import npm
import axios from 'axios';

// import
import {
  SUBSCRIBE_TO_WAITING_LIST,
  CONFIRM_CURRENT_TICKET,
  CANCEL_CURRENT_TICKET,
  saveSubscribeTicketErrors,
  GET_RESTAURANT_INFOS,
  saveRestaurantInfos,
  saveSubscribeTicketSubscription,
  SEND_TICKET_VALIDATION,
  saveTicketStatus,
} from 'src/actions/ticket';


// import
import {
  fetchTicketsData,
} from 'src/actions/user';

// const baseUrl = '54.162.210.163:8080';
const baseUrl = 'localhost:8001';
const url = 'localhost:8080';

// const id = store.getState().user.restaurantId;

// middleware
const ticketMiddleware = (store) => (next) => (action) => {

  const id = store.getState().user.restaurantId;
  const ticketId = store.getState().tickets.currentTicket.id;

  switch (action.type) {
    case GET_RESTAURANT_INFOS:
      const restaurantUrlId = window.location.pathname.match((new RegExp('restaurant/' + "(.*)" + '/tickets')))[1];

      axios({
        method: 'post',
        url: `http://${baseUrl}/api/decrypt`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          restaurant: restaurantUrlId,
        },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveRestaurantInfos(response.data.id, response.data.name, restaurantUrlId));
        })
        .catch((error) => {
          console.warn(error.response);
        });
      next(action);
      break;

    case SUBSCRIBE_TO_WAITING_LIST:
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/tickets`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          lastName: store.getState().tickets.ticketInscriptionInput.lastName,
          firstName: store.getState().tickets.ticketInscriptionInput.firstName,
          cellPhone: store.getState().tickets.ticketInscriptionInput.phone,
          email: store.getState().tickets.ticketInscriptionInput.email,
          restaurant: store.getState().tickets.restaurantId,
          ticket: {
            coversNb: Number(store.getState().tickets.ticketInscriptionInput.cutlery),
          },
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveSubscribeTicketSubscription(response.data.ticketId, store.getState().tickets.ticketInscriptionInput.cutlery, response.data.estimatedWaitingTime));

          // localStorage.setItem('ticketId', response.data.ticketId);
          // localStorage.setItem('ticketCutlery', store.getState().tickets.ticketInscriptionInput.cutlery);
          // localStorage.setItem('ticketEstimatedWaitingTime', response.data.estimatedWaitingTime);

          // window.location.replace(`http://${url}/restaurant/${restaurantId}/tickets/validate`);
        })
        .catch((error) => {
          console.warn(error.response);
          // store.dispatch(saveSubscribeTicketErrors(error.response.data));
        });
      next(action);
      break;

    case SEND_TICKET_VALIDATION:
      const ticketId = store.getState().tickets.ticketId;

      axios({
        method: 'put',
        url: `http://${baseUrl}/api/tickets/${ticketId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          validation: action.newValue,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          const isTicketValidate = (response.data.ticketStatus === 1); // boolean
          store.dispatch(saveTicketStatus(response.data.ticketStatus, isTicketValidate));
        })
        .catch((error) => {
          console.warn(error.response);
        });

      next(action);
      break;

      case CANCEL_CURRENT_TICKET:
        axios({
          method: 'put',
          url:`http://${baseUrl}/api/partner/${id}/tickets/${ticketId}`, 
          headers: {
            'Content-Type': 'application/json',
          },
          data: {              
            status: "cancelled",
          },
        }).then((response) => {
          store.dispatch(fetchTicketsData());
          console.log(response);
        })
          .catch((error) => {
            console.warn(error);
          });
        next(action);
        break;

        case CONFIRM_CURRENT_TICKET:
          axios({
            method: 'put',
            url:`http://${baseUrl}/api/partner/${id}/tickets/${ticketId}`, 
            headers: {
              'Content-Type': 'application/json',
            },
            data: {              
              status: "seated",             
            },
          }).then((response) => {
            console.log(response);
            store.dispatch(fetchTicketsData());
          })
            .catch((error) => {
              console.warn(error);
            });
          next(action);
          break;


    default:
      next(action);
  }
};

// export
export default ticketMiddleware;

// == import npm
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
  MODAL_TICKET_ADD,
  MODAL_TICKET_VALIDATE,
  GET_RESTAURANT_NAME,
  saveRestaurantName,
  modalTicketStoreTemp,
  MODAL_TICKET_CANCEL,
  handleClearModalForm,
  // fetchNewCustomerTicket,
  updateCurrentTicket,
  FETCH_TICKET_DATA_TO_CANCEL,
  saveTicketInfoToCancel,
  CANCEL_TICKET,
  displayCancelConfirmation,
  // saveSubscribeTicketSubscription,
} from 'src/actions/ticket';


// import
import {
  fetchTicketsData,
  saveTicketsData,
  // updateCurrentTicket,
} from 'src/actions/user';

const baseUrl = 'http://localhost:8080';
// const baseUrl = 'https://www.listeat.io:8080';

// const id = store.getState().user.restaurantId;

// middleware
const ticketMiddleware = (store) => (next) => (action) => {

  const id = store.getState().user.restaurantId;
  const ticketId = store.getState().tickets.currentTicket.id;
  const tempModalTicketId = store.getState().tickets.ticketInscriptionInput.ticketId;

  switch (action.type) {
    case GET_RESTAURANT_INFOS:
      const restaurantUrlId = window.location.pathname.match((new RegExp('restaurant/' + "(.*)" + '/tickets')))[1];
      localStorage.setItem('restaurantUrlId', restaurantUrlId);

      axios({
        method: 'post',
        url: `${baseUrl}/api/decrypt`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          restaurant: restaurantUrlId,
        },
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(saveRestaurantInfos(response.data.id, response.data.name, restaurantUrlId, response.data.status));
        })
        .catch((error) => {
          // console.warn(error.response);
        });
      next(action);
      break;

    case SUBSCRIBE_TO_WAITING_LIST:
      axios({
        method: 'post',
        url: `${baseUrl}/api/tickets`,
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
          // console.log(response);
          store.dispatch(saveSubscribeTicketSubscription(response.data.ticketId, store.getState().tickets.ticketInscriptionInput.cutlery, response.data.estimatedWaitingTime));

          // localStorage.setItem('ticketId', response.data.ticketId);
          // localStorage.setItem('ticketCutlery', store.getState().tickets.ticketInscriptionInput.cutlery);
          // localStorage.setItem('ticketEstimatedWaitingTime', response.data.estimatedWaitingTime);

          // window.location.replace(`http://${url}/restaurant/${restaurantId}/tickets/validate`);
        })
        .catch((error) => {
          // console.warn(error.response);
          store.dispatch(saveSubscribeTicketErrors(error.response.data.message));
        });
      next(action);
      break;

    case SEND_TICKET_VALIDATION:
      const ticktId = store.getState().tickets.ticketId;

      axios({
        method: 'put',
        url: `${baseUrl}/api/tickets/${ticktId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          validation: action.newValue,
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          const isTicketValidate = (response.data.ticketStatus === 1); // boolean
          const restaurantId = response.data.restaurantId;
          store.dispatch(saveTicketStatus(response.data.ticketStatus, isTicketValidate, response.data.estimatedEntryTime));
          // store.dispatch(fetchNewCustomerTicket(restaurantId));
          // console.log(response.data.restaurantId);
          // console.log('send ticket validation ok');

          // {
          //   axios({
          //   method: 'get',
          //   url: `${baseUrl}/api/partner/${id}/tickets`,
          //   withCredentials: true,
          // })
          //   .then((response) => {
          //     console.log(response.data);
          //     store.dispatch(saveTicketsData(response.data));
          //     if (response.data.length > 0) {
          //       store.dispatch(updateCurrentTicket(response.data[0]));
          //     }
          //   })
          //   .catch((error) => {
          //     console.warn(error);
          //   });
          // }

        })
        .catch((error) => {
          // console.warn(error.response);
          // console.log('send ticket validation');
        });

      next(action);
      break;

    case FETCH_TICKET_DATA_TO_CANCEL:
      const hashedTicketId = window.location.pathname.match((new RegExp('tickets/' + "(.*)" + '/customer')))[1];

      axios({
        method: 'post',
        url: `${baseUrl}/api/decrypt/tickets`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ticket: hashedTicketId,
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(saveTicketInfoToCancel(response.data.restaurant.name, response.data.ticket.id, response.data.customer.lastName, response.data.customer.firstName, response.data.ticket.coversNb, response.data.ticket.estimatedEntryTime, response.data.ticket.estimatedWaitingTime, response.data.ticket.status));
        })
        .catch((error) => {
          // console.warn(error.response);
        });

      next(action);
      break;

    case CANCEL_TICKET:
      const hashedTicktId = store.getState().tickets.ticketInfoToCancel.ticketId;

      axios({
        method: 'put',
        url: `${baseUrl}/api/tickets/${hashedTicktId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          validation: 'cancel',
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(displayCancelConfirmation());
        })
        .catch((error) => {
          // console.warn(error.response);
        });

      next(action);
      break;

    case CANCEL_CURRENT_TICKET:
      axios({
        method: 'put',
        url:`${baseUrl}/api/partner/${id}/tickets/${ticketId}`, 
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          status: 'cancelled',
        },
      }).then((response) => {
        store.dispatch(fetchTicketsData());
        // console.log(response);
      })
        .catch((error) => {
          // console.warn(error);
        });
      next(action);
      break;

    case CONFIRM_CURRENT_TICKET:
      axios({
        method: 'put',
        url: `${baseUrl}/api/partner/${id}/tickets/${ticketId}`, 
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          status: 'seated',
        },
      }).then((response) => {
        // console.log(response);
        store.dispatch(fetchTicketsData());
      })
        .catch((error) => {
          // console.warn(error);
        });
      next(action);
      break;

    case MODAL_TICKET_VALIDATE:
      axios({
        method: 'post',
        url:`${baseUrl}/api/tickets`, 
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          lastName: store.getState().tickets.ticketInscriptionInput.lastName,
          firstName: store.getState().tickets.ticketInscriptionInput.firstName,
          cellPhone: store.getState().tickets.ticketInscriptionInput.phone,
          email: store.getState().tickets.ticketInscriptionInput.email,
          restaurant: store.getState().user.restaurantId,
          ticket: {
            coversNb: Number(store.getState().tickets.ticketInscriptionInput.cutlery),
          },
        },
      })
        .then((response) => {
          let estimatedEntryTime = response.data.estimatedEntryTime;
          estimatedEntryTime = estimatedEntryTime.substring(estimatedEntryTime.indexOf('T') + 1, estimatedEntryTime.indexOf('T') + 6);

          store.dispatch(modalTicketStoreTemp(estimatedEntryTime, response.data.ticketId));
        })
        .catch((error) => {
        });
      next(action);
      break;

    case MODAL_TICKET_ADD:
      axios({
        method: 'put',
        url: `${baseUrl}/api/partner/${id}/tickets/${tempModalTicketId}`, 
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          status: 'confirmed',
        },
      })
        .then((response) => {
          store.dispatch(fetchTicketsData());
          store.dispatch(handleClearModalForm());
        })
        .catch((error) => {
          store.dispatch(handleClearModalForm());
        });
      next(action);
      break;

    case MODAL_TICKET_CANCEL:
      axios({
        method: 'put',
        url:`${baseUrl}/api/partner/${id}/tickets/${tempModalTicketId}`, 
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          status: 'cancelled',
        },
      })
        .then((response) => {
          store.dispatch(fetchTicketsData());
          store.dispatch(handleClearModalForm());
        })
        .catch((error) => {
          // console.log(error.response);
        });
      next(action);
      break;

    default:
      next(action);
  }
};

// export
export default ticketMiddleware;

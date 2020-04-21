// import npm
import axios from 'axios';

// import
import {
  SUBSCRIBE_TO_WAITING_LIST,
  CONFIRM_CURRENT_TICKET,
  CANCEL_CURRENT_TICKET,
  MODAL_TICKET_ADD,
  MODAL_TICKET_VALIDATE,
  GET_RESTAURANT_NAME,
  saveRestaurantName,
  modalTicketStoreTemp,
  MODAL_TICKET_CANCEL,
  // saveSubscribeTicketSubscription,
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
  const tempModalTicketId = store.getState().tickets.ticketInscriptionInput.ticketId;

  // const restaurantHashedId = window.location.pathname.match((new RegExp('restaurant/' + "(.*)" + '/tickets')))[1];

  switch (action.type) {
    case GET_RESTAURANT_NAME:
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/decrypt`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          restaurant: restaurantHashedId,
        },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveRestaurantName(response.data.name));
        })
        .catch((error) => {
          console.warn(error.response);
        });

    case SUBSCRIBE_TO_WAITING_LIST:

      const puree = window.location.pathname.match((new RegExp('restaurant/' + "(.*)" + '/tickets')))[1];

      console.log('purée est égale à ' + puree);
      
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/decrypt`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          restaurant: puree, // hashed restaurant ID
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.warn(error.response);
        });

      // axios({
      //   method: 'post',
      //   url: `http://${baseUrl}/api/tickets`,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: {
      //     lastName: store.getState().tickets.ticketInscriptionInput.lastName,
      //     firstName: store.getState().tickets.ticketInscriptionInput.firstName,
      //     cellPhone: store.getState().tickets.ticketInscriptionInput.phone,
      //     email: store.getState().tickets.ticketInscriptionInput.email,
      //     restaurant: 'UhhidUvsgLvrEOnA_et-DjNxXOOOcGtXyiJrL1M6ZHmGX2O3t6K408Wz4iW0Tq8UFUH9knPqJXma2OaT52891Q', // TODO: récup l'id
      //     ticket: {
      //       coversNb: Number(store.getState().tickets.ticketInscriptionInput.cutlery),
      //     },
      //   },
      //   withCredentials: true,
      // })
      //   .then((response) => {
      //     // console.log(response);
      //     // console.log('save tempo ticket');
      //     // store.dispatch(saveSubscribeTicketSubscription());
      //     window.location.replace(`http://${url}/restaurant/UhhidUvsgLvrEOnA_et-DjNxXOOOcGtXyiJrL1M6ZHmGX2O3t6K408Wz4iW0Tq8UFUH9knPqJXma2OaT52891Q/tickets/validate`); // TODO récup id
      //   })
        // .catch((error) => {
        //   console.warn(error.response);
        //   store.dispatch(saveSubscribeTicketErrors(error.response.data));
        // });

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


          case MODAL_TICKET_VALIDATE:
            axios({
              method: 'post',
              url:`http://${baseUrl}/api/tickets`, 
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
                  }
                })
            .then((response) => {
              let estimatedEntryTime = response.data.estimatedEntryTime;
              estimatedEntryTime = estimatedEntryTime.substring(estimatedEntryTime.indexOf('T') + 1, estimatedEntryTime.indexOf('T') + 6);

              store.dispatch(modalTicketStoreTemp(estimatedEntryTime, response.data.ticketId));
            })
              .catch((error) => {
                console.warn(error.response);
              });
            next(action);
            break;

        case MODAL_TICKET_ADD:
          axios({
            method: 'put',
            url:`http://${baseUrl}/api/partner/${id}/tickets/${tempModalTicketId}`, 
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
                    status: "confirmed",
                  },
              })
          .then((response) => {
            console.log(response);
            store.dispatch(fetchTicketsData());
          })
            .catch((error) => {
              console.warn(error);
            });
          next(action);
          break;

          case MODAL_TICKET_CANCEL:
              axios({
                method: 'put',
                url:`http://${baseUrl}/api/partner/${id}/tickets/${tempModalTicketId}`, 
                headers: {
                  'Content-Type': 'application/json',
                },
                data: {
                        status: "cancelled",
                      },
                  })
              .then((response) => {
                store.dispatch(fetchTicketsData());
                console.log(response);
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

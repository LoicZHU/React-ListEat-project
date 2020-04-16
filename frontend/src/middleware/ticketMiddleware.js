// import npm
import axios from 'axios';

// import
import {
  SUBSCRIBE_TO_WAITING_LIST,
} from 'src/actions/ticket';

// const baseUrl = '54.162.210.163:8080';
const baseUrl = 'localhost:8001';

// middleware
const ticketMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBSCRIBE_TO_WAITING_LIST:
      console.log(store.getState().tickets.ticketInscriptionInput);
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/tickets`,
        // data: {
        //   lastName: ,
        //   firstName: ,
        //   cellPhone: ,
        //   email: ,
        //   restaurant: ,
        //   ticket: {
        //     coversNb: ,
        //   }
        // },
        withCredentials: true,
      })
        .then((response) => {
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

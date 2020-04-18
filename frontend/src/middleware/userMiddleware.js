// import npm
import axios from 'axios';

// import
import {
  LOG_IN,
  logUser,
  CHECK_LOGGED_RESTAURANT,
  LOG_OUT,
  logOut,
  showLoginError,
  changeCheckingRestaurantLogged,
  SIGN_UP,
  saveSignUpErrors,
  EDIT_RESTAURANT,
  FETCH_RESTAURANT_DATA,
  saveRestaurantData,
  INCREASE_MINUTE,
  saveIncreasedAverageEatingTime,
  DECREASE_MINUTE,
  saveDecreasedAverageEatingTime,
  CHANGE_SERVICE_STATUS,
  saveChangedServiceStatus,
  FETCH_TICKETS_DATA,
  saveTicketsData,
} from 'src/actions/user';

import {
  updateCurrentTicket
} from 'src/actions/ticket';

// const baseUrl = '54.162.210.163:8080';
const baseUrl = 'localhost:8001';

// middleware
const userMiddleware = (store) => (next) => (action) => {
  const id = store.getState().user.restaurantId;

  switch (action.type) {
    case LOG_IN:
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/partner/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: store.getState().user.email,
          password: store.getState().user.password,
        },
        withCredentials: true, // handle cookies
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(logUser(response.data.logged, response.data.restaurantId));
        })
        .catch((error) => {
          console.warn(error);
          store.dispatch(showLoginError());
        });
      next(action);
      break;

    case CHECK_LOGGED_RESTAURANT:
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/partner/islogged`,
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(logUser(response.data.logged, response.data.restaurantId));
        })
        .catch((error) => {
          // console.warn(error);
          store.dispatch(changeCheckingRestaurantLogged());
        });
      next(action);
      break;

    case LOG_OUT:
      axios({
        method: 'get',
        url: `http://${baseUrl}/logout`,
        withCredentials: true,
      })
        .then((response) => {
          store.dispatch(logOut());
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;yarn

    case SIGN_UP:
      axios({
        method: 'post',
        url: `http://${baseUrl}/api/partner`,
        data: {
          email: store.getState().user.signupInput.email,
          password: store.getState().user.signupInput.password,
          lastName: store.getState().user.signupInput.lastname,
          firstName: store.getState().user.signupInput.firstname,

          restaurant: {
            siret_code: store.getState().user.signupInput.cis,
            name: store.getState().user.signupInput.restaurantName,
            address: store.getState().user.signupInput.address,
            postcode: Number(store.getState().user.signupInput.postcode),
            city: store.getState().user.signupInput.coversNumber,
            country: store.getState().user.signupInput.country,
            phone: store.getState().user.signupInput.phone,
            average_eating_time: Number(store.getState().user.signupInput.averageEatingTime),
            seat_nb: Number(store.getState().user.signupInput.coversNumber),
          },
        },
      })
        .then((response) => {
          console.log(response);
        })
        // .then((error) => {
        //   console.warn(error);
        //   console.log('test err');
        //   console.log(error);
        // })
        .catch((error) => {
          console.log('test err' + error.response.data);
          console.log(error.response);
          console.log(error.response.data);
          store.dispatch(saveSignUpErrors(error.response.data));
        });
      next(action);
      break;

    // case EDIT_RESTAURANT:
    //   axios({
    //     method: 'put',
    //     url: `http://${baseUrl}/api/partner`,
    //     data: {


    //       : {
    //         restaurantName: store.getState().user.restaurantProfileEditInput.restaurantName,
    //         address: store.getState().user.restaurantProfileEditInput.address,
    //         postcode: Number(store.getState().user.restaurantProfileEditInput.postcode), // int
    //         city: store.getState().user.restaurantProfileEditInput.city,
    //         country: store.getState().user.restaurantProfileEditInput.country,
    //         phone: store.getState().user.restaurantProfileEditInput.phone,
    //         newPass: store.getState().user.restaurantProfileEditInput.newPass,
    //         actualPass: store.getState().user.restaurantProfileEditInput.actualPass,
    //       },
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       console.log(response.data.message);
    //     })
    //     .catch((error) => {
    //       console.warn(error);
    //     });
    //   next(action);
    //   break;

    case FETCH_RESTAURANT_DATA:
      axios({
        method: 'get',
        url: `http://${baseUrl}/api/partner/${id}`,
        // data: {


          //       : {
          //         restaurantName: store.getState().user.restaurantProfileEditInput.restaurantName,
          //         address: store.getState().user.restaurantProfileEditInput.address,
          //         postcode: Number(store.getState().user.restaurantProfileEditInput.postcode), // int
          //         city: store.getState().user.restaurantProfileEditInput.city,
          //         country: store.getState().user.restaurantProfileEditInput.country,
          //         phone: store.getState().user.restaurantProfileEditInput.phone,
          //         newPass: store.getState().user.restaurantProfileEditInput.newPass,
          //         actualPass: store.getState().user.restaurantProfileEditInput.actualPass,
          //       },
          //     },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveRestaurantData(response.data.averageEatingTime, response.data.status));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case INCREASE_MINUTE:
      let increasedAverageEatingTime = store.getState().user.restaurantProfileEditInput.averageEatingTime;
      increasedAverageEatingTime++;

      axios({
        method: 'put',
        url: `http://${baseUrl}/api/partner/${id}`,
        data: {
          restaurant: {
            average_eating_time: increasedAverageEatingTime,
          },
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(saveIncreasedAverageEatingTime(increasedAverageEatingTime));
        })
        .catch((error) => {
          console.warn(error);
        });
        
      next(action);
      break;

    case DECREASE_MINUTE:
      let decreasedAverageEatingTime = store.getState().user.restaurantProfileEditInput.averageEatingTime;
      decreasedAverageEatingTime--;

      axios({
        method: 'put',
        url: `http://${baseUrl}/api/partner/${id}`,
        data: {
          restaurant: {
            average_eating_time: decreasedAverageEatingTime,
          },
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(saveDecreasedAverageEatingTime(decreasedAverageEatingTime));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case CHANGE_SERVICE_STATUS:
      let changedStatus = store.getState().user.restaurantProfileEditInput.status;
      
      // toggle the changedStatus (ex: 1 (activate) turns into off (deactivate))
      if (changedStatus === 1) {
        changedStatus = 'off';
      } else {
        changedStatus = 'on';
      }
      // console.log(changedStatus);

      axios({
        method: 'put',
        url: `http://${baseUrl}/api/partner/${id}/status`,
        data: {
          status: changedStatus,
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);

          // convert the changeStatus (ex: 'on' = 1)
          if (changedStatus === 'on') {
            changedStatus = 1;
          } else {
            changedStatus = 0;
          }
          // console.log(changedStatus);

          store.dispatch(saveChangedServiceStatus(changedStatus));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_TICKETS_DATA:
      axios({
        method: 'get',
        url: `http://${baseUrl}/api/partner/${id}/tickets`,
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data);
          store.dispatch(saveTicketsData(response.data));
          if (response.data.length > 0) {
            store.dispatch(updateCurrentTicket(response.data[0]));
          }
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
export default userMiddleware;

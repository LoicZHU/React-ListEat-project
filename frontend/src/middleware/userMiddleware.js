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
  showSignupConfirmation,
  QRCODE_DOWNLOAD,
  PASSWORD_RESET_CHECK_EMAIL,
  showPasswordResetEmailConfirmation,
  showPasswordResetEmailError,
  storeServerCode,
  storeUserId,
  SUBMIT_NEW_PASSWORD,
  confirmNewPassword,
  displayEditConfirmation,
  displayEditError,
} from 'src/actions/user';

import {
  updateCurrentTicket,
} from 'src/actions/ticket';

const baseUrl = 'http://localhost:8001';
// const baseUrl = 'https://www.listeat.io:8080';

// middleware
const userMiddleware = (store) => (next) => (action) => {
  const id = store.getState().user.restaurantId;

  switch (action.type) {
    case LOG_IN:
      axios({
        method: 'post',
        url: `${baseUrl}/api/partner/login`,
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
        url: `${baseUrl}/api/partner/islogged`,
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
        url: `${baseUrl}/logout`,
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(logUser(response.data.logged));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case SIGN_UP:
      axios({
        method: 'post',
        url: `${baseUrl}/api/partner`,
        headers: {
          'Content-Type': 'application/json',
        },
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
            city: store.getState().user.signupInput.city,
            country: store.getState().user.signupInput.country,
            phone: store.getState().user.signupInput.phone,
            average_eating_time: Number(store.getState().user.signupInput.averageEatingTime),
            seat_nb: Number(store.getState().user.signupInput.coversNumber),
          },
        },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(showSignupConfirmation());
        })
        .catch((error) => {
          store.dispatch(saveSignUpErrors(error.response.data));
          location.hash = "#" + 'signup-form';
          console.log(error.response);
        });
      next(action);
      break;

    case EDIT_RESTAURANT:
      axios({
        method: 'put',
        url: `${baseUrl}/api/partner/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          restaurant: {
            name: store.getState().user.restaurantProfileEditInput.restaurantName,
            address: store.getState().user.restaurantProfileEditInput.address,
            postcode: Number(store.getState().user.restaurantProfileEditInput.postcode), // int
            city: store.getState().user.restaurantProfileEditInput.city,
            country: store.getState().user.restaurantProfileEditInput.country,
            phone: store.getState().user.restaurantProfileEditInput.phone,
          },
          user: {
            password: store.getState().user.restaurantProfileEditInput.newPass,
          },
          currentpassword: store.getState().user.restaurantProfileEditInput.actualPass,
          withCredentials: true,
        },
      })
        .then((response) => {
          console.log(response);
          console.log(response.data.message);
          store.dispatch(displayEditConfirmation());
        })
        .catch((error) => {
          console.warn(error.response);
          console.warn(error.response.data.message);
          store.dispatch(displayEditError(error.response.data.message));
        });
      next(action);
      break;

    case FETCH_RESTAURANT_DATA:
      axios({
        method: 'get',
        url: `${baseUrl}/api/partner/${id}`,
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
          let responseTime = response.data.averageEatingTime;
          let responseTimeHours = Math.floor(responseTime / 60);
          let responseTimeModulo = responseTime % 60;
          let averageEatingTime = 
          `${(responseTimeHours === 0) ? '' : responseTimeHours + "h"}${((responseTimeModulo.toString()).length == 1) ? ('0' + responseTimeModulo) : responseTimeModulo}${(responseTimeHours === 0) ? 'mn' : ""}`;
          store.dispatch(saveRestaurantData(averageEatingTime, response.data.status, response.data.name, response.data.address, response.data.postcode, response.data.city, response.data.country, response.data.phone));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case INCREASE_MINUTE:
      axios({
        method: 'put',
        url: `${baseUrl}/api/partner/${id}/eating-time`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          addedTime: 5,
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          let responseTime = response.data.averageEatingTime;
          let responseTimeHours = Math.floor(responseTime / 60);
          let responseTimeModulo = responseTime % 60;
          let averageEatingTime = 
          `${(responseTimeHours === 0) ? '' : responseTimeHours + "h"}${((responseTimeModulo.toString()).length == 1) ? ('0' + responseTimeModulo) : responseTimeModulo}${(responseTimeHours === 0) ? 'mn' : ""}`;
          store.dispatch(saveIncreasedAverageEatingTime(averageEatingTime));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;

    case DECREASE_MINUTE:
      axios({
        method: 'put',
        url: `${baseUrl}/api/partner/${id}/eating-time`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          addedTime: -5,
        },
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response);
          let responseTime = response.data.averageEatingTime;
          let responseTimeHours = Math.floor(responseTime / 60);
          let responseTimeModulo = responseTime % 60;
          let averageEatingTime = 
          `${(responseTimeHours === 0) ? '' : responseTimeHours + "h"}${((responseTimeModulo.toString()).length == 1) ? ('0' + responseTimeModulo) : responseTimeModulo}${(responseTimeHours === 0) ? 'mn' : ""}`;
          store.dispatch(saveDecreasedAverageEatingTime(averageEatingTime));
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
      }
      else {
        changedStatus = 'on';
      }
      // console.log(changedStatus);

      axios({
        method: 'put',
        url: `${baseUrl}/api/partner/${id}/status`,
        data: {
          status: changedStatus,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);

          // convert the changeStatus (ex: 'on' = 1)
          if (changedStatus === 'on') {
            changedStatus = 1;
          }
          else {
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
        url: `${baseUrl}/api/partner/${id}/tickets`,
        withCredentials: true,
      })
        .then((response) => {
          // console.log(response.data);
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

    case QRCODE_DOWNLOAD:
      axios({
        method: 'post',
        url: `${baseUrl}/api/partner/${id}/qrcode`, 
        withCredentials: true,
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'QrCode.pdf'); // or any other extension
        document.body.appendChild(link);
        link.click();
      })
        .catch((error) => {
          console.warn(error.response);
        });
      next(action);
      break;

    case PASSWORD_RESET_CHECK_EMAIL:
      axios({
        method: 'post',
        url: `${baseUrl}/forgotten-password`, 
        data : {
          username: store.getState().user.passwordReset.email,
        }
      }).then((response) => {
        console.log(response.data.userId);
        store.dispatch(showPasswordResetEmailConfirmation(false));
        store.dispatch(showPasswordResetEmailError(false));
        store.dispatch(showPasswordResetEmailConfirmation(true));
        store.dispatch(storeServerCode(response.data.securityCode));
        store.dispatch(storeUserId(response.data.userId));          
      })
        .catch((error) => {
          console.warn(error);
          store.dispatch(showPasswordResetEmailConfirmation(false));
          store.dispatch(showPasswordResetEmailError(false));
          store.dispatch(showPasswordResetEmailError(true));
        });
      next(action);
      break;



    case SUBMIT_NEW_PASSWORD:
        axios({
          method: 'post',
          url: `${baseUrl}/forgotten-password/confirmation`, 
          data : {
            securityCode: store.getState().user.passwordReset.inputCode,
            userId: store.getState().user.passwordReset.userId,
            newPassword: store.getState().user.passwordReset.newPassword,
            },
        }).then((response) => {
          console.log(response);
          store.dispatch(confirmNewPassword(true));
        })
          .catch((error) => {
            console.warn(error);
            store.dispatch(confirmNewPassword(false));
          });
        next(action);
        break;

    default:
      next(action);

      
  }
};


// export
export default userMiddleware;

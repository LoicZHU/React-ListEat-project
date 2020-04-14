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
  SIGN_UP
} from 'src/actions/user';

// middleware
const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOG_IN:
      axios({
        method: 'post',
        url: 'http://localhost:8001/api/partner/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: store.getState().user.email,
          password: store.getState().user.password,
        },
        withCredentials: true, // handle cookies ;
      })
        .then((response) => {
          // console.log(response);
          store.dispatch(logUser(response.data.logged, response.data.restaurantId)); // TODO modif true
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
        url: 'http://localhost:8001/api/partner/islogged',
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(logUser(response.data.logged, response.data.restaurantId)); // TODO modif true
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
        url: 'http://localhost:8001/logout',
        withCredentials: true,
      })
        .then((response) => {
          store.dispatch(logOut());
          // window.location.replace('/');
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

      case SIGN_UP:
        axios({
          method: 'post',
          url: 'http://localhost:8001/api/partner',
          data: {
            email: store.getState().user.signupInput.email,
            password: store.getState().user.signupInput.password,
            lastName: store.getState().user.signupInput.lastname,
            firstName: store.getState().user.signupInput.firstname,
            
            restaurant:{
            siret_code: store.getState().user.signupInput.cis,
            name: store.getState().user.signupInput.restaurantName,
            address: store.getState().user.signupInput.address,
            postcode: store.getState().user.signupInput.postcode,
            city: store.getState().user.signupInput.coversNumber,
                    
            country: store.getState().user.signupInput.country,
            phone: store.getState().user.signupInput.phone,
            average_eating_time: store.getState().user.signupInput.averageEatingTime,
            seat_nb: store.getState().user.signupInput.coversNumber,

            ////////////////////////////////////////

            // lastname: state.user.signupInput.lastname,
            // firstname: state.user.signupInput.firstname,
            // email: state.user.signupInput.email,
            // password: state.user.signupInput.password,
            // passwordConfirmation: state.user.signupInput.passwordConfirmation,
            // restaurantName: state.user.signupInput.restaurantName,
            // address: state.user.signupInput.address,
            // postcode: state.user.signupInput.postcode,
            // city: state.user.signupInput.city,
            // country: state.user.signupInput.country,
            // cis: state.user.signupInput.cis,
            // averageEatingTime: state.user.signupInput.averageEatingTime,
            // coversNumber: state.user.signupInput.coversNumber,
            }
          },
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
export default userMiddleware;

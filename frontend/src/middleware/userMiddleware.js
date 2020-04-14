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
          console.log(response);
          // window.location.replace('/id/eaz');
          store.dispatch(logUser(true, response.data.restaurantId)); // TODO modif true
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
          store.dispatch(logUser(true, response.data.restaurantId)); // TODO modif true
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

    default:
      next(action);
  }
};

// export
export default userMiddleware;

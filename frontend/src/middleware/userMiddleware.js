// import npm
import axios from 'axios';

// import
import {
  LOG_IN,
  logUser,
  CHECK_LOGGED_RESTAURANT,
  LOG_OUT,
  logOut,
} from 'src/actions/user';

// middleware
const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOG_IN:
      axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
          email: store.getState().user.email,
          password: store.getState().user.password,
        },
        // cookies
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          store.dispatch(logUser(response.data.logged));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case CHECK_LOGGED_RESTAURANT:
      axios({
        method: 'post',
        url: 'http://localhost:3001/isLogged',
        withCredentials: true,
      })
        .then((response) => {
          store.dispatch(logUser(response.data.logged));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case LOG_OUT:
      axios({
        method: 'post',
        url: 'http://localhost:3001/logout',
        withCredentials: true,
      })
        .then((response) => {
          store.dispatch(logOut(response.data.logged));
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

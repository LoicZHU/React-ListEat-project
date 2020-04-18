// import npm
import { combineReducers } from 'redux';

// reducers
import ticketsReducer from './tickets';
import userReducer from './user';

// rootReducer
const rootReducer = combineReducers({
  tickets: ticketsReducer,
  user: userReducer,
});

// export
export default rootReducer;

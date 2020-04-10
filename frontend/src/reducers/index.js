// import npm
import { combineReducers } from 'redux';

// combined reducers
import ticketsReducer from './tickets';
import userReducer from './users';


const rootReducer = combineReducers({
  tickets: ticketsReducer,
  users: userReducer,
});

// export
export default rootReducer;


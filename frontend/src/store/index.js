// import npm
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import
import reducer from 'src/reducers';
import ticketMiddleware from 'src/middleware/ticketMiddleware';
import userMiddleware from 'src/middleware/userMiddleware';

// enhancers
const enhancers = composeWithDevTools(
  applyMiddleware(
    ticketMiddleware,
    userMiddleware,
  ),
);

// store
const store = createStore(
  reducer,
  enhancers,
);

// export
export default store;

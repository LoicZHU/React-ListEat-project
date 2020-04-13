// import npm
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import
import reducer from 'src/reducers';
import userMiddleware from 'src/middleware/userMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
  ),
);

// store
const store = createStore(
  reducer, // reducer
  enhancers, // enhancers
);

// export
export default store;

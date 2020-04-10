// import npm
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// import
import reducer from 'src/reducers';

const store = createStore(
  // reducer
  reducer,
  // enhancer
  devToolsEnhancer(),
);

// export
export default store;

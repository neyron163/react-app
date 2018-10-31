import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const store = createStore(
  rootReducer,
  inititalState,
  applyMiddleware(thunk));
  // compose(applyMiddleware(thunk), devTools));

export default store;
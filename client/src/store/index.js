import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './users';
import partiesReducer from './parties';
import dropsReducer from './drops';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  parties: partiesReducer,
  drops: dropsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
}
else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;

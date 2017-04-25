// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import type { counterStateType } from '../reducers/counter';
import {persistStore, autoRehydrate} from 'redux-persist';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = compose(applyMiddleware(thunk, router), autoRehydrate());

function configureStore(initialState?: counterStateType) {
  const store = createStore(rootReducer, initialState, enhancer);
  // begin periodically persisting the store
  persistStore(store);
  return store;
}

export default { configureStore, history };

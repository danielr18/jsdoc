// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import doc from './doc';

const rootReducer = combineReducers({
  counter,
  router,
  doc,
});

export default rootReducer;

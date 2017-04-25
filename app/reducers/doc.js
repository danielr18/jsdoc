// @flow
import { SET_FILE, SET_FUNCTIONS, SET_LINES } from '../actions/doc';

type actionType = {
  type: string
};

const INITIAL_STATE = {
  file: null,
  functions: null,
  lines: null,
}

export default function doc(state: object = INITIAL_STATE, action: actionType) {
  switch (action.type) {
    case SET_FILE:
      const { file } = action.payload;
      return Object.assign({}, state, { file });
    case SET_FUNCTIONS:
      const { functions } = action.payload;
      return Object.assign({}, state, { functions });
    case SET_LINES:
      const { lines } = action.payload;
      return Object.assign({}, state, { lines });
    default:
      return state;
  }
}

import { createReducer }     from '../utils';
import { RECEIVE_STREAMS, REQUEST_STREAMS } from 'constants/streams';

const initialState = {
  isFetching: false,
  items: [],
  nextUrl: false
};
export default createReducer(initialState, {
  [RECEIVE_STREAMS]: (state, { streams, nextUrl }) => {
    return Object.assign({}, state, {
      isFetching: false,
      items: [...state.items, ...streams],
      nextUrl: nextUrl
    });
  },
  [REQUEST_STREAMS]: (state) => (Object.assign({}, state, {
    isFetching: true,
    nextUrl: null
  }))
});

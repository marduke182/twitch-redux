import { createReducer }     from '../utils';
import { RECEIVE_STREAMS, REQUEST_STREAMS } from 'constants/streams';


const initialStateStream = {
  isFetching: false,
  items: [],
  nextUrl: false
};

const stream = createReducer(initialStateStream, {
  [RECEIVE_STREAMS]: (state, { streams, nextUrl }) => Object.assign({}, state, {
    isFetching: false,
    items: [...state.items, ...streams],
    nextUrl: nextUrl
  }),
  [REQUEST_STREAMS]: (state, action) => Object.assign({}, state, {
    isFetching: true,
    nextUrl: null
  })
});


const initialState = {
  top: {
    isFetching: false,
    items: [],
    nextUrl: false
  }
};
export default createReducer(initialState, {
  [RECEIVE_STREAMS]: (state, action) => (Object.assign({}, state, {
    [ action.game ]: stream(state[action.game], action)
  })),
  [REQUEST_STREAMS]: (state, action) => (Object.assign({}, state, {
    [action.game]: stream(state[action.game], action)
  }))
});

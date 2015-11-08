import { createReducer }     from '../utils';
import { REQUEST_GAMES, RECEIVE_GAMES } from 'constants/games';


const initialState = {
  isFetching: false,
  items: [],
  nextUrl: false
};

export default createReducer(initialState, {
  [RECEIVE_GAMES]: (state, { games, nextUrl }) => Object.assign({}, state, {
    isFetching: false,
    items: [...state.items, ...games],
    nextUrl: nextUrl
  }),
  [REQUEST_GAMES]: (state) => Object.assign({}, state, {
    isFetching: true,
    nextUrl: null
  })
});

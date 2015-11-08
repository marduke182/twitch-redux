import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import entities               from './entities';
import streams                from './streams';
import activeGame                from './activeGame';
import topGames                from './topGames';
import currentStream          from './currentStream';

export default combineReducers({
  activeGame,
  counter,
  entities,
  streams,
  currentStream,
  topGames,
  router: routerStateReducer
});

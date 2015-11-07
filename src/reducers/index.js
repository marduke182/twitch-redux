import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import entities               from './entities';
import streams                from './streams';

export default combineReducers({
  counter,
  entities,
  streams,
  router: routerStateReducer
});

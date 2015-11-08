import { createReducer }     from '../utils';
import { CHANGE_ACTIVE_GAME } from 'constants/games';

const initialState = '';
export default createReducer(initialState, {
  [CHANGE_ACTIVE_GAME] : (state, action) => action.game
});

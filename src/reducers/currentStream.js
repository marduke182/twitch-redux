import { createReducer }     from '../utils';
import { CHANGE_CURRENT_STREAM } from 'constants/streams';

const initialState = {
  streamId: 0,
  status: 'disabled'
};
export default createReducer(initialState, {
  [CHANGE_CURRENT_STREAM]: (state, { streamId }) => (Object.assign({}, state, {
    streamId,
    status: 'playing'
  }))
});

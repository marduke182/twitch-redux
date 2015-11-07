import merge from 'lodash/object/merge';

const initialState = {
  streams: {},
  channels: {},
  users: {},
  games: {}
};

export default function entities (state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}

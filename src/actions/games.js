import 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr';
import { gameSchema } from 'constants/Schema';
import { REQUEST_STREAMS, RECEIVE_STREAMS, CHANGE_CURRENT_STREAM} from 'constants/streams';


function changeCurrentStream (streamId) {
  return {
    type: CHANGE_CURRENT_STREAM,
    streamId
  };
}


function requestedGames () {
  return {
    type: REQUEST_STREAMS
  };
}

function receiveGames (entities, games, nextUrl) {
  return {
    type: RECEIVE_STREAMS,
    entities,
    games,
    nextUrl
  };
}

function requestTopGames () {
  return dispatch => {
    dispatch(requestedGames());
    return fetch('https://api.twitch.tv/kraken/games/top')
      .then(response => response.json())
      .then(({ games, _links }) => {
        const normalized = normalize(games, arrayOf(gameSchema));
        dispatch(receiveGames(normalized.entities, normalized.result, _links.next));
      });
  };
}


export default {
  requestTopGames,
  changeCurrentStream
};

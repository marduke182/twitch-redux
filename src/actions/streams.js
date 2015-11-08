import 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr';
import { streamSchema } from 'constants/Schema';
import { REQUEST_STREAMS, RECEIVE_STREAMS, CHANGE_CURRENT_STREAM} from 'constants/streams';


function changeCurrentStream (streamId) {
  return {
    type: CHANGE_CURRENT_STREAM,
    streamId
  };
}


function requestedStreams (game) {
  return {
    type: REQUEST_STREAMS,
    game
  };
}

function receiveStreams (entities, streams, game, nextUrl) {
  return {
    type: RECEIVE_STREAMS,
    entities,
    streams,
    game,
    nextUrl
  };
}

function requestStreams (url, game) {
  return dispatch => {
    dispatch(requestedStreams(game));
    return fetch(url)
      .then(response => response.json())
      .then(({ streams, _links }) => {
        const normalized = normalize(streams, arrayOf(streamSchema));
        dispatch(receiveStreams(normalized.entities, normalized.result, game, _links.next));
      });
  };
}

function shouldFetchStreams (streams, game) {
  const gameStream = streams[game];
  if (!gameStream || !gameStream.isFetching && (gameStream.nextUrl !== null)) {
    return true;
  }
  return false;
}

function getNextUrl (streams, game ) {
  const gameStream = streams[game];
  if (gameStream.nextUrl) {
    return gameStream.nextUrl;
  } else {
    return 'https://api.twitch.tv/kraken/streams';
  }
}

function fetchStreamsIfNeeded (game) {
  return (dispatch, getState) => {
    const { streams } = getState();
    if (shouldFetchStreams(streams, game)) {
      const nextUrl = getNextUrl(streams, game);
      dispatch(requestStreams(nextUrl, game));
    }
  };
}

export default {
  requestStreams,
  changeCurrentStream,
  fetchStreamsIfNeeded
};

import 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr';
import { streamSchema } from 'constants/Schema';
import { REQUEST_STREAMS, RECEIVE_STREAMS } from 'constants/streams';


function requestedStreams () {
  return {
    type: REQUEST_STREAMS
  };
}

function receiveStreams (entities, streams, nextUrl) {
  return {
    type: RECEIVE_STREAMS,
    entities,
    streams,
    nextUrl
  };
}

function requestStreams() {
  return dispatch => {
    dispatch(requestedStreams());
    return fetch('https://api.twitch.tv/kraken/streams')
      .then(response => response.json())
      .then(({ streams, _links }) => {
        const normalized = normalize(streams, arrayOf(streamSchema));
        dispatch(receiveStreams(normalized.entities, normalized.result, _links.next));
      });
  };
}


export default {
  requestStreams
};

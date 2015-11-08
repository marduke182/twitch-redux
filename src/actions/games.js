import 'isomorphic-fetch';
import { arrayOf, normalize } from 'normalizr';
import { gameSchema } from 'constants/Schema';
import { REQUEST_GAMES, RECEIVE_GAMES, CHANGE_ACTIVE_GAME} from 'constants/games';


function changeActiveGame (streamId) {
  return {
    type: CHANGE_ACTIVE_GAME,
    streamId
  };
}


function requestedGames () {
  return {
    type: REQUEST_GAMES
  };
}

function receiveGames (entities, games, nextUrl) {
  return {
    type: RECEIVE_GAMES,
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
      .then(({ top, _links }) => {
        const games = top.map(game => {
          return Object.assign(game.game, {
            viewers: game.viewers,
            channels: game.channels
          });
        })
        const normalized = normalize(games, arrayOf(gameSchema));
        dispatch(receiveGames(normalized.entities, normalized.result, _links.next));
      });
  };
}


export default {
  requestTopGames,
  changeActiveGame
};

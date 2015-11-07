
import { Schema} from 'normalizr';

const stream = new Schema('streams', {idAttribute : '_id'});
const user = new Schema('users', {idAttribute : '_id'});
const channel = new Schema('channels', {idAttribute : '_id'});
const game = new Schema('games', {idAttribute : '_id'});

stream.define({
  channel: channel
});

export const streamSchema = stream;
export const userSchema = user;
export const channelSchema = channel;
export const gameSchema = game;

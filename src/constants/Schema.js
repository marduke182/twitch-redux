
import { normalize, Schema, arrayOf } from 'normalizr';

let stream = new Schema('streams', {idAttribute : '_id'});
let user = new Schema('users', {idAttribute : '_id'});
let channel= new Schema('channels', {idAttribute : '_id'});
let game = new Schema('games', {idAttribute : '_id'});

stream.define({
  channel: channel
});

export const streamSchema = stream;

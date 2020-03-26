const mongoose = require( 'mongoose' );
const roomSchema = require('../database/schemas/room.schema');

const Room = mongoose.model( 'room', roomSchema, 'tele_rooms' );

module.exports = Room;
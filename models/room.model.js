const mongoose = require( 'mongoose' );
const roomSchema = require('../database/schemas/RoomSchema');

const Room = mongoose.model( 'room', roomSchema, 'tele_rooms' );

module.exports = Room;
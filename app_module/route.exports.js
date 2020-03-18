const _indexRouter = require( '../routes/index' );
const _usersRouter = require( '../routes/users' );
const _roomsRouter = require( '../routes/rooms' );
const _messagesRouter = require( '../routes/messages' );

module.exports = {
    indexRouter : _indexRouter,
    usersRouter : _usersRouter,
    roomsRouter : _roomsRouter,
    messagesRouter : _messagesRouter
};
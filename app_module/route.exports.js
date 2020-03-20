const _indexRouter = require( '../routes/index' );
const _usersRouter = require( '../routes/users' );
const _roomsRouter = require( '../routes/rooms' );
const _messagesRouter = require( '../routes/messages' );
const _uploadsRouter = require( '../routes/uploads' );

module.exports = {
    indexRouter : _indexRouter,
    usersRouter : _usersRouter,
    roomsRouter : _roomsRouter,
    uploadsRouter : _uploadsRouter,
    messagesRouter : _messagesRouter
};
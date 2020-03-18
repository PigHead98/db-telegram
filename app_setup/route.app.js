const app = require( './app' );
const { cors } = require( '../app_module/node_module.exports' );
const {
    indexRouter,
    usersRouter,
    roomsRouter,
    messagesRouter
} = require( '../app_module/route.exports' );

//router
app.use( '/', cors(), indexRouter );
app.use( '/users', cors(), usersRouter );
app.use( '/rooms', cors(), roomsRouter );
app.use( '/messages', cors(), messagesRouter );

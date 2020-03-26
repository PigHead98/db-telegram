const app = require( './app' );
const { cors } = require( '../app_module/node_module.exports' );
const { isAuth } = require( "../middleware/auth.middleware" );
const {
    indexRouter,
    usersRouter,
    roomsRouter,
    uploadsRouter,
    messagesRouter
} = require( '../app_module/route.exports' );

//router
app.use( '/', cors(), indexRouter );
app.use( '/users', cors(), usersRouter );
app.use( '/rooms', cors(), roomsRouter );
app.use( '/uploads', cors(), uploadsRouter );
app.use( '/messages', cors(), messagesRouter );

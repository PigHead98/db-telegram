const app = require( './app_module/app.exports' );
const debug = require( 'debug' )( 'data-express:server' );

const { http } = require( './app_module/node_module.exports' );

const port = normalizePort( process.env.PORT || '3000' );

//create server
const server = http.createServer( app );

server.listen( port, () =>
    console.log( `Listening on port ${ port }` )
);
server.on( 'error', onError );


function normalizePort ( val ) {
    var port = parseInt( val, 10 );

    if ( isNaN( port ) ) {
        // named pipe
        return val;
    }

    if ( port >= 0 ) {
        // port number
        return port;
    }

    return false;
}

function onError ( error ) {
    if ( error.syscall !== 'listen' ) {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch ( error.code ) {
        case 'EACCES':
            console.error( bind + ' requires elevated privileges' );
            process.exit( 1 );
            break;
        case 'EADDRINUSE':
            console.error( bind + ' is already in use' );
            process.exit( 1 );
            break;
        default:
            throw error;
    }
}

function onListening () {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug( 'Listening on ' + bind );
}

module.exports = server;

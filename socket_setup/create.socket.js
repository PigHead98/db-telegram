const server = require( '../server' );
const io = require( 'socket.io' )( server );
const { saveMess } = require( '../controller/socket.controller' );
const { failure } = require( '../helpers/response.helper' );

let interval;

io.on( "connection", async ( socket ) => {
    console.log( "New client connected" );
    if ( interval ) {
        clearInterval( interval );
    }

    socket.on( "join", ( { roomId, userInfo }, callback ) => {
        try {
            socket.emit( "messenger", {
                user : process.env.DEFAULTS_NAME_MESSAGE,
                text : `${ userInfo.name } has joined`
            } );

            socket.broadcast.to( roomId ).emit( "messenger", {
                user : process.env.DEFAULTS_NAME_MESSAGE,
                text : `${ userInfo.name } has joined rooms`
            } );

            socket.join( roomId );

        } catch ( e ) {
            console.log( e.message );
            callback( e.message )
        }

    } );

    socket.on( "sendMessenger", ( { messenger, roomId, userId }, callback ) => {
        try {
            handling( messenger, roomId, userId );

        } catch ( e ) {
            console.log( e.message );
            callback( failure( e.message, 'sendMessenger_error' ) )
        }
    } );

    // interval = setInterval( () => getApiAndEmit( socket ), 100000 );
    socket.on( "disconnect", () => {
        console.log( "Client disconnected" );
    } );
} );

const handling = async ( messenger, roomId, userId ) => {
    io.sockets.in( roomId ).emit( 'messenger', {
        user : userId,
        text : `${ messenger }`
    } );
    return saveMess(messenger, roomId, userId);
};


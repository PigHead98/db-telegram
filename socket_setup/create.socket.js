const server = require( '../server' );
const io = require( 'socket.io' )( server );
const { socketSaveMess } = require( '../controller/socket.controller' );
const { failure } = require( '../helpers/response.helper' );

io.on( "connection", async ( socket ) => {
    console.log( "New client connected" );


    socket.join('id');
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
            socket.emit( 'messenger', {
                user : userId,
                text : `1. ${ messenger }`
            } );
            handlingSendMsg( messenger, roomId, userId );
        } catch ( e ) {
            console.log( e.message );
            callback( failure( e.message, 'sendMessenger_error' ) )
        }
    } );

    socket.on( "reqAddContact", ( { userToId, userFromId }, callback ) => {
        try {

        } catch ( e ) {
            console.log( e.message );
            callback( failure( e.message, 'sendMessenger_error' ) )
        }
    } );

    socket.on( "disconnect", () => {
        console.log( "Client disconnected" );
    } );
} );

const handlingSendMsg = async ( messenger, roomId, userId ) => {
    const result = await socketSaveMess( messenger, roomId, userId );

    console.log( result );
    if( result ) {
        io.sockets.in( roomId ).emit( 'messenger', {
            user : userId,
            text : `${ messenger }`
        } );
        return
    }

    io.sockets.in( roomId ).emit( 'messenger', {
        user : process.env.DEFAULTS_NAME_MESSAGE,
        text : `something goes wrong at save_mess`
    } );
    return
};


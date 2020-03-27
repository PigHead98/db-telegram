const server = require( '../server' );
const io = require( 'socket.io' )( server );
const Room = require( '../models/room.model' );
const Message = require( '../models/message.model' );
const { failure } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );

let interval;
const join = {
    roomId : 'id',
    userInfo : {
        id : 'id',
        name : 'name'
    }
};
const sendMes = {
    roomId : 'id',
    userId : 'id',
    messenger : 'text',
};

const getData = async ( socket, key, data ) => {
    try {
        const saveMess = await Message.create( {
            messageBody : data
        } );
        // io.emit( key, data );
    } catch ( e ) {
        console.log( e.message )
    }
};

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
            saveMess( messenger, roomId, userId )

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

const saveMess = async ( messenger, roomId, userId ) => {

    io.sockets.in( roomId ).emit( 'messenger', {
        user : userId,
        text : `${ messenger }`
    } );
    return await Message.create( {
        idRoom : roomId,
        idUser : userId,
        messageBody : messenger
    } );
};


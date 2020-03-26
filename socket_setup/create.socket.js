const server = require( '../server' );
const io = require( 'socket.io' )( server );
const Room = require( '../models/room.model' );
const Message = require( '../models/message.model' );
const { axios } = require( '../app_module/node_module.exports' );

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

const key = "5e76242b8163472ec88fc4a0";
const key2 = async () => {
    return await Room.find( {
        "state.available" : process.env.STATUS_ACTIVE
    } );
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

    socket.on( "join", ( { roomId, userInfo, }, callback ) => {
        try {
            socket.emit( "messenger", {
                user : "admin",
                text : `${ userInfo.name } has joined`
            } );

            socket.broadcast.to( roomId ).emit( "messenger", {
                user : "admin",
                text : `${ userInfo.name } has joined rooms`
            } );

            socket.join( roomId );
        } catch ( e ) {
            callback( e.message );
        }

    } );

    socket.on( "sendMessenger", ( { messenger, roomId, userId }, callback ) => {
        io.to( roomId ).emit( 'messenger', {
            user : userId,
            text : `${ messenger }`
        } );

        callback();
    } );

    // let test = await key2();
    // test.map( async item => {
    //     let key = await item._id;
    //     socket.on( key, ( data ) => {
    //         getData( socket, key, data );
    //         io.emit( key, data );
    //     } );
    // } );

    // interval = setInterval( () => getApiAndEmit( socket ), 100000 );
    socket.on( "disconnect", () => {
        console.log( "Client disconnected" );
    } );
} );

const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            "http://localhost:8888/messages"
        ); // Getting the data from DarkSky
        socket.emit( "FromAPI", res.data.result ); // Emitting a new message. It will be consumed by the client
    } catch ( error ) {
        console.error( `Error: ${ error.code }` );
    }
};

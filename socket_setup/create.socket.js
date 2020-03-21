const server = require( '../server' );
const io = require( 'socket.io' )( server );
const { axios } = require( '../app_module/node_module.exports' );

let interval;
let key = "5e76242b8163472ec88fc4a0";

const getData = async ( socket, data ) => {
    try {
        const res = await axios.get(
            "http://localhost:8888/rooms"
        );

        const saveMess = await axios.post(
            "http://localhost:8888/messages/create", { messageBody : data }
        );
        console.log( saveMess.data );
        let listIdRooms = res.data.message;

        listIdRooms.map( item => {
            io.emit( item._id, data );
        } );

    } catch ( e ) {
        console.log( e.message )
    }
};

io.on( "connection", socket => {
    console.log( "New client connected" );
    if ( interval ) {
        clearInterval( interval );
    }


    socket.on( key, ( data ) => {
        getData( socket, data );
        // io.emit( key, data );
    } );


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

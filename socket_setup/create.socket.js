const server = require( '../server' );
const io = require( 'socket.io' )( server );
const { axios } = require( '../app_module/node_module.exports' );

let interval;

io.on( "connection", socket => {
    console.log( "New client connected" );
    if ( interval ) {
        clearInterval( interval );
    }
    interval = setInterval( () => getApiAndEmit( socket ), 100000 );
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

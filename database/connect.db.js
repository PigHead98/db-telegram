const mongoose = require( 'mongoose' );

mongoose.connect( process.env.MONGO_URI || 'mongodb://localhost/db-telegram', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex : true
} );

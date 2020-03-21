const mongoose = require( 'mongoose' );

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/db-telegram', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex : true
} );

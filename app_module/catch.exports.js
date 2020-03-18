const { createError } = require( './node_module.exports' );

module.exports = {
    // catch 404 and forward to error handler
    catch_404 : ( req, res, next ) => {
        next( createError( 404 ) );
    },

    // error handler
    catch_error : ( err, req, res, next ) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

        // render the error page
        res.status( err.status || 500 );
        res.render( 'error' );
    }
};
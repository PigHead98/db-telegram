module.exports = {
    success : ( data ) => {
        return {
            status : 'success',
            message : data
        }
    },
    failure : ( error, message = 'request_fails' ) => {
        return {
            status : 'failure',
            message : message,
            description : error
        }
    },
};
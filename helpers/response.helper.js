module.exports = {
    success : ( data ) => {
        return {
            status : 'success',
            result : data
        }
    },
    failure : ( error ) => {
        return {
            status : 'failure',
            error : error
        }
    },
};
module.exports = {
    getDataBy : ( data, ...vlue ) => {
        return vlue.reduce( ( result, item ) => {
            result[item] = data[item];
            return result;
        }, {} );
    }
};
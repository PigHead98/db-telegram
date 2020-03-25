module.exports = {

    // this helper to help you get value like
    // {
    //      vlue1:vlue1,
    //      vlue2:vlue2,
    //      vlueN:vlueN,
    // }
    // and optimize like {vlue1,vlue2,vlueN}
    getDataBy : ( data, ...vlue ) => {
        return vlue.reduce( ( result, item ) => {
            result[item] = data[item];
            return result;
        }, {} );
    }
};
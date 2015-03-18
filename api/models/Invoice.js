/**
* Invoice.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  },

    saveInvoice : function(data, callback){
        Invoice.create(data).exec(function (err, token) {
            if (!err) {
                return callback(null, token);

            } else {
                return callback(err, {"status": "failed"});
            }
        });
    }
};


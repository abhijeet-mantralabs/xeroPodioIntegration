var js2xmlparser = require("js2xmlparser");
module.exports = {

    podioCreateJobCategory: function (xeroAccess,xeroAccessSecret, invoicePostPayLoad, callback) {

        var oauth = sails.config.globals.xeroAppMainDataObj.xeroOauth;
        var post_body = js2xmlparser("Invoice", invoicePostPayLoad);
        console.log(post_body);
        oauth.post("https://api.xero.com/api.xro/2.0/Invoices", xeroAccess, xeroAccessSecret, post_body, 'text/xml;charset=UTF-8', function (error, data, response) {
            if (error) {
                console.log(error)
            } else {
                console.log(data)
            }
        });
    }
}
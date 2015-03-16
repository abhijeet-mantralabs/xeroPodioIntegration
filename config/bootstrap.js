/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var OAuth = require('oauth');
module.exports.bootstrap = function(cb) {

    getXeroAppMainDataObj: (function () {
        var serverType = 'local';
        switch (serverType) {
            case 'local' :
                sails.config.globals.xeroAppMainDataObj = sails.config.globals.xeroAppMainDataObjLocal;
                break;

            case 'remote' :
                sails.config.globals.xeroAppMainDataObj = sails.config.globals.xeroAppMainDataObjRemote;
                break;

            default :
                sails.config.globals.xeroAppMainDataObj = sails.config.globals.xeroAppMainDataObjRemote;
        }

        sails.config.globals.xeroAppMainDataObj.xeroOauth = new OAuth.OAuth(sails.config.globals.xerooauthRequestUrls.Request_Token_URL,
            sails.config.globals.xerooauthRequestUrls.Access_Token_URL,
            sails.config.globals.xeroAppMainDataObj.client_id_xero,
            sails.config.globals.xeroAppMainDataObj.client_secret_xero, '1.0A', null, 'HMAC-SHA1');

    })()

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

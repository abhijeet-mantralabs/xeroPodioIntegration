/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.globals.html
 */

module.exports.globals = {

    /****************************************************************************
     *                                                                           *
     * Expose the lodash installed in Sails core as a global variable. If this   *
     * is disabled, like any other node module you can always run npm install    *
     * lodash --save, then var _ = require('lodash') at the top of any file.     *
     *                                                                           *
     ****************************************************************************/

    // _: true,

    /****************************************************************************
     *                                                                           *
     * Expose the async installed in Sails core as a global variable. If this is *
     * disabled, like any other node module you can always run npm install async *
     * --save, then var async = require('async') at the top of any file.         *
     *                                                                           *
     ****************************************************************************/

    // async: true,

    /****************************************************************************
     *                                                                           *
     * Expose the sails instance representing your app. If this is disabled, you *
     * can still get access via req._sails.                                      *
     *                                                                           *
     ****************************************************************************/

    // sails: true,

    /****************************************************************************
     *                                                                           *
     * Expose each of your app's services as global variables (using their       *
     * "globalId"). E.g. a service defined in api/models/NaturalLanguage.js      *
     * would have a globalId of NaturalLanguage by default. If this is disabled, *
     * you can still access your services via sails.services.*                   *
     *                                                                           *
     ****************************************************************************/

    // services: true,

    /****************************************************************************
     *                                                                           *
     * Expose each of your app's models as global variables (using their         *
     * "globalId"). E.g. a model defined in api/models/User.js would have a      *
     * globalId of User by default. If this is disabled, you can still access    *
     * your models via sails.models.*.                                           *
     *                                                                           *
     ****************************************************************************/

    // models: true

    xeroAppMainDataObj: {},

    xeroAppMainDataObjLocal: {
        baseUrl: 'http://25b56dfd.ngrok.com/',
        userData: {},
        userInfo: {},
        tokenDataXero: {},
        tokenDataPodio: {},
        xeroOauth : {},
        projIds: [],
        webredirecrUrlXero: 'backxero',
        webredirecrUrlPodio: 'podioauth',
        invoiceWebHookUrl:  "invoiceCreate",
        client_id_xero: "XNR1HUZFKG9WAAMSCCXGNZALAI62NF",
        client_id_podio: "elanceapi",
        client_secret_xero: "CP0PKUFHCLJGCDYGGNTRDRXBB4CZYN",
        client_secret_podio: "WRExsjEHUe1ZUwQvSkjoKTpIk0L1gZKxlFLDcsXctVpNLMyqzH63MrZCya0sLYtH"

    },

    xeroAppMainDataObjRemote: {
        baseUrl: 'http://54.88.90.102/',
        userData: {},
        userInfo: {},
        tokenDataXero: {},
        tokenDataPodio: {},
        xeroOauth : {},
        projIds: [],
        webredirecrUrlXero:  'backxero',
        webredirecrUrlPodio:  'podioauth',
        invoiceWebHookUrl:  "invoiceCreate",
        client_id_xero: "PJCLWXUV0KLJBIALNMISPMDRJZRTCU",
        client_id_podio: "elanceapimain",
        client_secret_xero: "CWMNNYJCDNYDY587OYIQHIQOCLB0Y0",
        client_secret_podio: "0V3Eg4vcLCWWebvDIuPRmE8bu18TadatfLCJLp1WCkeebPxGh8knjKXieEYYF71U"
    },

    xerooauthRequestUrls : {
        Request_Token_URL : "https://api.xero.com/oauth/RequestToken",
        Authorise_URL : "https://api.xero.com/oauth/RequestToken",
        Access_Token_URL : "https://api.xero.com/oauth/AccessToken",
        API_Endpoint_URL : "https://api.xero.com/api.xro/2.0/"
    }

};

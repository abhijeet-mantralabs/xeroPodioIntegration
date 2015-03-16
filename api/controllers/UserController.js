/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var rp = require('request-promise');
var OAuth = require('oauth');
var util = require('util');
var js2xmlparser = require("js2xmlparser");
var oauth_token_old, oauth_token_secret_old;

module.exports = {

    podiologin: function (req, res) {
        res.redirect('https://podio.com/oauth/authorize?client_id=' + sails.config.globals.xeroAppMainDataObj.client_id_podio + '&redirect_uri=' + sails.config.globals.xeroAppMainDataObj.baseUrl+sails.config.globals.xeroAppMainDataObj.webredirecrUrlPodio);
    },

    podioauth: function (req, res) {
        console.log(req.param('code'));

        rp({
            uri: "https://podio.com/oauth/token?grant_type=authorization_code&client_id=" + sails.config.globals.xeroAppMainDataObj.client_id_podio + "&redirect_uri=" + sails.config.globals.xeroAppMainDataObj.baseUrl+sails.config.globals.xeroAppMainDataObj.webredirecrUrlPodio + "&client_secret=" + sails.config.globals.xeroAppMainDataObj.client_secret_podio + "&code=" + req.param('code'),
            method: "POST"
        }).then(function (body) {

            var Tokendata = JSON.parse(body);
            Tokendata.tokenName = "podio";
            console.log(Tokendata);
            sails.config.globals.xeroAppMainDataObj.tokenDataPodio = Tokendata;
            var podioAuth = Tokendata;

            rp('https://api.podio.com/user/profile?oauth_token=' + Tokendata.access_token)
                .then(function (body) {
                    var _data = JSON.parse(body);
                    var userInfo = _data;

                    sails.config.globals.xeroAppMainDataObj.userInfo = userInfo;

                    var reqUserData = {};
                    reqUserData.userInfo = userInfo;
                    reqUserData.xeroAuth = sails.config.globals.xeroAppMainDataObj.tokenDataXero;
                    reqUserData.podioAuth = podioAuth;

                    return User.saveUser(reqUserData, function (err, users) {
                        if (err) {
                            res.forbidden();
                        } else {
                            res.json(users);
                            sails.config.globals.xeroAppMainDataObj.userData = users;
                            res.redirect('/podioWorkSpace');
                        }
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });


        })
            .catch(function (error) {
                console.log(error);
            });


    },

    podioWorkSpace: function (req, res) {

        PodioAPI.podioOrgSpaces(req.body, function (err, orgs) {
            if (err) {
                res.forbidden();
            } else {
                res.view('spaces', {orgs: orgs});
            }
        });
    },

    xeroLogin: function (req, res) {
        var oauth = sails.config.globals.xeroAppMainDataObj.xeroOauth;

        oauth.getOAuthRequestToken({'oauth_callback': sails.config.globals.xeroAppMainDataObj.baseUrl+sails.config.globals.xeroAppMainDataObj.webredirecrUrlXero}, function (error, oauth_token, oauth_token_secret, results) {
            if (error)
                sails.log.error(error);
            else {
                oauth_token_old = oauth_token;
                oauth_token_secret_old = oauth_token_secret;
                res.redirect('https://api.xero.com/oauth/Authorize?oauth_token=' + oauth_token);
            }
        })
    },

    backxero: function (req, res) {
        //console.log(req.params.all());

        var oauth_token_secret = oauth_token_secret_old;
        var oauth_token = req.param('oauth_token');
        var oauth_verifier = req.param('oauth_verifier');
        var org = req.param('org');

        var oauth = sails.config.globals.xeroAppMainDataObj.xeroOauth;

        console.log("Requesting access token");

        oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier, function (error, oauth_access_token, oauth_access_token_secret, results2) {
            console.log(results2);
            //saving xero auth info. in local DB
            var xeroAuth = {};
            xeroAuth.tokenName = "xero";
            xeroAuth.oauth_access_token = oauth_access_token;
            xeroAuth.oauth_access_token_secret = oauth_access_token_secret;
            xeroAuth.oauth_expires_in = results2.oauth_expires_in;
            xeroAuth.xero_org_muid = results2.xero_org_muid;

            sails.config.globals.xeroAppMainDataObj.tokenDataXero = xeroAuth;
            res.redirect('/podiologin');

            /*var data = {
             'Type': 'ACCREC',
             'Contact': {
             'Name': 'ABC Limited'
             },
             'Date': '2009-08-30',
             'DueDate': '2009-09-20',
             'LineAmountTypes': 'Exclusive',
             'LineItems': {
             'LineItem': {
             'Description': 'Consulting services as agreed (20% off standard rate)',
             'Quantity': '10',
             'UnitAmount': '100.00',
             'AccountCode': '200',
             'DiscountRate': '20'
             }
             }
             };
             var post_body = js2xmlparser("Invoice", data);
             console.log(post_body);
             oauth.post("https://api.xero.com/api.xro/2.0/Invoices", oauth_access_token, oauth_access_token_secret, post_body, 'text/xml;charset=UTF-8', function (error, data, response) {
             if (error) {
             console.log(error)
             } else {
             console.log(data)
             }
             });*/


        });
    }
};


/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing applications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    getApplication: function (req, res) {

        return Application.applicationList(req.body, function (err, proj) {
            if (err) {
                res.forbidden();
            } else {
                res.send(proj)

            }
        });
    },

    getApplicationByUser: function (req, res) {

        return Application.applicationListByuser(req.body, function (err, proj) {
            if (err) {
                res.forbidden();
            } else {
                res.send(proj)

            }
        });
    },

    saveApplication: function (req, res) {
        return Application.applicationCreate(req, function (err, proj) {
            if (err) {
                res.forbidden();
            } else {
                res.send(proj)

            }
        });
    },

    createApps: function (req, res) {
        var spaceID = req.param('spaceID');
        res.view('loading');

        var setReferenceId = function(mainObj, referenceID){
            _.each(mainObj.fields, function(field){
                if(field.config.label == "XERO Line Items") field.config.settings.referenceable_types = [referenceID];
            })
        };
        //creating line-item app on podio
        PodioAPI.podioAppCreate(spaceID, sails.config.globals.podioAppPayLoad.lineItems, function (err, lineItemapp) {
            if (!err) {
                console.log('LineItem App is created');
                //sails.config.globals.podioAppPayLoad.lineItemAppId = lineItemapp.app_id;
                setReferenceId(sails.config.globals.podioAppPayLoad.invoiceApp, lineItemapp.app_id);
                PodioAPI.podioAppCreate(spaceID, sails.config.globals.podioAppPayLoad.invoiceApp, function (err, app) {
                    if (!err) {
                        console.log('Invoice App is created');
                        //creating invoice app - webhook on podio
                        var app_id = app.app_id , type = "item.create", urlPath = "invoiceCreated";
                        PodioAPI.podioWebHookCreate(app_id, type, urlPath, function (err, app) {
                            if (!err) {
                                console.log('Invoice webhook is created');
                            } else {
                                console.log(err);
                            }
                        });
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });


    }
};


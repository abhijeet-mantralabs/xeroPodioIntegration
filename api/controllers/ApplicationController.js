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

    createApps : function(req, res){
        var spaceID = req.param('spaceID');
        res.view('loading');

        PodioAPI.podioAppCreate(spaceID, sails.config.globals.podioAppPayLoad.invoiceApp, function(err, app){
            if(!err){
                console.log('App is created');
                //creating invoice app - webhook on podio
                var app_id = app.app_id , type = "item.create", urlPath = "invoiceCreated";
                PodioAPI.podioWebHookCreate(app_id, type,urlPath, function(err, app){
                    if(!err){
                        console.log('Invoice webhook is created');
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log(err);
            }
        });

    }
};


var pollingtoevent = require("polling-to-event");
var request = require("request");
var rp = require('request-promise');
var async = require('asyncjs');

module.exports = {

    podioCreateJobCategory: function (category) {

        rp({
            uri: "https://api.podio.com/item/app/" + sails.config.globals.podioAppIds.category + "?oauth_token=" + sails.config.globals.xeroAppMainDataObj.tokenDataPodio.access_token,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: {
                "fields": {
                    "category-of-work": category.catName
                },
                "file_ids": [],
                "tags": []
            }

        })
            .then(function (body) {
                console.log('Saving category success -podio');

                category.user_id = sails.config.globals.xeroAppMainDataObj.userInfo.user_id;

                Category.savecategory(category, function (err, proj) {
                    if (err) {
                        console.log('Saving category Failed');
                    } else {
                        console.log('Saving category success -local');
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },



    podioOrgSpaces: function (req, callback) {

        rp('https://api.podio.com/org?oauth_token=' + sails.config.globals.xeroAppMainDataObj.tokenDataPodio.access_token)
            .then(function (body) {
                var _data = JSON.parse(body);
                return callback(null, _data);
            })
            .catch(function () {
                return callback(error, {"status": "failed"});
            });
    },

    podioAppCreate: function (spaceID,payload, callback) {
        var spaceID = parseInt(spaceID);
        var reqPayload = payload;
        reqPayload.space_id = spaceID;

        //category app
        rp({
            uri: "https://api.podio.com/app?oauth_token=" + sails.config.globals.xeroAppMainDataObj.tokenDataPodio.access_token,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: reqPayload

        })
            .then(function (body) {
                //var _data = JSON.parse(body);
                //console.log(body);
                appID = body.app_id;

                console.log('App created');

                //saving category App in local DB
                body.user_id = sails.config.globals.xeroAppMainDataObj.userInfo.user_id;
                Application.saveApplication(body, function (err, data) {
                    if (!err) {
                        console.log('saving App in local DB');
                        return callback(null, data);
                    }else{
                        return callback(error, {"status": "failed"});
                    }
                });


            })
            .catch(console.error);
    },

    podioWebHookCreate: function (app_id, type,urlPath, callback) {
        rp({
            uri: "https://api.podio.com/hook/app/"+app_id+"?oauth_token=" + sails.config.globals.xeroAppMainDataObj.tokenDataPodio.access_token,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: {
                "url": sails.config.globals.xeroAppMainDataObj.baseUrl+urlPath+'/'+sails.config.globals.xeroAppMainDataObj.userInfo.user_id,
                "type": "item.create"
            }

        })
            .then(function (body) {
                //var _data = JSON.parse(body);
                return callback(null, body);
            })
            .catch(function (error) {
                return callback(error, {"status": "failed"});
            });
    },

    podioSaveProposalItem: function (userId, podioAccess, currentProject, jobData, elanceProposal, callback) {
        Application.find({user_id: userId, "config.item_name": "Proposal"}).exec(function (err, appDetail) {
            if (err) {
                console.log('Failed');
            } else {
                var appID = appDetail[0].app_id;
                rp({
                    uri: "https://api.podio.com/item/app/" + appID + "?oauth_token=" + podioAccess,
                    method: "POST",
                    json: true,
                    headers: {
                        "content-type": "application/json"
                    },
                    body: {
                        "fields": {
                            "title": jobData.name,
                            "proposal-va-name": elanceProposal.providerName,
                            "status": [],
                            "proposal": "TESTING",
                            "proposal-amount": "220",
                            "text": "TESTING",
                            "delivery-timeframe": "TESTING",
                            "rate": elanceProposal.hourlyRate,
                            "jobs-started-in-the-last-12-months": "TESTING",
                            "text-2": "TESTING",
                            "earnings-from-the-last-12-months": "TESTING",
                            "average-job-rating": "TESTING",
                            "job": [
                                {
                                    "value": currentProject.item_id
                                }
                            ],
                            "va-team": []
                        },
                        "file_ids": [],
                        "tags": []
                    }

                }).then(function (body) {
                    callback(null, body);
                })
                    .catch(function (error) {
                        var _error = JSON.parse(error.response.body);
                        return callback(_error, {"status": "Failed"});
                    })
            }
        });


    },

    podioGetItemById: function (podioAccess, itemId, callback) {

        rp({
            uri: "https://api.podio.com/item/" + itemId + "?oauth_token=" + podioAccess,
            method: "GET",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        }).then(function (body) {
            var _data = JSON.parse(body);
            return callback(null, _data);
        })
            .catch(function (error) {
                var _error = JSON.parse(error.response.body);
                return callback(_error, {"status": "Failed"});
            });

    },

    podioRefreshToken: function (userID, callback) {

        User.getUserById(userID, function (err, user) {
            if (!err) {
                var userData = user;
                var podioAccess = user[0].podioAuth.access_token;
                var podioRefreshToken = user[0].podioAuth.refresh_token;


                rp({
                    uri: "https://podio.com/oauth/token?grant_type=refresh_token&client_id=" + sails.config.globals.xeroAppMainDataObj.client_id_podio + "&client_secret=" + sails.config.globals.xeroAppMainDataObj.client_secret_podio + "&refresh_token=" + podioRefreshToken,
                    method: "POST"
                })
                    .then(function (body) {
                        var _data = JSON.parse(body);
                        _data.tokenName = "podio";
                        //return callback(null, _data);
                        userData[0].podioAuth = _data;

                        var _userData = {};
                        _userData.userInfo = userData[0].userInfo;
                        _userData.elanceAuth = userData[0].elanceAuth;
                        _userData.podioAuth = userData[0].podioAuth;


                        User.saveUser(_userData, function (err, users) {
                            if (!err) {
                                sails.config.globals.xeroAppMainDataObj.userData = users;
                                return callback(null, users);
                            } else {
                                console.log('podioAPI -> podioRefreshToken -> saveChangedUserInfo - Failed');
                                return callback(err, {"status": "Failed"});
                            }
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } else {
                console.log('podioAPI - > podioRefreshToken -> failed');
            }
        });

    },


    getPodioItemComments: function (podioAccess, itemId, callback) {

        rp('https://api.podio.com/comment/item/' + itemId + '?oauth_token=' + podioAccess)
            .then(function (body) {
                var _data = JSON.parse(body);
                return callback(null, _data);
            })
            .catch(function (error) {
                return callback(error, {"status": "failed"});
            });
    },

    postPodioItemComments: function (podioAccess, message, itemId, callback) {

        rp({
            uri: 'https://api.podio.com/comment/item/' + itemId + '?oauth_token=' + podioAccess,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: {
                "value": message
            }
        })
            .then(function (body) {
                var _data = body;
                return callback(null, _data);
            })
            .catch(function (error) {
                return callback(error, {"status": "failed"});
            });
    }
}
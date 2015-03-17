/**
 * InvoiceController
 *
 * @description :: Server-side logic for managing invoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var rp = require('request-promise');
module.exports = {

    postXeroInvoice : function(req, res){
        //{ hook_id: '878564', code: 'e265850a', type: 'hook.verify' }

        //        { item_id: '244646406',
        //            item_revision_id: '0',
        //            type: 'item.create',
        //            hook_id: '878511' }


        var userID = parseInt(req.param('userID'));
        var type = req.param('type');

        //var podioAccess = sails.config.globals.elancAppMainDataObj.getAccessToken(userID, "podio");
        //var elanceAccess = sails.config.globals.elancAppMainDataObj.getAccessToken(userID, "elance");



//                var postJobData = function (data) {
//                    var dataFields = data.fields;
//
//                    var jobPostRequestData = {
//                        "title": "Testing Job Post",
//                        "description": "The details of the work being requested. If the text submitted is either shorter than 100 characters or longer than 4000 characters, the job posting request will return an error.",
//                        "type": "Hourly",
//                        "hourlyType": "Part Time",
//                        "hoursPerWeek": "4",
//                        "catId": "10224",
//                        "minBudget": "30",
//                        "maxBudget": "40",
//                        "skillNames": [],
//                        "isInviteOnly": false,
//                        "automation": true
//                    };
//
//                    for (var i = 0; i < dataFields.length; i++) {
//                        switch (dataFields[i].label) {
//
//                            case "Name of Job" :
//                                jobPostRequestData.title = dataFields[i].values[0].value;   //"title": "sample_value"
//                                break;
//
//                            case "Automations" :
//                                jobPostRequestData.automation = dataFields[i].values[0].value.text == 'Post Job to Elance' ? true : false;     //"automations": integer_value_of_option
//                                break;
//
//                            case "Describe It" :
//                                jobPostRequestData.description = dataFields[i].values[0].value.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ''); //"text": "sample_value"
//                                break;
//
//                            case 86016409 : //"category-of-work-2": item_id_of_reference
//                                break;
//
//                            case "Subcategory of Work" :
//                                jobPostRequestData.catId = getJobCategoryID(dataFields[i].values[0].value.title);  //"subcategory-of-work-2": item_id_of_reference
//                                break;
//
//                            case 86016432 : //"relationship": item_id_of_reference - skills
//                                break;
//
//                            case "Work Arrangement" :
//                                jobPostRequestData.type = dataFields[i].values[0].value.text;  //"work-arrangement": integer_value_of_option
//                                if (dataFields[i].values[0].value.text == 'FIXED') {
//                                    delete jobPostRequestData.hourlyType;
//                                    delete jobPostRequestData.hoursPerWeek;
//
//                                }
//                                break;
//
//                            case "Job Posting Visibility" :
//                                jobPostRequestData.isInviteOnly = dataFields[i].values[0].value.text == 'Private' ? true : false//"job-posting-visibility": integer_value_of_option
//                                break;
//
//                            case "Minimum Budget" :
//                                jobPostRequestData.minBudget = dataFields[i].values[0].value//"job-posting-visibility": integer_value_of_option
//                                break;
//
//                            case "Maximum Budget" :
//                                jobPostRequestData.maxBudget = dataFields[i].values[0].value//"job-posting-visibility": integer_value_of_option
//                                break;
//                        }
//                    }
//
//                    return jobPostRequestData;
//                };

                var verifyHook = function () {
                    console.log('verifying hook');
                    console.log(req.params.all());

                    rp({
                        uri: "https://api.podio.com/hook/" + req.param('hook_id') + "/verify/validate",
                        method: "POST",
                        json: true,
                        headers: {
                            "content-type": "application/json"
                        },
                        body: { "code": req.param('code') }

                    }).then(function (body) {
                        console.log(body);
                    })
                        .catch(function(error){
                            console.log(error);
                        });
                };

                var useVerifiedHook = function () {
                    console.log('using verified hook');
                    console.log(req.params.all());

                    var itemID = parseInt(req.param('item_id'));

                    User.getUserById(userID, function (err, user) {
                        if (!err) {

                            var xeroAccess = user[0].xeroAuth.oauth_access_token;
                            var xeroAccessSecret = user[0].xeroAuth.oauth_access_token_secret;
                            var podioAccess = user[0].podioAuth.access_token;

                            PodioAPI.podioGetItemById(podioAccess, itemID, function (err, podioJobItem) {
                                if (!err) {
                                    var podioJobItemData = podioJobItem;
                                    //var invoicePostPayLoad = postJobData(podioJobItemData);
                                    var invoicePostPayLoad = {
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


                                    XeroAPI.podioCreateJobCategory(xeroAccess,xeroAccessSecret, invoicePostPayLoad, function (err, xeroPostedInvoice) {

                                        if (!err) {
                                            var xeroPostedInvoice = xeroPostedInvoice;



//                                            Invoice.saveInvoice(elancePostedJobData.data, function (err, proj) {
//                                                if (err) {
//                                                    console.log('storing Elance posted job in DB failed');
//                                                } else {
//                                                    console.log('storing Elance posted job in DB success');
//                                                    console.log(proj);
//
//                                                    setTimeout(function () {
//                                                        sails.controllers.proposals.getElanceProposals(userID);
//                                                    }, 10000);
//
//                                                }
//                                            });

                                        } else {
                                            console.log('Elance Job Post - failed'+err);

                                            /*if(err.errors[0].code == "invalid_token_expired"){
                                                elanceAPI.elanceRefreshAccess(userID,function(err, refreshedToken){
                                                    if(!err){
                                                        useVerifiedHook();
                                                    }else{
                                                        console.log(err);
                                                    }
                                                });
                                            }*/

                                        }
                                    });


                                } else {
                                    console.log('Getting podio Job item - Failed');

                                    if(err.error_description == "expired_token"){
                                        podioAPI.podioRefreshToken(userID,function(err, refreshedToken){
                                            if(!err){
                                                useVerifiedHook();
                                            }else{
                                                console.log(err);
                                            }
                                        });
                                    }
                                }
                            });


                        } else {
                            console.log('projectController -> useVerifiedHook -> Failed ');
                        }
                    });


                }


                switch (type) {
                    case 'hook.verify' :
                        verifyHook();
                        break;

                    case 'item.create' :
                        useVerifiedHook();
                        break;

                    default :
                        return;
                }

            }

	
};


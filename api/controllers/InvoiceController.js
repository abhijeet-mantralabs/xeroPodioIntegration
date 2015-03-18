/**
 * InvoiceController
 *
 * @description :: Server-side logic for managing invoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var rp = require('request-promise');
var parser = require('xml2json');
module.exports = {

    postXeroInvoice: function (req, res) {
        //{ hook_id: '878564', code: 'e265850a', type: 'hook.verify' }

        //        { item_id: '244646406',
        //            item_revision_id: '0',
        //            type: 'item.create',
        //            hook_id: '878511' }


        var userID = parseInt(req.param('userID'));
        var type = req.param('type');


        var postInvoiceData = function (data) {
            var dataFields = data.fields;

            var invoicePostRequestData = {
                'Type': 'ACCREC',
                'Contact': {
                    'Name': 'ABC Limited'
                },
                'Date': '2009-08-30',
                'DueDate': '2009-09-20',
                'LineAmountTypes': 'Exclusive',
                'LineItems': {
                    'LineItem': [
                        {
                            'Description': 'Consulting services as agreed (20% off standard rate)',
                            'Quantity': '10',
                            'UnitAmount': '100.00',
                            'AccountCode': '200'
                        }
                    ]
                },
                lineItemsAdded: ""
            };

            for (var i = 0; i < dataFields.length; i++) {
                switch (dataFields[i].label) {

                    case "Invoice Type" :
                        invoicePostRequestData.Type = dataFields[i].values[0].value.text;
                        break;

                    case "Contact Name" :
                        invoicePostRequestData.Contact.Name = dataFields[i].values[0].value;
                        break;

                    case "Issue Date" :
                        invoicePostRequestData.Date = dataFields[i].values[0].start_date;
                        break;

                    case "Due Date" :
                        invoicePostRequestData.DueDate = dataFields[i].values[0].start_date;
                        break;

                    case "Line Amount Type" :
                        invoicePostRequestData.LineAmountTypes = dataFields[i].values[0].value.text;
                        break;

                    case "XERO Line Items" :
                        invoicePostRequestData.lineItemsAdded = dataFields[i].values;
                        break;


                }
            }

            return invoicePostRequestData;
        };

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
                .catch(function (error) {
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

                    PodioAPI.podioGetItemById(podioAccess, itemID, function (err, podioInvoiceItem) {
                        if (!err) {
                            var invoicePostPayLoad = postInvoiceData(podioInvoiceItem);
                            var counterItem = 0;
                            _.each(invoicePostPayLoad.lineItemsAdded, function (lineItem) {
                                var lineItemId = lineItem.value.item_id;

                                (function (lineItemId) {
                                    PodioAPI.podioGetItemById(podioAccess, lineItemId, function (err, podiolineItem) {
                                        if (!err) {
                                            (function(podiolineItem){
                                                var lineItemFields = podiolineItem.fields;
                                                var lineItemData = {};

                                                _.each(lineItemFields, function (lineItemField) {

                                                    switch (lineItemField.label) {

                                                        case "Description" :
                                                            lineItemData.Description = lineItemField.values[0].value;
                                                            break;

                                                        case "Quanity" :
                                                            lineItemData.Quantity = lineItemField.values[0].value;
                                                            break;

                                                        case "Unit Curreny" :
                                                            lineItemData.UnitAmount = lineItemField.values[0].value;
                                                            break;

                                                        case "Account Code" :
                                                            lineItemData.AccountCode = lineItemField.values[0].value.text;
                                                            break;

                                                    }

                                                });

                                                if (!lineItemData.AccountCode) lineItemData.AccountCode = "200";
                                                invoicePostPayLoad.LineItems.LineItem.push(lineItemData);

                                                counterItem = counterItem + 1;
                                                if (counterItem == invoicePostPayLoad.lineItemsAdded.length) {
                                                    delete invoicePostPayLoad.lineItemsAdded;
                                                    XeroAPI.podioCreateJobCategory(xeroAccess, xeroAccessSecret, invoicePostPayLoad, function (err, xeroPostedInvoice) {

                                                        if (!err) {
                                                            var xeroPostedInvoice = parser.toJson(xeroPostedInvoice);
                                                            xeroPostedInvoice = JSON.parse(xeroPostedInvoice);
                                                            xeroPostedInvoice.Response.item_id = itemID;
                                                            Invoice.saveInvoice(xeroPostedInvoice.Response, function (err, inv) {
                                                                if (err) {
                                                                    console.log('storing Xero posted Invoice in DB failed');
                                                                } else {
                                                                    console.log('storing Xero posted Invoice in DB success');
                                                                    console.log(inv);
                                                                }
                                                            });

                                                        } else {
                                                            console.log('Xero Invoice Post - failed' + err);
                                                        }
                                                    });
                                                }

                                            })(podiolineItem);



                                        } else {
                                            console.log(err);
                                        }
                                    });
                                })(lineItemId);


                            });


                        } else {
                            console.log('Getting podio Job item - Failed');

                            if (err.error_description == "expired_token") {
                                podioAPI.podioRefreshToken(userID, function (err, refreshedToken) {
                                    if (!err) {
                                        useVerifiedHook();
                                    } else {
                                        console.log(err);
                                    }
                                });
                            }
                        }
                    });


                } else {
                    console.log('invoiceController -> useVerifiedHook -> Failed ');
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


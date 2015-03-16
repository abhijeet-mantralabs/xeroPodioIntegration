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
        xeroOauth: {},
        projIds: [],
        webredirecrUrlXero: 'backxero',
        webredirecrUrlPodio: 'podioauth',
        invoiceWebHookUrl: "invoiceCreate",
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
        xeroOauth: {},
        projIds: [],
        webredirecrUrlXero: 'backxero',
        webredirecrUrlPodio: 'podioauth',
        invoiceWebHookUrl: "invoiceCreate",
        client_id_xero: "PJCLWXUV0KLJBIALNMISPMDRJZRTCU",
        client_id_podio: "elanceapimain",
        client_secret_xero: "CWMNNYJCDNYDY587OYIQHIQOCLB0Y0",
        client_secret_podio: "0V3Eg4vcLCWWebvDIuPRmE8bu18TadatfLCJLp1WCkeebPxGh8knjKXieEYYF71U"
    },

    xerooauthRequestUrls: {
        Request_Token_URL: "https://api.xero.com/oauth/RequestToken",
        Authorise_URL: "https://api.xero.com/oauth/RequestToken",
        Access_Token_URL: "https://api.xero.com/oauth/AccessToken",
        API_Endpoint_URL: "https://api.xero.com/api.xro/2.0/"
    },

    podioAppPayLoad :{
        invoiceApp : {
            "space_id": 3251266,
            "config": {
                "allow_edit": true,
                "tasks": [],
                "yesno": false,
                "silent_creates": false,
                "yesno_label": null,
                "thumbs": false,
                "app_item_id_padding": 5,
                "show_app_item_id": true,
                "default_view": "table",
                "allow_tags": true,
                "item_name": "Invoice",
                "allow_attachments": true,
                "allow_create": true,
                "app_item_id_prefix": "GSX",
                "disable_notifications": false,
                "fivestar": false,
                "thumbs_label": null,
                "type": "standard",
                "rsvp": false,
                "description": null,
                "usage": null,
                "fivestar_label": null,
                "approved": false,
                "icon": "223.png",
                "allow_comments": false,
                "name": "Xero Invoice",
                "icon_id": 223,
                "silent_edits": false,
                "rsvp_label": null,
                "external_id": null
            },
            "fields": [
                {
                    "type": "calculation",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "script": "@[Unique ID](item_app_item_id)",
                            "color": null,
                            "expression": null,
                            "time": null,
                            "calendar": null,
                            "decimals": null,
                            "return_type": "text",
                            "unit": null
                        },
                        "required": false,
                        "mapping": null,
                        "label": "GS Invoice ID",
                        "visible": true,
                        "delta": 0,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "text",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "format": "plain",
                            "size": "small"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Unique Invoice Number ",
                        "visible": true,
                        "delta": 1,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "category",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "multiple": false,
                            "options": [
                                {
                                    "status": "active",
                                    "text": "ACCPAY",
                                    "id": 1,
                                    "color": "DCEBD8"
                                },
                                {
                                    "status": "active",
                                    "text": "ACCREC",
                                    "id": 2,
                                    "color": "DCEBD8"
                                }
                            ],
                            "display": "inline"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Invoice Type",
                        "visible": true,
                        "delta": 2,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "text",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "format": "plain",
                            "size": "small"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Contact Name",
                        "visible": true,
                        "delta": 3,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "text",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "format": "plain",
                            "size": "small"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Contact Number",
                        "visible": true,
                        "delta": 4,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "date",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "color": "DCEBD8",
                            "calendar": true,
                            "end": "disabled",
                            "time": "disabled"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Issue Date",
                        "visible": true,
                        "delta": 5,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "date",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "color": "DCEBD8",
                            "calendar": true,
                            "end": "disabled",
                            "time": "disabled"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Due Date",
                        "visible": true,
                        "delta": 6,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "category",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "multiple": false,
                            "options": [
                                {
                                    "status": "active",
                                    "text": "Inclusive",
                                    "id": 1,
                                    "color": "DCEBD8"
                                },
                                {
                                    "status": "active",
                                    "text": "Exclusive",
                                    "id": 2,
                                    "color": "DCEBD8"
                                }
                            ],
                            "display": "inline"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Line Amount Type",
                        "visible": true,
                        "delta": 7,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "text",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "format": "html",
                            "size": "large"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Reference Text",
                        "visible": true,
                        "delta": 8,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "text",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "format": "html",
                            "size": "large"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Branding Theme",
                        "visible": true,
                        "delta": 9,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "category",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "multiple": false,
                            "options": [
                                {
                                    "status": "active",
                                    "text": "NZD",
                                    "id": 1,
                                    "color": "DCEBD8"
                                },
                                {
                                    "status": "active",
                                    "text": "AU",
                                    "id": 2,
                                    "color": "DCEBD8"
                                }
                            ],
                            "display": "inline"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Curreny Code",
                        "visible": true,
                        "delta": 10,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "category",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "multiple": false,
                            "options": [
                                {
                                    "status": "active",
                                    "text": "SUBMITTED",
                                    "id": 1,
                                    "color": "DCEBD8"
                                },
                                {
                                    "status": "active",
                                    "text": "APPROVED",
                                    "id": 2,
                                    "color": "DCEBD8"
                                }
                            ],
                            "display": "inline"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Status",
                        "visible": true,
                        "delta": 11,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "category",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "multiple": false,
                            "options": [
                                {
                                    "status": "active",
                                    "text": "TRUE",
                                    "id": 1,
                                    "color": "DCEBD8"
                                },
                                {
                                    "status": "active",
                                    "text": "FALSE",
                                    "id": 2,
                                    "color": "DCEBD8"
                                }
                            ],
                            "display": "inline"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Send to Contact",
                        "visible": true,
                        "delta": 12,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "number",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "decimals": 0
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Sub Total",
                        "visible": true,
                        "delta": 13,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "number",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "decimals": 0
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Total Tax",
                        "visible": true,
                        "delta": 14,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "number",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "decimals": 0
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Total",
                        "visible": true,
                        "delta": 15,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "app",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "referenceable_types": []
                        },
                        "required": false,
                        "mapping": null,
                        "label": "XERO Line Items",
                        "visible": true,
                        "delta": 16,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "app",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "referenceable_types": []
                        },
                        "required": false,
                        "mapping": null,
                        "label": "Incoming reference",
                        "visible": true,
                        "delta": 17,
                        "hidden": false,
                        "unique": false
                    }
                },
                {
                    "type": "text",
                    "config": {
                        "default_value": null,
                        "description": null,
                        "settings": {
                            "format": "plain",
                            "size": "small"
                        },
                        "required": false,
                        "mapping": null,
                        "label": "URL for Incoming link",
                        "visible": true,
                        "delta": 18,
                        "hidden": false,
                        "unique": false
                    }
                }
            ]
        }
    }

};

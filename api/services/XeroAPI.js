var rp = require('request-promise');

module.exports = {

    podioCreateJobCategory: function (category) {

        rp({
            uri: "https://api.podio.com/item/app/" + sails.config.globals.podioAppIds.category + "?oauth_token=" + sails.config.globals.elancAppMainDataObj.tokenDataPodio.access_token,
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

                category.user_id = sails.config.globals.elancAppMainDataObj.userInfo.user_id;

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
    }
}
module.exports = function () {

    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server')();
    var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    return api;


    function createWebsite(userId, website) {
        var deferred = q.defer();
        website._user = userId;
        websiteModel
            .create(website, function (err, website) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .find({_user: userId}, function (err, status) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;

    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();

        websiteModel
            .findById(websiteId, function (err, website) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();

        websiteModel
            .update({_id: websiteId}, {$set: website}, function (err, status) {
                if (err) {
                    deferred.reject(new Error(err));
                }
                else {
                    deferred.resolve(status);
                }
            });

        return deferred.promise;

    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();

        websiteModel.remove({_id: websiteId}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
}
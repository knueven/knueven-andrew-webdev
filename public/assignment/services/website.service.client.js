(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", description: "Lorem", created: new Date()},
            {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem", created: new Date()},
            {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem", created: new Date()},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem", created: new Date()},
            {_id: "678", name: "Checkers", developerId: "123", description: "Lorem", created: new Date()},
            {_id: "789", name: "Chess", developerId: "234", description: "Lorem", created: new Date()}
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
            "findWebsitesByUser": findWebsitesByUser
        };
        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime().toString();
            websites.push(website);
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                }
            }
        }
    }
})();
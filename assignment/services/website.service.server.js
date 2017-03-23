module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websiteModel = model.websiteModel;

    function createWebsite(req, res) {
        var userId = req.params['userId'];
        var site = req.body.website;
        websiteModel
            .createWebsite(userId, site)
            .then(function (website) {
                res.json(website);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params['userId'];
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            })
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .updateWebsite(websiteId, req.body.website)
            .then(
                function (status) {
                    res.send(status);
                },
                function (err) {
                    res.statusCode(500).send(err);
                });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};
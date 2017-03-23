module.exports = function(app, model) {
  app.post( `/api/website/:websiteId/page`, createPage );
  app.get( `/api/website/:websiteId/page`, findAllPagesForWebsite );
  app.get( `/api/website/:pageId`, findPageById );
  app.put( `/api/website/:pageId`, updatePage );
  app.delete( `/api/website/:pageId`, deletePage );
   
  var pageModel = model.pageModel;

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
        pageModel
            .createPage(websiteId, req.body.page)
            .then(function (page) {
                res.send(page)
            });
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            })
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            });
  }


  function updatePage(req, res){
    var pageId = req.params['pageId'];
        pageModel
            .updatePage(pageId, req.body)
            .then(function (status) {
                    res.send(status);
                },
                function (err) {
                    res.statusCode(500).send(err);
                });
  }

  function deletePage(req, res){
    var pageId = req.params['pageId'];
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};

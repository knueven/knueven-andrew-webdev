
module.exports = function(app,model) {
    app.post( `/api/page/:pageId/widget`, createWidget );
    app.get( `/api/page/:pageId/widget`, findAllWidgetsForPage );
    app.get( `/api/widget/:widgetId`, findWidgetById );
    app.put( `/api/widget/:widgetId`, updateWidget );
    app.delete( `/api/$widget/:widgetId`, deleteWidget );
    app.put( `/api/page/:pageId/widget`, reorderWidget );
    app.post( '/api/upload', upload.single('myFile'), uploadImage );

    var multer = require('multer');
    var upload = multer( { dest: __dirname + '/../../public/uploads' } );

    var widgetModel = model.widgetModel;
    var pageModel = model.pageModel;


    function createWidget(req, res) {
        var newWidget = req.body.widget;
        var pageId = req.params['pageId'];

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    newWidget.order = widgets.length;

                    return widgetModel
                        .createWidget(pageId, newWidget)
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (widget) {
                    return pageModel
                        .addWidgetIdToPage(widget._id, pageId)
                        .then(
                            function (response) {
                                res.json(widget);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        )
                },
                function (err) {
                    res.status(400).send(err);
                });
      }


    function findAllWidgetsForPage(req, res) {
      var pageId = req.params['pageId'];
          widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

    function findWidgetById(req, res) {
            var widgetId = req.params['widgetId'];

            widgetModel
                .findWidgetById(widgetId)
                .then(
                    function (widget) {
                        res.json(widget);
                    },
                    function (err) {
                        res.status(404).send(err);
                    }
                );
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params['widgetId'];

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send(err);
                }
            );
    }

function deleteWidget(req, res) {
   var widgetId = req.params['widgetId'];

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    var pageId = widget._page;
                    return pageModel
                        .removeWidgetIdFromPage(widgetId, pageId)
                },
                function (err) {
                    res.status(404).send(err);
                }).then(
            function (status) {
                return widgetModel
                    .deleteWidget(widgetId)
            },
            function (err) {
                res.status(404).send(err);
            }
        ).then(
            function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send(err);
            });

    }

function uploadImage( req, res ) {
    var widgetId = req.body['widgetId'];
    var websiteId = req.body['websiteId'];
    var pageId = req.body['pageId'];
    var userId = req.body['userId'];
    var myFile = req.file;

    if (myFile == null) {
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        return;
    }

    var filename = myFile.filename;


    widgetModel
        .findWidgetById(widgetId)
        .then(
            function (widget) {
                widget.url = "/uploads/" + filename;

                return widgetModel
                    .updateWidget(widgetId, widget)
            },
            function (error) {
                res.status(404).send(error);
            }
        ).then(
        function (widget) {
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        },
        function (error) {
            res.status(404).send("Unable to update widget with ID " + widgetId);
        }
      )
   }

  function reorderWidget(req, res) {
        var startIndex = req.query['start'];
        var endIndex = req.query['end'];
        var pageId = req.params['pageId'];

        widgetModel
            .reorderWidget(startIndex, endIndex, pageId)
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send(err);
                }
            )
  }
};


module.exports = app => {
  app.post( `/api/page/:pageId/widget`, createWidget ),
  app.get( `/api/page/:pageId/widget`, findAllWidgetsForPage ),
  app.get( `/api/widget/:widgetId`, findWidgetById ),
  app.put( `/api/widget/:widgetId`, updateWidget ),
  app.delete( `/api/$widget/:widgetId`, deleteWidget ),
  app.put( `/api/page/:pageId/widget`, reorderWidget ),
  app.post( '/api/upload', upload.single('myFile'), uploadImage )
};

var multer = require('multer');
var upload = multer( { dest: __dirname + '/../../public/uploads' } );


let widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/rStL7niR7gs" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


function createWidget(req, res) {
  var widget = req.body.widget;
  var pageId = req.params.pageId;

  widget._id = Math.random();
  widget.pageId = pageId;
  widgets.push(widget);
  res.json(widget);
};


function findAllWidgetsForPage(req, res) {
  var pageId = req.params.pageId;
  var selectedWidgets = widgets.filter(widget => {
    return (widget.pageId === pageId);
  });

  res.json(selectedWidgets);
};

function findWidgetById(req, res) {
  var widgetId = req.params.widgetId;
  var selectedWidget = widgets.find(widget => {
    return (widget._id === widgetId);
  });
  res.json(selectedWidget);
};

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    var updatedWidget = null;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            updatedWidget = widget;
            break;
        }
    }
    res.json(updatedWidget);
};

function deleteWidget(req, res) {
  var widgetId = req.params.widgetId;
  widgets = widgets.filter(widget => {
    return (widget._id !== widgetId);
  });

  res.sendStatus( 204 );
};

function getOptions(req, res) {
        res.json(options);
};

function uploadImage( req, res ) {
  var userId = req.body.userId;
  var websiteId = req.body.websiteId;
  var pageId = req.body.pageId;
  var widgetId = req.body.widgetId;

  var myFile = req.file;
  var filename = myFile.filename;     // new file name in upload folder

  var widget = {
    _id: widgetId,
    widgetType: "IMAGE",
    pageId,
    url: `/uploads/${ filename }`
  }

  widgets.push(widget);

  res.redirect(301, `/assignment/#/user/${userId}/website/${websiteId}/page/${pageId}/widget`);
};

function reorderWidget(req, res) {
  var pageId = req.params.pageId;
  var startIndex = +req.query.initial;
  var endIndex = +req.query.final;

  var pageWidgets = widgets.filter(widget => {
    return (widget.pageId === pageId);
  } );

  var orderedPageWidgets = function(startIndex, endIndex) {
    var moved = pageWidgets[ startIndex ];

    if (startIndex < endIndex) {
        return [
        ...pageWidgets.slice(0, startIndex),
        ...pageWidgets.slice(startIndex + 1, endIndex + 1),
        moved,
        ...pageWidgets.slice(endIndex + 1)
    ];
    } else if (startIndex > endIndex) {

        return [
        ...pageWidgets.slice(0, endIndex),
        moved,
        ...pageWidgets.slice(endIndex, startIndex),
        ...pageWidgets.slice(startIndex + 1)
    ];
    } else {
            return pageWidgets;
        }
    }

  widgets = widgets.filter(wdgt => {
    return !orderedPageWidgets.reduce((prev, curr) => {
        return (prev || deepEquals(curr, wdgt));
        }, false);
  });

  widgets = widgets.concat(orderedPageWidgets);

  res.json(widgets);
}

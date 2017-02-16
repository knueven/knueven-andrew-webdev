(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
                    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
                    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
                ];

        var options = [1, 2, 3, 4, 5, 6];

        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "getOptions": getOptions
        };
        return api;

        function getOptions() {
            return options;
        }

        function findWidgetsByPageId(pageId) {
            var wg = [];
            for (var w in widgets) {
                if (widgets[w].pageId == pageId) {
                    wg.push(widgets[w]);
                }
            }
            return wg;
        }


        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    if (widget.widgetType == "HEADER") {
                        widgets[w].text = widget.text;
                        widgets[w].size = widget.size;
                    }
                    else if ((widget.widgetType == "IMAGE") || (widget.widgetType == "YOUTUBE")) {
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                    }
                    else if (widget.widgetType == "HTML") {
                        widgets[w].text = widget.text;
                    }
                    return;
                }
            }
        }
    }

})();
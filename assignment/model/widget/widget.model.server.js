module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server')();
    var widgetModel = mongoose.model('widgetModel', widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        var deferred = q.defer();
        widgetModel
            .create(widget, function (err, widget) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }


    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel
            .find({_page: pageId}, function (err, status) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }


    function findWidgetById(widgetId) {
        var deferred = q.defer();

        widgetModel
            .findById(widgetId, function (err, widget) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();

        widgetModel
            .update({_id: widgetId}, {$set: widget}, function (err, status) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();

        widgetModel.remove({_id: widgetId}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function reorderWidget(pid, start, end) {
        var deferred = q.defer();
        WidgetModel.update(
            {
                _page: pid,
                orderIndex: start
            },
            {
                orderIndex: end
            },
            function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            }
        );
        return deferred.promise;
    }
};
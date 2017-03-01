(function() {
  angular.module('WebAppMaker').factory('WidgetService', WidgetService);

  function WidgetService($http) {

    var api = {
      createWidget,
      findWidgetsByPageId,
      findWidgetById,
      updateWidget,
      deleteWidget,
      sortWidgets
    };

    return api;

    function createWidget(pageId, widget) {
      return $http({
        method: 'POST',
        url: `/api/page/${ pageId }/widget`,
        data: {
          widget
        }
      });
    };

    function findWidgetsByPageId(pageId) {
      return $http({
        method: 'GET',
        url: `/api/page/${ pageId }/widget`
      });
    };

    function findWidgetById(widgetId) {
      return $http({
        method: 'GET',
        url: `/api/widget/${pageId}`
      });
    };

    function updateWidget(widgetId, widget) {
      return $http({
        method: 'PUT',
        url: `/api/widget/${pageId}`,
        data: {
          widget
        }
      });
    };

    function deleteWidget(widgetId) {
      return $http({
        method: 'DELETE',
        url: `/api/widget/${pageId}`
      });
    };

    function sortWidgets(pageId, startIndex, finalIndex) {
      return $http({
        method: 'PUT',
        url: `${ apiParent }${ pageId }/widget`,
        params: {
          initial: startIndex,
          final: finalIndex
        }
      });
    }
  }
} )();
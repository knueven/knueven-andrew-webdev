(function() {
  angular.module('WebAppMaker').factory('PageService', PageService);

  function PageService($http) {

  var api = {
    createPage,
    findPagesByWebsiteId,
    findPageById,
    updatePage,
    deletePage
  };

  return api;

  function createPage(websiteId, page) {
    return $http({
      method: 'POST',
      url: `/api/website/${websiteId}/page`,
      data: {page: page}
    });
  };

  function findPagesByWebsiteId(websiteId) {
    return $http({
      method: 'GET',
      url: `/api/website/${websiteId}/page`,
    });
  };

  function findPageById(pageId) {
    return $http({
      method: 'GET',
      url: `/api/website/${pageId}`
    });
  };

  function updatePage(pageId, page) {
    return $http({
      method: 'PUT',
      url: `/api/website/${pageId}`,
      data: {
        page: page
      }
    });
  };

  function deletePage(pageId) {
    return $http({
      method: 'DELETE',
      url: `/api/website/${pageId}`
    });
  };
}
} )();
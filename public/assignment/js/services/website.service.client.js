(function() {
  angular.module('WebAppMaker').factory('WebsiteService', WebsiteService);

  function WebsiteService($http) {
    const apiRoute = '/api/website/';
    const apiParent = '/api/user/'

    var api = {
      createWebsite,
      findWebsitesByUser,
      findWebsiteById,
      updateWebsite,
      deleteWebsite
    };

    return api;

    function createWebsite(userId, website) {
      return $http({
        method: 'POST',
        url: `$/api/user/${userId}/website`,
        data: { website: website }
      });
    };

    function findWebsitesByUser(userId) {
      return $http({
        method: 'GET',
        url: `/api/user/${ userId }/website`,
      })
    }

    function findWebsiteById(websiteId) {
      return $http({
        method: 'GET',
        url: `/api/website/${websiteId}`
      });
    };

    function updateWebsite(websiteId, website) {
      return $http({
        method: 'PUT',
        url: `/api/website/${websiteId}`,
        data: {
          website
        }
      });
    };

    function deleteWebsite(websiteId) {
      return $http({
        method: 'DELETE',
        url: `/api/website/${websiteId}`
      });
    };
  }
} )();

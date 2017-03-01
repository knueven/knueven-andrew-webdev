(function() {
  angular.module('WebAppMaker').factory('UserService', UserService);

  function UserService($http) {
    const apiRoute = '/api/user/';

    let api = {
      createUser,
      findUserById,
      findUserByUsername,
      findUserByCredentials,
      updateUser,
      deleteUser
    };

    return api;

    function createUser(user) {
      return $http({
        method: 'POST',
        url: `/api/user`,
        data: { user: user }
      });
    };

    function findUserById(userId) {
      return $http({
        method: 'GET',
        url: `/api/user/${userId}`
      });
    };

    function findUserByUsername(username) {
      return $http({
        method: 'GET',
        url: `/api/user`,
        params: {
          username: username
        }
      });
    };

    function findUserByCredentials(username, password) {
      return $http({
        method: 'GET',
        url: `/api/user`,
        params: {
          username,
          password
        }
      });
    };

    function updateUser(userId, user) {
      return $http({
        method: 'PUT',
        url: `/api/user/${userId}`,
        data: {
          user
        }
      });

    };

    function deleteUser(userId) {
      return $http({
        method: 'DELETE',
        url: `/api/user/${userId}`
      });
    };
  }

} )();
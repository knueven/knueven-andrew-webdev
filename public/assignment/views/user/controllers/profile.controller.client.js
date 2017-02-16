(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            var user = UserService.findUserById(userId);
            if(user) {
                vm.user = user;
            } else {
                vm.error = "A user with this ID does not exist!"
            }
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if (user == null) {
                vm.error = "Unable to update user, error!";
            } else {
                vm.message = "User was successfully updated!";
            }
        }
        
        function deleteUser (userId) {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

    }
})();
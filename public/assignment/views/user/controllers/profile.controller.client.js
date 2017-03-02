(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            var user = UserService.findUserById(vm.userId)
            .then(res => {
                user = res.data;
            },
            res => {
                vm.userNotFound = true;
            });
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(vm.userId, newUser)
            .then(res => {
                vm.message = "User was successfully updated!";
            },
            res => {
                vm.error = true;
            });
        }
        
        function deleteUser (userId) {
            UserService.deleteUser(vm.userId).
            then(res => {
                $location.url("/login");
            });
        }

    }
})();
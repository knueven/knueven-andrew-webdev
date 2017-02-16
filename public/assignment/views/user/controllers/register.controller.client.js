(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if (loginUser == null) {
                loginUser = UserService.createUser(user);
                $location.url('/user/' + loginUser._id);
            }
            else {
                vm.error = "Username already exists";
            }
        }
    }
})();
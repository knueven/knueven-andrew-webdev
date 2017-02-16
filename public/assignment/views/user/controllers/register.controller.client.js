(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            if(user.password != user.confirmPassword) {
                vm.error = "Passwords don't match, please enter the password correctly."
            } else {
                delete user['confirmPassword'];
                user._id = (new Date()).getTime().toString();
                UserService.createUser(user);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "Failed to register user";
                }
            }
        }
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function init() {

        }
        init();

        function login(user) {

            vm.error = false;
            var loginUser = UserService.findUserByCredentials(user.username, user.password)
            .then(res =>{
                user = res.data;

                $location.url(`/user/${ user._id }/`);
            }, res => {
                vm.error = true;
            });
        }
    }
})();
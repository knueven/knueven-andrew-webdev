(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

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
    };

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
    };


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
    };
})();
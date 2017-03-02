(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.createWebsite = createWebsite;

        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
            .then(res => {
                vm.websites = res.data;
                }, res => {
                vm.error = true;
            });
        }
        init();

        function createWebsite( website ) {
            WebsiteService.createWebsite( vm.userId, website )
            .then( res => {
                $location.url(`/user/${ vm.userId }/website`);
            }, res => {
            vm.errorCreating = true;
        });
    }
}
})();
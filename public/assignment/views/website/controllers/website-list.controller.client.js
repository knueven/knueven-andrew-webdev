(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
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
    }
})();
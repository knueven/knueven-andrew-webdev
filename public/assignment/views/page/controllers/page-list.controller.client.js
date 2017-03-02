(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController(PageService, $routeParams) {
        var vm = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;

        function init() {
            PageService.findPagesByWebsiteId( vm.websiteId )
            .then( res => {
            vm.pages = res.data;
            }, res => {
                vm.error = true;
            });
        }
        init();
    }
})();
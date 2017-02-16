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
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }
})();
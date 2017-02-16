(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.create = createPage;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();

        function createPage(newPage) {
            var page = PageService.createPage(websiteId, newPage);
            if(page) {
                var index = $location.path().lastIndexOf("/");
                $location.url($location.path().substring(0, index));
            } else {
                vm.error = "Failed to create new page";
            }
        }
    }
})();
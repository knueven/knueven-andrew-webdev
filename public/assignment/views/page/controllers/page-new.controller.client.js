(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.create = create;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function create(newPage) {
            var page = PageService.createPage(vm.websiteId, newPage);
            if(page) {
                var index = $location.path().lastIndexOf("/");
                $location.url($location.path().substring(0, index));
            } else {
                vm.error = "Failed to create new page";
            }
        }
    }
})();
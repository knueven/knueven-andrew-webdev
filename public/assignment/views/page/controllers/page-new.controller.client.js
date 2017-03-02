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
            PageService.findPagesByWebsiteId( vm.websiteId )
            .then( res => {
            vm.pages = res.data;
            }, res => {
                vm.error = true;
            });
        }
        init();

        function create(newPage) {
            PageService.createPage( vm.websiteId, newPage )
            .then( res => {
            $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page`);
            }, res => {
                vm.errorCreating = true;
            });
        }
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            PageService.findPageById( vm.pageId )
            .then( res => {
                vm.page = res.data;
            }, res => {
                vm.pageNotFound = true;
            });
        }
        init();

        function updatePage( page ) {
            PageService.updatePage( vm.pageId, page )
            .then( res => {
                $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page`);
            }, res => {
                vm.errorUpdating = true;
            });

      }

      function deletePage() {
        PageService.deletePage( vm.pageId )
        .then( res => {
          $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page`);
        }, res => {
          vm.errorDeleting = true;
        });

      }
    }
})();
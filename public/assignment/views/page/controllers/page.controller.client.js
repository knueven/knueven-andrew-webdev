(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController);


    function EditPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            PageService.findPageById(vm.pageId)
            .then( res => {
                vm.page = res.data;
            }, res => {
                vm.pageNotFound = true;
            });
        }
        init();

        function updatePage(page) {
            PageService.updatePage( vm.pageId, page )
            .then( res => {
                $location.url(`/user/${vm.userId}/website/${vm.websiteId}/page`);
            }, res => {
                vm.errorUpdating = true;
            });

      }

      function deletePage() {
        PageService.deletePage(vm.pageId)
        .then( res => {
          $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page`);
        }, res => {
          vm.errorDeleting = true;
        });

      }
    };

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
    };

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
    };
})();
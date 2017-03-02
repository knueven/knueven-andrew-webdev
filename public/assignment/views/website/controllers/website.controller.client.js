(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController);


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
    };

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
    };


    function EditWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        var userId = $routeParams.uid;
        vm.userId = userId;
        vm.websiteId = $routeParams.wid;

        function init() {
            WebsiteService.findWebsiteById(vm.websiteId)
            .then(res => {
              vm.website = res.data
            }, res => {
              vm.websiteNotFound = true;
            });

            WebsiteService.findWebsitesByUser(vm.userId)
            .then(res => {
              vm.websites = res.data;
            }, res => {
              vm.websitesNotFound = true;
            });
        }
        init();

        function updateWebsite(website) {
             WebsiteService.updateWebsite(vm.websiteId, website)
            .then(res => {
                $location.url(`/user/${vm.userId}/website`);
                }, res => {
                vm.errorUpdating = true;
            });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId)
            .then( res => {
                $location.url(`/user/${vm.userId}/website`);
                }, res => {
                    vm.errorDeleting = true;
            });
        }
    };
})();
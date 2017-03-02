(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

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
    }
})();
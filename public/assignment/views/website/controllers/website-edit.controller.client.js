(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteWebsite = deleteWebsite;

        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.website = WebsiteService.findWebsiteById($routeParams.wid);
        }
        init();

        function update(newWebsite) {
            var website = WebsiteService.updateWebsite(newWebsite._id, newWebsite);
            if(website) {
                navigateToWebsites();
            } else {
                vm.error = "Unable to update website!"
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id);
            navigateToWebsites();
        }

        function navigateToWebsites() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();
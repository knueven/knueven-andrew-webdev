(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.getOptions = WidgetService.getOptions();
            vm.widget = WidgetService.findWidgetById($routeParams.wgid);
        }

        init();

        function update() {
            var widget = WidgetService.updateWidget(vm.widget._id, vm.widget);
            if (widget) {
                navigateToWidgets();
            } else {
                vm.error = "Failed to update widget";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widget._id);
            navigateToWidgets();
        }

        function navigateToWidgets() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();
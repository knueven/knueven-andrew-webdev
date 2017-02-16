(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.pageId = $routeParams.pid;
        vm.create = create;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function create(newWidget) {
            var widget = WidgetService.createWidget(vm.pageId, newWidget);
            if(widget._id != "") {
                var index = $location.path().lastIndexOf("/");
                var navTo = $location.path().substring(0, index) + "/" + widget._id;
                $location.url(navTo);
            } else {
                vm.error = "Failed to create new widget";
            }
        }
    }
})();
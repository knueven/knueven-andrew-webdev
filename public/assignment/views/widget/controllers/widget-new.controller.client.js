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
            vm.newWidgetHeader = {_id: "", widgetType: "HEADING", pageId: vm.pageId, size: 2, text: "New Header Text"};
            vm.newWidgetImage = {
                _id: "",
                widgetType: "IMAGE",
                pageId: vm.pageId,
                width: "100%",
                url: "http://lorempixel.com/400/200/"
            };
            vm.newWidgetYouTube = {
                _id: "",
                widgetType: "YOUTUBE",
                pageId: vm.pageId,
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            };
            vm.newWidgetHTML = {_id: "", widgetType: "HTML", pageId: vm.pageId, text: "<p>Lorem ipsum</p>"};
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
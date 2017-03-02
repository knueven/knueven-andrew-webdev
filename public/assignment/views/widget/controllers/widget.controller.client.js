(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)
        .controller("WidgetListController", WidgetListController)
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

    function WidgetListController(WidgetService, $routeParams, $sce) {
        var vm = this;
        vm.checkSafeURL = checkSafeURL;
        vm.getSafeHTML = getSafeHTML;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function checkSafeURL(widgetUrl) {
            var parts = widgetUrl.split('/');
            var id = parts[parts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getSafeHTML(text) {
            return $sce.trustAsHtml(text);
        }
    }

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
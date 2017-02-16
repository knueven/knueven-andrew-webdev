(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

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
})();
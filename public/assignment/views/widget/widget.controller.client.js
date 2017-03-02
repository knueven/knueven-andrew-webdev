(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController)
        .controller("WidgetListController", WidgetListController)
        .controller("EditWidgetController", EditWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        vm.widgetTypes = [
        {
          type: 'HEADING',
          name: 'Heading'
        },
        {
          type: 'IMAGE',
          name: 'Image'
        },
        {
          type: 'YOUTUBE',
          name: 'Youtube'
        }
      ];

    function createWidget( widgetType ) {
            WidgetService.createWidget( vm.pageId, { widgetType } )
            .then( res => {
                let newWidget = res.data;
                $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page/${ vm.pageId }/widget/${ newWidget._id }`);
                }, res => {
                vm.errorCreating = true;
        });
      }
    };

    function WidgetListController(WidgetService, $routeParams, $sce) {
        var vm = this;
        vm.checkSafeURL = checkSafeURL;
        vm.getSafeHTML = getSafeHTML;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            WidgetService.findWidgetsByPageId( vm.pageId )
            .then( res => {
                vm.widgets = res.data;
                }, res => {
                    vm.error = true;
            });
        }
        init();

        function checkSafeURL(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function getSafeHTML(text) {
            return $sce.trustAsHtml(text);
        }
    };

    function EditWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.update = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.pageId = $routeParams.pid;

        function updateWidget( widget ) {
            WidgetService.updateWidget( vm.widgetId, widget )
            .then( res => {
                $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page/${ vm.pageId }/widget`);
            }, res => {
                vm.errorUpdating = true;
            });
        }

        function deleteWidget() {
            WidgetService.deleteWidget( vm.widgetId )
            .then( res => {
                $location.url(`/user/${ vm.userId }/website/${ vm.websiteId }/page/${ vm.pageId }/widget`);
                }, res => {
                vm.errorDeleting = true;
            });
        }

        function init() {
            WidgetService.findWidgetById( vm.widgetId )
            .then( res => {
              vm.widget = res.data;
                }, res => {
              vm.errorRetrieving = true;
            });
        }
        init();
    };
})();
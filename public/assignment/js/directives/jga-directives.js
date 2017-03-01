;( function() {

  angular.module('jgaDirectives', []).directive('jgaSortable', jgaSortable);

  function jgaSortable() {

    function onLink(scope, elem, attrs) {
      let startIndex = -1;
      let endIndex = -1;

      $(elem).sortable({
        start(ev, uiElem) {
          startIndex = uiElem.item.index();
        },
        stop(ev, uiElem) {
          endIndex = uiElem.item.index();
          scope.SortableController.sort( startIndex, endIndex );
        },
        items: '.widget__icon-container'
      });
    }

    return {
      link: onLink,
      restrict: 'C',
      controller: SortableController,
      controllerAs: 'SortableController'
    };
  }

  function SortableController(WidgetService, $routeParams) {
    let vm = this;

    vm.sort = sort;
    vm.pageId = $routeParams['pid'];

    function sort(start, end) {
      WidgetService.sortWidgets(vm.pageId, start, end)
      .then(res => {
      }, res => {

      });
    }
  }


} )();
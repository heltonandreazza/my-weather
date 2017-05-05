export default (() => {
  'use strict';

  LoadingSpinner.$inject = ['$http'];

  function LoadingSpinner($http) {
    return {
      templateUrl: 'spinner.html',
      restrict: 'AE',
      link: function postLink(scope, element) {
        var el = $(element);
        scope.isLoading = () => { return $http.pendingRequests.length > 0; };
        scope.$watch(scope.isLoading, (loading) => { loading ? el.show() : el.hide() });
        el.show();
      }
    }
  };

  return angular.module('app.component.spinner', []).directive('spinner', LoadingSpinner).name;
})();
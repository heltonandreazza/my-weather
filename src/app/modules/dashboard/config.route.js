/* @ngInject */
function configRoute($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'vm'
    });
}

export default configRoute;
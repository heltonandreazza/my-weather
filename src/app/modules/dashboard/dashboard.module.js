import DashboardController from './dashboard.controller';
import DashboardService from './dashboard.service';
import configRoute from './config.route';

export default angular
  .module('app.dashboard', [])
  .controller('DashboardController', DashboardController)
  .service('dashboardService', DashboardService)
  .config(configRoute)
  .name;
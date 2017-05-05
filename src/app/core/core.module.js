//external libs
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import Chart from 'chart.js';
//internal libs
import constants from './constants';

export default angular
  .module('app.core', [
    //external libs
    uiRouter,
    ngAnimate,
    //internal libs
    constants
  ])
  .config(configRoutes)
  .name;

/*@ngInject*/
function configRoutes($urlRouterProvider) {
  $urlRouterProvider.otherwise('dashboard');
}
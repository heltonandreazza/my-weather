//external libs
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import angularUiBootstrap from 'angular-ui-bootstrap';
import angularTranslate from 'angular-translate';
import Chart from 'chart.js';
//internal libs
import constants from './constants';

export default angular
  .module('app.core', [
    //external libs
    uiRouter,
    ngAnimate,
    angularUiBootstrap,
    angularTranslate,
    //internal libs
    constants
  ])
  .config(configRoutes)
  .name;

/*@ngInject*/
function configRoutes($urlRouterProvider) {
  $urlRouterProvider.otherwise('dashboard');
}
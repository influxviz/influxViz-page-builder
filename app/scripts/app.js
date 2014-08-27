'use strict';

/**
 * @ngdoc overview
 * @name influxVizPageBuilderApp
 * @description
 * # influxVizPageBuilderApp
 *
 * Main module of the application.
 */
angular
  .module('influxVizPageBuilderApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'DashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

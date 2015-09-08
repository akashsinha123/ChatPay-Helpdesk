'use strict';

/**
 * @ngdoc overview
 * @name chatpayApp
 * @description
 * # chatpayApp
 *
 * Main module of the application.
 */
angular
  .module('chatpayApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'angular-md5',
    'luegg.directives',
    'http-auth-interceptor'
  ])
  .constant('moment', moment)
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
      })
      .when('/management', {
        templateUrl: 'views/management.html',
        controller: 'ManagementCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

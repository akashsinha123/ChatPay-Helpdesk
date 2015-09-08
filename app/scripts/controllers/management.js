'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('ManagementCtrl', function ($scope, $location, $cookieStore, CustomerService, UserService) {
    
  	










    $scope.showInfo = false;

    $scope.adminInfo = function(){
      $scope.showInfo = !$scope.showInfo;
    }

    $scope.managementPage = function(){
      $location.path('/management')
    }

    $scope.logOut = function(){
      $cookieStore.remove('sessionId');
      $cookieStore.remove('appKey');

      $location.path('/');
    }

    $scope.home = function(){
      $location.path('/home')
    }
    
  });

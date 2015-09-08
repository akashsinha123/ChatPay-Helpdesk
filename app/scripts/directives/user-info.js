'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userInfo', function () {
    return {
    	restrict: 'E',
	    scope: {
	      customer: '=customer'
	    },
	    templateUrl: 'views/directives/user-info.html',
	    link: function(scope, element, attrs){
	    	
	    }
    }
    


  });

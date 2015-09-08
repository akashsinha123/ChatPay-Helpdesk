'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userHistory', function () {
    return {
    	restrict: 'E',
	    scope: {
	      search: '=search'
	    },
	    templateUrl: 'views/directives/user-history.html',
	    link: function(scope, element, attrs){
	    	
	    }
    }
    


  });

'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('managementList', function () {
    return {
    	restrict: 'E',
	    scope: {
	      
	    },
	    templateUrl: 'views/directives/management-list.html',
	    
	    link: function(scope, element, attrs){

	    	
	    	
	    }
    }
    


  });

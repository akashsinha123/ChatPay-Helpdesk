'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('managementMerchant', function () {
    return {
    	restrict: 'E',
	    scope: {
	      
	    },
	    templateUrl: 'views/directives/management-merchant.html',
	    
	    link: function(scope, element, attrs){

	    	
	    	
	    }
    }
    


  });

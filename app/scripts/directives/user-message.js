'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userMessage', function () {
    return {
    	restrict: 'E',
	    scope: {
	      fireSubmitMessage: '=fireSubmitMessage',
	      templateMessages: '=templateMessages',
	      composedMessagefromTemplate: '=composedMessagefromTemplate'
	    },
	    templateUrl: 'views/directives/user-message.html',
	    
	    link: function(scope, element, attrs){

	    	scope.fillMessageField = function(message){
	    		scope.composedMessagefromTemplate = message;
	    	};
	    	
	    	scope.sendMessage = function(message){
	    		scope.fireSubmitMessage = true;
	    		scope.composedMessagefromTemplate = message;
	    		
	    	};
	    	
	    }
    }
    


  });

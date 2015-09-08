'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userSearch', function (UserOrderService, $cookieStore, ChatService, CustomerService, SocketService, moment, UserService, $location) {
    return {
    	restrict: 'E',
	    scope: {
	      customer: '=customer',
	      customers: '=customers',
	      messages: '=messages',
	      categories: '=categories',
	      merchants: '=merchants',
	      merchantKey: '=merchantKey',
	      templateMessages: '=templateMessages',
	      inventory: '=inventory',
	      timePast: '=timePast',
		  userMessageInfo: '=userMessageInfo'
	    },
	    templateUrl: 'views/directives/user-search.html',
	    link: function(scope, element, attrs){
	    	var data = {
	            sessionId: $cookieStore.get('sessionId')
		    };
		    //console.log(data);

		    CustomerService.fetch()
			    .then(function(customers){
			    	if(customers){
				        scope.customers = customers.response.body.customers;
				        for (var i = 0; i < scope.customers.length; i++) {
				        	scope.customers[i].numberOfMessagesPending = "";
				        };
				        scope.categories = customers.response.body.categories;
				        scope.merchants = customers.response.body.merchants;
				        scope.templateMessages = customers.response.body.templates;
			    	}

			    })
			    .catch(function(err){
			    	$location.path('/');
			    });

		    setInterval(function(){
		    	CustomerService.profile()
		    	.then(function(profile){
		    		//console.log(profile);
		    	})
			    .catch(function(err){
			    	$location.path('/');
			    });
			}, 300000);

		    scope.selected = null;
			

		    scope.customerSelected = function(customer, index){

		    	scope.selected = index;

		    	scope.customer = customer;
		    	scope.customer.numberOfMessagesPending = 0;
		    	var data2 = {
		    		sessionId: $cookieStore.get('sessionId'),
		    		customerKey: customer.userKey
		    	};

		    	ChatService.fetch(data2)
		    	.then(function(messages){
			        scope.messages = messages.response.body.messages;
			        scope.merchantKey = messages.response.body.merchantKey;
			    })
			    .catch(function(err){
			    	
			    });

			    var data = {
		    		sessionId: $cookieStore.get('sessionId'),
		    		merchantKey: scope.merchantKey
		    	}

		    	UserOrderService.fetch(data)
			    .then(function(inventory){
			        scope.inventory = inventory.response.body.inventory;
			        //console.log(scope.inventory);
			    })
			    .catch(function(err){

			    });

		    };

		    
	    }
    }
    


  });

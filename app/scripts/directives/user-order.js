'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userOrder', function (UserOrderService, $cookieStore, ChatService, CustomerService, ComposeService, moment) {
    return {
    	restrict: 'E',
	    scope: {
	      customer: '=customer',
	      messages: '=messages',
	      categories: '=categories',
	      merchants: '=merchants',
	      merchantKey: '=merchantKey',
	      inventory: '=inventory',
	      merchant: '=merchant',
	      search: '=search'
	    },

	    templateUrl: 'views/directives/user-order.html',
	    link: function(scope, element, attrs){

	    	scope.items = [];
	    	scope.itemNames = [];
	    	scope.itemUnitPrice = [];
	    	scope.total = 0;

	    	// scope.count = 0;
	    	// scope.quantity = 1;

	    	scope.quantityIncrement = function(itemUnitPrice, index){
	    		scope.items[index].quantity += 1;
	    		
	    		scope.items[index].itemTotal = scope.items[index].itemUnitPrice*scope.items[index].quantity;

	    	};

	    	scope.quantityDecrement = function(itemUnitPrice, index){
	    		if(scope.items[index].quantity > 1){
	    			scope.items[index].quantity -= 1;
	    		}
	    		
	    		scope.items[index].itemTotal = scope.items[index].itemUnitPrice*scope.items[index].quantity;
	    		
	    		
	    	}



	    	scope.addItem = function(inven, index){
		    		scope.items.push(inven);
		    		scope.itemNames.push(inven.itemName);
		    		scope.itemUnitPrice.push(inven.itemUnitPrice);
		    		for (var i = 0; i < scope.items.length; i++) {
		    			
		    			if(!scope.items[i].quantity){

		    				scope.items[i].quantity = 1;

		    			}

		    			if(!scope.items[i].itemTotal){

		    				scope.items[i].itemTotal = scope.items[i].itemUnitPrice;

		    			}
		    		};

		    		scope.inventory.splice(index, 1);
	    	};

	    	scope.removeItem = function(index, item){
			    scope.items.splice(index, 1);
			    scope.itemNames.splice(index,1);
			    scope.itemUnitPrice.splice(index,1);
			    scope.inventory.push(item);
			};

			//console.log($cookieStore.get('sessionId'));
			scope.inventory = function(){
	    		// var data = {
		    	// 	sessionId: $cookieStore.get('sessionId'),
		    	// 	merchantKey: scope.merchantKey
		    	// }

		    	// UserOrderService.fetch(data)
			    // .then(function(inventory){
			    //     scope.inventory = inventory.response.body.inventory;
			    //     //console.log(scope.inventory);
			    // })
			    // .catch(function(err){

			    // });
	    	};


	    	scope.deliveryCharges = 0;
	    	scope.convenienceCharges = 0;
	    	scope.discount = 0;

	    	scope.countTotal = function(){
	    		scope.sumTotal();
	    	};

	    	scope.sumTotal = function(){

	    		var cost = 0;

	    		for (var i = 0; i < scope.items.length; i++) {
	    			cost += scope.items[i].itemTotal;
	    		};

	    		return cost + scope.deliveryCharges + scope.convenienceCharges - scope.discount;

	    		cost = 0;
	    		Afterdelivery = 0;
	    		Afterconvenience = 0;

	    	};

	    	

	    	scope.finalTotal = function(){

	    		var cost = scope.sumTotal();

	    		var Afterdelivery = cost + scope.deliveryCharges;

	    		var Afterconvenience = Afterdelivery + scope.convenienceCharges;

	    		scope.grandTotal = Afterconvenience - scope.discount;

	    		cost = 0;
	    		Afterdelivery = 0;
	    		Afterconvenience = 0;

	    	}

	    	scope.showUserAddress = false;

	    	scope.userAddress = function(){
	    		scope.showUserAddress = !scope.showUserAddress;
	    	}
	    	
	    	scope.selectedUserAddress = function(address){
	    		scope.address = address;
	    		console.log(scope.address);
	    	}
	    	

	    	scope.placeOrder = function() {

	    		var data = 
	    		{
	    			status: 1,
	    			merchantKey: scope.merchantKey,
	    			appKey: $cookieStore.get('appKey'),
	    			sessionId: $cookieStore.get('sessionId'),
	    			customerKey: scope.customer.userKey,
	    			userKey: "cb7c5f69ff356ecca55b7d08df877991",
	    			category:"Grocery",
	    			shippingAddress: scope.address,
	    			data: 	JSON.stringify({items:  
    							[
									{
										 acocuntId: 1,
										 created: moment().toString(),
										 id: 1,
										 itemDescription: "Fuji Apple - 500 gm",
										 itemName: scope.itemNames,
										 itemQuantity: 1,
										 itemSku: "Fuji Apple - 500 gm",
										 itemUnitPrice: scope.itemUnitPrice,
										 merchantId: 1,
										 orderId: 4,
										 status: 1,
										 totalItemPrice: scope.grandTotal,
										 userId: 1
									}
							 	]
							})
	    		};
	    		console.log(data);
	    		UserOrderService.create(data)
	    		.then(function(list){
			        console.log(list);
			    })
			    .catch(function(err){
			    	console.log(err);
			    });
	    	};



	    }
    }
    


  });

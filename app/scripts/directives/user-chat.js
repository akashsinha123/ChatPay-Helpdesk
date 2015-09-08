'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userChat', function ($cookieStore, ChatService, CustomerService, SocketService, ComposeService, moment) {
    return {
    	restrict: 'E',
	    scope: {
	      	customer: '=customer',
	      	messages: '=messages',
	      	customers: '=customers',
	      	merchants: '=merchants',
            merchantKey: '=merchantKey',
	      	merchant: '=merchant',
	      	timePast: '=timePast',
		  	fireSubmitMessage: '=fireSubmitMessage',
		  	composedMessagefromTemplate: '=composedMessagefromTemplate',
		  	userMessageInfo: '=userMessageInfo'
	    },
	    templateUrl: 'views/directives/user-chat.html',
	    
	    link: function(scope, element, attrs){
	    	var socket = SocketService.socket();
			socket.onopen = function () {
                console.log('Info: WebSocket connection opened.');
            };

            

            scope.$watch('composedMessagefromTemplate', function(value){
            	if(scope.composedMessage != value)
                    scope.composedMessage = value;
            	if(scope.fireSubmitMessage){
            		scope.composeMessage();
            		scope.fireSubmitMessage = false;
            	}

            });

            scope.$watch('composedMessage', function(value){
                scope.composedMessagefromTemplate = value;
            });

            //console.log($cookieStore.get('sessionId'));

            socket.onmessage = function (event) {
                console.log('socket.onmessage', event);
                console.log('message received on socket', event.data);
                var newMessage = JSON.parse(event.data);
                //console.log(newMessage);
                var k = 0;
                for (var i = 0; i < scope.customers.length; i++) {
                    if(newMessage.customer.userKey == scope.customers[i].userKey){

                        scope.moment = moment();
                        scope.moment.lang('en');
                        scope.customers[i].lastMessageTime = scope.moment.fromNow(newMessage.customerMessage.created);
                        scope.customers[i].numberOfMessagesPending++;
                        k++;
                    }
                    if(k=0){
                        newMessage.customer.numberOfMessagesPending = "new";
                        scope.customers.push(newMessage.customer);
                    }
                };
                if(scope.customer){

                }
                if(scope.customer.userKey == newMessage.customer.userKey){
                    scope.customer.numberOfMessagesPending = 0;
                    scope.messages.push(newMessage.customerMessage);
                    scope.glued = true;
                    scope.$digest();
                }
                
            };

	    	scope.composeMessage = function(){
	    		var data = {
	    			sessionId: $cookieStore.get('sessionId'),
	    			customerKey: scope.customer.userKey,
	    			merchantKey: scope.merchantKey,
	    			message: scope.composedMessage
	    		};

	    		ComposeService.create(data)
		    	.then(function(message){
		    		//console.log(message);
			        scope.messages.push({messageType: 2, message: message.message});
			        scope.composedMessage = '';
			    })
			    .catch(function(err){
			    	
			    });
			    scope.glued = true;
	    		return false;
	    	};

            
	    }    
    }
    


  });

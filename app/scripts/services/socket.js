'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp').service('SocketService', function (socketFactory, $cookieStore) {

	this.socket = function(){
		var sessionId = $cookieStore.get('sessionId');
		var target = 'ws://sandbox.bluesapphirecommerce.com:8080/chatpay/websocket/chat?sessionId='+sessionId;
        //console.log(sessionId);
		var ws;
		if ('WebSocket' in window) {
            ws = new WebSocket(target);
        } else if ('MozWebSocket' in window) {
            ws = new MozWebSocket(target);
        } else {
            alert('WebSocket is not supported by this browser.');
            return;
        }
        return ws;
	}

});
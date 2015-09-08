'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('MainCtrl', function ($scope, $location, $cookieStore, UserService, md5) {
    
    $scope.login = function(){
        $scope.md5password = md5.createHash($scope.user.password || '');
        $scope.md5username = md5.createHash($scope.user.username || '');
        
        var data = {
            username: $scope.user.username,
            password: $scope.md5password
        }
        
    	UserService.login(data)
    	.then(function(user){
    		$cookieStore.put('sessionId', user.response.body.sessionId);
    		$cookieStore.put('appKey', user.appKey);
    		$location.path('/home');
            //console.log(user.response.body.sessionId);
    	})
    	.catch(function(err){

    	});
    }


  });

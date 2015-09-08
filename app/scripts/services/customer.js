'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('CustomerService', function ($http, $q, $cookieStore) {
   
   this.fetch = function(){
    var data = {
      sessionId: $cookieStore.get('sessionId')
    };

    var deferred = $q.defer();
    
    $http.post('/api/home', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.profile = function(){
    var data = {
      sessionId: $cookieStore.get('sessionId')
    };
    var deferred = $q.defer();
    $http.post('/api/check', $.param(data))
    .success(function(profile){
      deferred.resolve(profile);
    })
    .error(function(err){
      deferred.reject(err);
      //deferred.resolve({});
    });

    return deferred.promise;
   };

  });

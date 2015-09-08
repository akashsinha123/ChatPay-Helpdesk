'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('UserService', function ($http, $q) {
   this.login = function(data){
    var deferred = $q.defer();
    //data.appKey = '2b11d3ccacf3b2f7675532bfd0c0bfdf';
    $http.post('/api/login', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.profile = function(data){
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

'use script'

angular.module('photoApp').factory('GetPhotosService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.getPhotos = function (id, callback) {

            $http.get('/api/getPhotos/'+id).success(function(response){
               	console.log(response);
               	callback(response);
            });

        };
        

        service.getMyBuys = function (id, callback) {

            $http.get('/api/getMyBuys/'+id).success(function(response){
               	console.log(response);
               	callback(response);
            });

        };
        
   
       return service;
 }]);

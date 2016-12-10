'use script'

angular.module('photoApp').factory('GetImageDetailsService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.getImageDetails = function (id, callback) {

            $http.get('/api/getImageDetails/'+id).success(function(response){
               	console.log(response);
               	callback(response);
            });

        };

       return service;
 }]);

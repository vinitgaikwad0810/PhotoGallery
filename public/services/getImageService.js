'use script'

angular.module('photoApp').factory('GetImageDetailsService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.getImageDetails = function (id, callback) {
						console.log("Id in service"+id)
            $http.get('/api/getImageDetails/'+id).success(function(response){
               	console.log("Image details response"+JSON.stringify(response));
               	callback(response);
            });

        };

       return service;
 }]);

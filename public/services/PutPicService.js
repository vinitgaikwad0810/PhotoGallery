'use script'

angular.module('photoApp').factory('PutPicDetailsService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

	// console.log("Id in service"+id);

        service.putPicDetails = function (id,ratings,username,callback) {
						console.log("Id and ratings in service"+id+ratings)
            $http.put('/api/putPicDetails/'+id+'/'+ratings+'/'+username).success(function(response){
               	console.log("Image details response"+JSON.stringify(response));
               	callback(response);
            });

        };

       return service;
 }]);

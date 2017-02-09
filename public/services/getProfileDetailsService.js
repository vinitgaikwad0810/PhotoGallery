'use script'

angular.module('photoApp').factory('GetProfileDetailsService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.getProfileDetails = function (id, callback) {

            $http.get('/api/getProfileDetails/'+id).success(function(response){
               	console.log(response);
               	callback(response);
            });

        };
        service.editProfileDetails = function (name, city, username, email, password, callback) {

            $http.post('/api/editProfileDetails',{ name: name , city:city, username: username, email:email, password: password }).success(function(response){
               	console.log(response);
               	callback(response);
            });

        };
   
       return service;
 }]);

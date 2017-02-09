'use script'

angular.module('photoApp').factory('RegistrationService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.register = function (name, city, username, email, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
             console.log(name);
                callback("response");
            }, 1000);


            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post('/api/register', { name: name , city:city, username: username, email:email, password: password })
                .success(function (response) {
                    callback(response);
               });

        };


   

        return service;
    }]);

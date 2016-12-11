'use script'

angular.module('photoApp').factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', '$timeout', '$base64',

    function($http, $cookieStore, $rootScope, $timeout, $base64) {
        var service = {};


        service.Login = function(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             * 
             * 
             ----------------------------------------------*/

    


            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post('/api/authentication', {
                    username: username,
                    password: password
                })
                .then(function(response) {

                    console.log(response)
                    callback(true);
                })
                .catch(function(response) {

                    console.log(response);
                    callback(false);

                    // if(response.redirectUrl!=null)
                    // location.replace(response.redirectUrl); 
                });


        };

        service.SetCredentials = function (username, password) {
            var authdata = $base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
           // $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
        //    $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    }
]);
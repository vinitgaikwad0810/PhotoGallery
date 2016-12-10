'use script'

angular.module('photoApp').factory('PostPhotoService',
	[ '$http', '$cookieStore', '$rootScope', '$timeout',

	function ( $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.postPhoto = function (imageData, callback) {
          console.log(imageData);
          $http.post('/api/uploadPics/', {
                  imageData: imageData,
              })
              .then(function(response) {
                  console.log(response)
                  callback(true);
              })
              .catch(function(response) {

                  console.log(response);
                  callback(false);
              });
        };

       return service;
 }]);

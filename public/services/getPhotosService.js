'use script'

angular.module('photoApp').factory('GetPhotosService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',

        function ($http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            service.getPhotos = function (id, callback) {

                $http.get('/api/getPhotos/' + id).success(function (response) {
                    console.log(response);
                    callback(response);
                }).catch(function (data) {

                        callback(false);
                    }
                )
            };
            
    


            service.getMyBuys = function (id, callback) {

                $http.get('/api/getMyBuys/' + id).success(function (response) {
                    console.log(response);
                    callback(response);
                });

            };


            service.getPhotosByTags = function (tags, callback) {

                console.log("tags");
                console.log(tags);
                for (var i = 0; i < tags.length; i++) {
                                      var tag = tags[i];

                    tag = tag.replace(/\s+/g, '');

                    $http.get('/api/getPhotosByTags/' + tag).success(function (response) {
                        callback(response);

                    });
                }
            }



      
        
        service.getMyPhotos = function (id, callback) {

            $http.get('/api/getMyPhotos/'+id).success(function(response){
               	console.log(response);
               	callback(response);
            }).catch( function(data) {

               callback(false);
            }
            )};

            service.editPhotoDetails = function (_id, photo_name,description,cost, callback) {

                $http.post('/api/editPhotoDetails',{ _id: _id , photo_name:photo_name, description: description,cost:cost}).success(function(response){
                   	console.log(response);
                   	callback(response);
                });

            };

            return service;
        }])
;


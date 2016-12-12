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


            return service;
        }])
;

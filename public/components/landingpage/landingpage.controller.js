(function () {
        'use strict';

        angular.module('photoApp').controller('landingPageController', Controller, ['$cookieStore', '$rootScope']);

        function Controller($location, $stateParams, $scope, $state, $cookieStore, $rootScope, GetPhotosService, $http, PostPhotoService) {
            var vm = $scope;
            vm.getDetails = getDetails;
            vm.goToProfilePage = goToProfilePage;
            vm.goToMyPicsPage = goToMyPicsPage;
            initController();

            function initController() {
                var id = $stateParams.id;

                setTimeout(function () {
                    getPhotos(id)
                }, 3000);
                // reset login status
                // AuthenticationService.Logout();
            }


            function getPhotos(id) {
                console.log("State Params" + id);

                GetPhotosService.getPhotos(id, function (result) {
                    if (result) {
                        console.log(result.data);
                        // $location.path('/');
                        vm.photos = result.data;
                    } else {
                        $location.path('/');

                    }
                });
            };

            function goToProfilePage() {
                var id = $cookieStore.get('globals').currentUser.username;
                $state.transitionTo('profilepage', {id: id});

            };

            function goToMyPicsPage() {
                var id = $cookieStore.get('globals').currentUser.username;
                $state.transitionTo('mypicspage', {id: id});

            };


            function getDetails(id) {
                //console.log("Inside getDetails" + id);
                $state.transitionTo('image_details', {id: id});

            };


            $scope.fileUpload = function () {
                $("#Upload").click();
            }

            $scope.uploadToS3 = function () {
                var files = $("#Upload")[0].files;
                var promises = [];
                if (files.length > 0) {
                    $scope.max = files.length;
                    $scope.dynamic = 0;
                    angular.forEach(files, function (value, key) {
                        getUrl(value);
                    });
                    //console.log("$data");

                    //console.log($scope.data);
                }
            }

            var getUrl = function (file) {
                var s3 = new AWS.S3({params: {Bucket: 'photobucket280'}});
                $http.get('/aws?filename=' + file.name + '&filetype=' + file.type)
                    .then(function (response) {
                        const xhr = new XMLHttpRequest();
                        var tags = [$("tokenField-0").tokenfield('getTokensList')];
                        var jsondata = new Object();
                        jsondata["url"] = response["data"];
                        jsondata["tags"] = tags;
                        jsondata["username"] = $cookieStore.get('globals').currentUser.username;
                        jsondata["ratings"] = 0;
                        xhr.open('PUT', response["data"]);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    alert('successful');
                                    $scope.dynamic = $scope.dynamic + 1;
                                    //$scope.data.push(jsondata);
                                    PostPhotoService.postPhoto(jsondata);
                                } else {
                                    alert('Could not upload file.');
                                }
                            }
                        };
                        console.log("file" + file);
                        xhr.send(file);
                    }, function (response) {
                        alert("hello");
                    });
            }


            $scope.destroy = function () {
                $("#tokenfield").tokenfield('destroy');
            }

            $("#uploadButton").click(function () {
                $("#uploadButton").blur();
            });


            $("#Upload").change(function () {
                var scope = angular.element($("#previewModal")).scope();
                //$scope.files = [2,3,4];

                var file = $("#Upload")[0].files;
                console.log(file.length);
                $scope.noOfFiles = file.length;

                scope.$apply(function () {
                    scope.files = new Array(file.length);
                });
                console.log($scope.files);
                $("#previewModal").modal({backdrop: false});

                $(".modal").modal('show');
                //var totalwidth = 190 * $('.tableData').length;
                //$(".modal-body").css('width', totalwidth);

                var anyWindow = window.URL || window.webkitURL;
                for (var i = 0; i < file.length; i++) {
                    var objectUrl = anyWindow.createObjectURL(file[i]);
                    $('#previewImage-' + i).attr('src', objectUrl);
                    window.URL.revokeObjectURL(file[i]);
                }
                for (var i = 0; i < file.length; i++) {
                    $('#tokenField-' + i).tokenfield();
                }

                $("body").removeClass('modal-open');
                $("#previewModal").addClass('modal-open');
                //	$(".modal-backdrop").removeClass();*/
            });
        };
    })();

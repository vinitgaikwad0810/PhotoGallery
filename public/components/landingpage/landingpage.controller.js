(function () {
        'use strict';

        angular.module('photoApp').controller('landingPageController', Controller, ['$cookieStore', '$rootScope']);

        function Controller($location, $stateParams, $scope, $state, $cookieStore, $rootScope, GetPhotosService, $http, PostPhotoService, AuthenticationService) {
            var vm = $scope;
            vm.getDetails = getDetails;
            vm.goToProfilePage = goToProfilePage;
            vm.goToMyPicsPage = goToMyPicsPage;
            vm.search = search;
            $scope.progress = "0%";
            vm.logout = logout;
            $("#uploadButton").draggable({cancel:false});
            initController();

            function initController() {
                var id = $stateParams.id;
                getPhotos(id)
                // reset login status
                // AuthenticationService.Logout();
                $('#tokenfield-typeahead').tokenfield();
                $('.form-control').css('display','inline-block')
            }

            function logout() {
                AuthenticationService.ClearCredentials();
                $http.post('/logout');
                $state.transitionTo('home');
            }

            function search() {

            var tokenlist = [$('#tokenfield-typeahead').tokenfield('getTokensList')];
            console.log("tokenlist");
            console.log(tokenlist);
            var tags = tokenlist[0].split(",");
            vm.photos = [];
            GetPhotosService.getPhotosByTags(tags, function (response) {

                console.log("Search Result");
                console.log(response);

                if (true) {
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("Iter" + i);
                        console.log(response.data[i]);
                        vm.photos[vm.photos.length] = response.data[i].imageData;
                        vm.photos[vm.photos.length-1]._id = response.data[i]._id;

                    }


                } else {
                    vm.photos[vm.photos.length] = response.data.imageData;
                }
                vm.photos = removeDuplicates(vm.photos, 'url');
            })


        }


        function removeDuplicates(originalArray, objKey) {
            var trimmedArray = [];
            var values = [];
            var value;

            for (var i = 0; i < originalArray.length; i++) {
                value = originalArray[i][objKey];

                if (values.indexOf(value) === -1) {
                    trimmedArray.push(originalArray[i]);
                    values.push(value);
                }
            }
            return trimmedArray;

        }



        function getPhotos(id) {
            console.log("State Params" + id);

            GetPhotosService.getPhotos(id, function (result) {
                if (result) {
                    console.log(result.data);
                    // $location.path('/');
                    vm.photos = result.data;
                    //$(".loader").fadeOut("slow");
                    $scope.loadValue = true;
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
            $('#landingProgressBar').css("width", "0%").attr('aria-valuenow', 0);

            $(".progress").css({"display": "none"});

            if ($scope.dynamic == 100) {
                $scope.dynamic = 0;
            }
            $("#Upload").click();
        }

        $scope.uploadToS3 = function () {
            var files = $("#Upload")[0].files;
            var promises = [];
            //$(".modal").modal('hide');
            $(".progress").css({"display": "block"});
            if (files.length > 0) {
                $scope.max = files.length;
                $scope.dynamic = 0;
                angular.forEach(files, function (value, key) {
                    getUrl(value, key);
                });
                //console.log("$data");

                //console.log($scope.data);
            }
        }

        var getUrl = function (file, key) {
            var s3 = new AWS.S3({params: {Bucket: ''}});
            $http.get('/aws?filename=' + file.name + '&filetype=' + file.type)
                .then(function (response) {
                    const xhr = new XMLHttpRequest();
                    var tagNum = $("#tokenField-" + key).tokenfield('getTokens').length;
                    var tags = [];
                    for (var i = 0; i < tagNum; i++) {
                        tags.push($("#tokenField-" + key).tokenfield('getTokens')[i].value);
                    }
                    var jsondata = new Object();
                    jsondata["url"] = response["data"];
                    jsondata["tags"] = tags;
                    jsondata["owner"] = $cookieStore.get('globals').currentUser.username;
                    jsondata["ratings"] = 0;

                    var valuer = $scope.dynamic + (100 / $scope.max);
                    $scope.dynamic = valuer;
                    $('#landingProgressBar').css("width", valuer + '%').attr('aria-valuenow', valuer);

                    xhr.open('PUT', response["data"]);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                //alert('successful');
                                //$scope.data.push(jsondata);
                                PostPhotoService.postPhoto(jsondata, function (result) {
                                    if (result.status_code == 200) {
                                        console.log("inserted");
                                    } else {
                                        console.log("not inserted");
                                    }
                                });

                                if ($scope.dynamic == 100) {
                                    $(".modal").modal('hide');
                                }
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

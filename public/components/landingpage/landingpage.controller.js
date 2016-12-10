(function() {
	'use strict';

	angular.module('photoApp').controller('landingPageController', Controller,['$cookieStore', '$rootScope']);

	function Controller($location, $stateParams, $scope,$state,$cookieStore, $rootScope, GetPhotosService, $http) {
		var vm = $scope;
		vm.goToProfilePage=goToProfilePage;
		vm.getDetails=getDetails;
		initController();

		function initController() {
			var id = $stateParams.id;

			setTimeout(function() {
				getPhotos(id)
			}, 3000);
			// reset login status
			// AuthenticationService.Logout();
		}
		;

		function getPhotos(id) {
			console.log("State Params" + id);

				GetPhotosService.getPhotos(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.photos = result.data;
					} else {

					}
				});
		};

		function goToProfilePage(){
			var id=$cookieStore.get('globals').currentUser.username;
			$state.transitionTo('profilepage',{id:id});

	};

		function getDetails(id) {
			console.log("Inside getDetails" + id);
	    $state.transitionTo('image_details',{id:id});

		};

		$scope.fileUpload = function() {
      $("#Upload").click();
    }

		$scope.uploadToS3 = function() {
			var files = $("#Upload")[0].files;
			var promises = [];
			if(files.length > 0) {
				angular.forEach(files, function(value,key) {
						getUrl(value);
				});
    }
		}

		var getUrl = function(file) {
			var s3 = new AWS.S3({ params: {Bucket: ''} });
			$http.get('/aws?filename=' + file.name +'&filetype=' + file.type)
					  .then(function(response) {
							console.log("response"+response["data"]);
							const xhr = new XMLHttpRequest();
							xhr.open('PUT', response["data"]);
							xhr.onreadystatechange = () => {
								if(xhr.readyState === 4){
									if(xhr.status === 200){
										alert('successful');
									} else{
										alert('Could not upload file.');
									}
								}
							};
							console.log("file"+file);
							xhr.send(file);
						}, function(response) {
							alert("hello");
						});
		}


		$scope.destroy = function() {
			$("#tokenfield").tokenfield('destroy');
		}

    $("#uploadButton").click(function(){
      $("#uploadButton").blur();
    });




    $("#Upload").change(function(){
			var scope = angular.element($("#previewModal")).scope();
			//$scope.files = [2,3,4];

			var file = $("#Upload")[0].files;
      console.log(file.length);
			$scope.noOfFiles = file.length;

			scope.$apply(function(){
			        scope.files = new Array(file.length);
			});
			console.log($scope.files);
			$("#previewModal").modal({backdrop: false});

			$(".modal").modal('show');

			var anyWindow = window.URL || window.webkitURL;
			for(var i = 0; i < file.length; i++){
			var objectUrl = anyWindow.createObjectURL(file[i]);
				$('#previewImage-'+i).attr('src',objectUrl);
				window.URL.revokeObjectURL(file[i]);
			}
			for (var i=0; i<file.length; i++) {
					$('#tokenField-'+ i).tokenfield();
			}

			$("body").removeClass('modal-open');
			$("#previewModal").addClass('modal-open');
			//	$(".modal-backdrop").removeClass();*/
		});
		};
})();

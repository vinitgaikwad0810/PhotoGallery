(function() {
	'use strict';

	angular.module('photoApp').controller('landingPageController', Controller,['$cookieStore', '$rootScope']);

<<<<<<< Updated upstream
	function Controller($location, $stateParams, $scope,$state,$cookieStore, $rootScope, GetPhotosService) {
		var vm = $scope;
		vm.goToProfilePage=goToProfilePage;
=======
	function Controller($location, $stateParams, $scope, $state,GetPhotosService) {
		var vm = $scope;
  vm.getDetails=getDetails;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
			
		};
		
		function goToProfilePage(){
			var id=$cookieStore.get('globals').currentUser.username;
			$state.transitionTo('profilepage',{id:id});
		
	};
=======
			}, 3000);
		};
		function getDetails(id) {
			console.log("Inside getDetails" + id);
	    $state.transitionTo('image_details',{id:id});

		};
>>>>>>> Stashed changes
	}
})();

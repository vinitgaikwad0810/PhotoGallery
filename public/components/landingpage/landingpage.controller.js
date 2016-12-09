(function() {
	'use strict';

	angular.module('photoApp').controller('landingPageController', Controller,['$cookieStore', '$rootScope']);

	function Controller($location, $stateParams, $scope,$state,$cookieStore, $rootScope, GetPhotosService) {
		var vm = $scope;
		vm.goToProfilePage=goToProfilePage;
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
			setTimeout(function() {
				GetPhotosService.getPhotos(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.photos = result.data;
					} else {

					}
				});
			}, 3000);
		}
		;
		function goToProfilePage(){
			var id=$cookieStore.get('globals').currentUser.username;
			$state.transitionTo('profilepage',{id:id});
		
	};
	}
})();
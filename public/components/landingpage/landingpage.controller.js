(function() {
	'use strict';

	angular.module('photoApp').controller('landingPageController', Controller);

	function Controller($location, $stateParams, $scope, GetPhotosService) {
		var vm = $scope;

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
	}
})();
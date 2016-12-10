(function() {
	'use strict';

	angular.module('photoApp').controller('detailsController', Controller);

	function Controller($location, $stateParams, $scope, $state,GetImageDetailsService) {
		var vm = $scope;
vm.getImageDetails=getImageDetails;
		initController();

		function initController() {
			var id = $stateParams.id;
    getImageDetails(id);

			// reset login status
			// AuthenticationService.Logout();
		}
		;

		function getImageDetails(id) {
			console.log("State Params" + id);
			setTimeout(function() {
				GetImageDetailsService.getImageDetails(id, function(result) {
					if (result) {
						console.log(result.data);
						vm.photoDetails = result.data[0];
					} else {

					}
				});
			}, 3000);
		};

	}
})();

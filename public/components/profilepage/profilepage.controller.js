(function() {
	'use strict';

	angular.module('photoApp').controller('profilePageController', Controller);

	function Controller($location, $stateParams, $scope,$state, GetProfileDetailsService) {
		var vm = $scope;
		vm.getProfileDetails=getProfileDetails;
	
		initController();
		function initController() {
			var id = $stateParams.id;
			getProfileDetails(id);
		}
		;
		function getProfileDetails(id) {
			console.log("State Params" + id);
			setTimeout(function() {
				GetProfileDetailsService.getProfileDetails(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.user = result.data;
						
					
					} else {

					}
				});
			}, 3000);
		};

	}
})();
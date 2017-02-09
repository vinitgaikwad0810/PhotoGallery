(function() {
	'use strict';

	angular.module('photoApp').controller('profilePageController', Controller,['$cookieStore', '$rootScope']);

	function Controller($location, $stateParams, $scope,$state,$cookieStore,$rootScope, GetProfileDetailsService) {
		var vm = $scope;
		vm.editProfileDetails=editProfileDetails;

		initController();
		function initController() {
			var id = $stateParams.id;
			getProfileDetails(id);
		}
		;
		function getProfileDetails(id) {
			console.log("State Params" + id);

				GetProfileDetailsService.getProfileDetails(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.user = result.data;


					} else {

					}
				});

		};

// 		function success(){
// 	$("#").append(<div class="alert alert-success">
// <strong>Success!</strong> Indicates a successful or positive action.
// </div>);
// 		};
//
// 		function cancel(){
//
// 			  $state.transitionTo('landingpage', {id: id});
// 		}
		function editProfileDetails() {

			console.log("Edit Profile"+vm.user.name+" "+vm.user.city+" "+vm.user.username);
				GetProfileDetailsService.editProfileDetails(vm.user.name, vm.user.city, vm.user.username, vm.user.email, vm.user.password, function(result) {
					if (result.status_code==200) {
						console.log(result);

						getProfileDetails(vm.user.username);


					} else {
						console.log("Cannot edit");
					}
				});

		};

	}
})();

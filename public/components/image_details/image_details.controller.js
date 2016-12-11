(function() {
	'use strict';

	angular.module('photoApp').controller('detailsController', Controller, ['$cookieStore', '$rootScope']);

	function Controller($location, $cookieStore,$stateParams, $scope, $rootScope,$state,GetImageDetailsService,PutPicDetailsService) {
		var vm = $scope;
vm.getImageDetails=getImageDetails;
vm.putPicDetails=putPicDetails;
		initController();

		function initController() {
			var id = $stateParams.id;
			var ratings=$stateParams.ratings;

    getImageDetails(id);
	 putPicDetails(id,ratings);
			// reset login status
			// AuthenticationService.Logout();
		}
		;
		function putPicDetails(id,ratings){
var username = $cookieStore.get('globals').currentUser.username;
			console.log("put logging id and ratings"+" "+id+" "+ratings+" "+username);
			setTimeout(function(){
		   PutPicDetailsService.putPicDetails(id,ratings,username,function(result) {
				 if (result) {
					 console.log(result.data);
					//  vm.picUpdates = result.data;
				 } else {
                console.log("Error in updating ratings");
				 }
				 	});
		 },3000)
		};

		function getImageDetails(id) {
			// console.log("controller Params" + id);
			setTimeout(function() {
				GetImageDetailsService.getImageDetails(id, function(result) {
					if (result) {
						console.log(result.data);
						vm.photoDetails = result.data;
					} else {

					}
				});
			}, 3000);
		};
};
	})();

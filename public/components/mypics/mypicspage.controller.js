(function() {
	'use strict';

	angular.module('photoApp').controller('myPicsPageController', Controller,['$cookieStore', '$rootScope']);

	function Controller($location, $stateParams, $scope,$state,$cookieStore, $rootScope, GetPhotosService) {
		var vm = $scope;
		vm.getMyPhotos=getMyPhotos;
		vm.getMyBuys=getMyBuys;
		initController();

		function initController() {
			var id=$cookieStore.get('globals').currentUser.username;

			getMyPhotos(id);
			getMyBuys(id);
		}
		;

		function getMyPhotos(id) {
			console.log("State Params" + id);	
				GetPhotosService.getPhotos(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.mypics = result.data;
					} else {

					}
				});
			
		};
		
		function getMyBuys(id) {
			console.log("State Params" + id);
		
				GetPhotosService.getMyBuys(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.mybuys = result.data;
					} else {

					}
				});
			
		};
		

	}
})();
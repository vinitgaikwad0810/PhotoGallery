(function() {
	'use strict';

	angular.module('photoApp').controller('myPicsPageController', Controller,['$cookieStore', '$rootScope']);

	function Controller($location, $stateParams, $scope,$state,$cookieStore, $rootScope, GetPhotosService) {
		var vm = $scope;
		vm.getMyPhotos=getMyPhotos;
		vm.getMyBuys=getMyBuys;
		vm.editPhotoDetails=editPhotoDetails;
		initController();
		vm.openMyDialog = openMyDialog;
		function initController() {
			
			var id = $cookieStore.get('globals').currentUser.username;
			
			getMyPhotos(id);
			getMyBuys(id);
			vm.selected='mypics';
			
		}
		;

		function getMyPhotos(id) {
			console.log("State Params" + id);	
				GetPhotosService.getMyPhotos(id, function(result) {
					if (result) {
						console.log(result.data);
						// $location.path('/');
						vm.mypics = result.data;
						vm.pics=vm.mypics;
						vm.mypicsLength = vm.pics.length;
					
					} else {

					}
				});
			
		};
		
		function getMyBuys(id) {
			console.log("State Params" + id);
		
				GetPhotosService.getMyBuys(id, function(result) {
					if (result) {
						console.log("my buy");
						console.log(result.data);
						// $location.path('/');
						vm.mybuys = result.data;
						
					} else {

					}
				});
			
		};
		
		function editPhotoDetails(){
			var n = $scope.mysinglepic;
			
			console.log(n);
			/*console.log("photo"+n.photo_name);
			console.log("photo"+n._id);
			console.log("photo"+n.description);
			console.log("photo"+n.cost);*/
			var photo_name = $("#modalTitle").val();
			var photoDesc = $("#modalDesc").val();
			var photoCost = $("#modalCost").val();
			console.log(photo_name);
			var id = $cookieStore.get('globals').currentUser.username;
			
			GetPhotosService.editPhotoDetails(n._id, photo_name,photoDesc,photoCost, function(result) {
				if (result.status_code==200) {
					console.log(result);				
					getMyPhotos(id);
					
				
				} else {
					console.log("Cannot edit");
				}
			});
		}
		
		function openMyDialog(n) {
			//console.log(n["imageData"]);
			$scope.mysinglepic = n;
			$("#myModal").modal('show');
			$("#modalTitle").val(n.imageData.photo_name);
			$("#modalDesc").val(n.imageData.description);
			$("#modalCost").val(n.imageData.cost);
		}
		

	}
})();
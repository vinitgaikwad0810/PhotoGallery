(function () {
    'use strict';
 
    angular
        .module('photoApp')
        .controller('landingPageController', Controller);
 
    function Controller($location,$stateParams, AuthenticationService) {
        var vm = this;
 
        vm.getPhotos = getPhotos;
 
        initController();
 
        function initController() {
        	console.log('Inside landing page'+$stateParams.id);
            // reset login status
            // AuthenticationService.Logout();
        };
 
        function getPhotos() {
        
        };
    }
})();
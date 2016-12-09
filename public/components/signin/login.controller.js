(function () {
    'use strict';
 
    angular
        .module('photoApp')
        .controller('Login.IndexController', Controller);
 
    function Controller($scope, $location,$state, AuthenticationService) {
        var vm = $scope;
 
        vm.login = login;
 
        initController();
 
        function initController() {
            // reset login status
            // AuthenticationService.Logout();
        };
 
        function login() {
        	console.log($state);
            vm.loading = true;
         //   console.log("Donita"+vm.username);
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                	//console.log("Donita"+vm.username);
                  //  $location.path('/');
                	$state.transitionTo('landingpage',{id:"1"});
                } else {
                    vm.error = 'Username or password is incorrect';
                    console.log(vm.error);
                    vm.loading = false;
                }
            });
        };
    }
})();
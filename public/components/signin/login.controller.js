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
            AuthenticationService.Login(vm.username, vm.password, function (success) {
                if (success === true) {
                    //console.log("Donita"+vm.username);
                  //  $location.path('/');
                    AuthenticationService.SetCredentials(vm.username,vm.password);

                    $state.transitionTo('landingpage',{id:vm.username});
                } else {
                    vm.serverMessage = 'Username or password is incorrect';
                    console.log(vm.serverMessage);
                    vm.loading = false;
                }
            });
        };
    }
})();
(function () {
    'use strict';
 
    angular
        .module('photoApp')
        .controller('signupController', Controller);
 
    function Controller($scope, $location, RegistrationService) {
        var vm =  $scope;
 
         vm.signup = signup;
 
        initController();
 
        function initController() {
            // reset login status
            // AuthenticationService.Logout();
        };
 
        function signup() {
            // vm.loading = true;
            // AuthenticationService.Login(vm.username, vm.password, function (result) {
            //     if (result === true) {
            //         $location.path('/');
            //     } else {
            //         vm.error = 'Username or password is incorrect';
            //         vm.loading = false;
            //     }
            // });

            RegistrationService.register(vm.name,vm.city, vm.username, vm.email, vm.password, function(result){


             console.log("Vinit!!!!");
            });
        };
    }
})();
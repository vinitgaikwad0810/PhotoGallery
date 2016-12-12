(function () {
    'use strict';

    angular
        .module('photoApp')
        .controller('signupController', Controller);

    function Controller($scope, $location, $state, RegistrationService, AuthenticationService) {
        var vm = $scope;

        vm.signup = signup;

        initController();

        function initController() {
            // reset login status
            // AuthenticationService.Logout();
        };

        function signup() {


            RegistrationService.register(vm.name, vm.city, vm.username, vm.email, vm.password, function (result) {


                AuthenticationService.Login(vm.username, vm.password, function (success) {
                    if (success === true) {
                        //console.log("Donita"+vm.username);
                        //  $location.path('/');
                        AuthenticationService.SetCredentials(vm.username, vm.password);

                        $state.transitionTo('landingpage', {id: vm.username});
                    } else {
                        vm.serverMessage = 'Username or password is incorrect';
                        console.log(vm.serverMessage);
                        vm.loading = false;
                    }
                });

            });
        };
    }
})();

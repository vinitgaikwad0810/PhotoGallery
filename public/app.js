'use strict';

var photoApp = angular.module('photoApp', ['ui.router', 'ngCookies', 'base64']);

photoApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'header': {
                    templateUrl: '/shared/header/header.html'

                },
                'content': {
                    templateUrl: '/components/home/content.html',
                    controller: 'videoController'

                },
                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }
        }).state('signup', {
        url: '/signup',
        views: {
            'header': {
                templateUrl: '/shared/header/header.html'
            },
            'content': {
                templateUrl: '/components/signup/signup.html',
                controller: 'signupController'
            },
            'footer': {
                templateUrl: '/shared/footer/footer.html'
            }
        }
    }).state(
        'images',
        {
            url: '/images',
            views: {
                'header': {
                    templateUrl: '/shared/header/header.html'
                },
                'content': {
                    templateUrl: '/components/images/content.html',
                    controller: 'imageGridController'
                },
                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }
        }).state(
        'signin',
        {
            url: '/signin',
            views: {
                'header': {
                    templateUrl: '/shared/header/header.html'
                },
                'content': {
                    templateUrl: '/components/signin/login.view.html',
                    controller: 'Login.IndexController'
                },
                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }
        }).state(
        'landingpage',
        {
            url: '/landingpage/:id',
            views: {
                'header': {
                    templateUrl: '/components/landingpage/header.html',
                    controller: 'landingPageController'
                },
                'content': {
                    templateUrl: '/components/landingpage/landingpage.content.html',
                    controller: 'landingPageController'
                },
                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }

        }).state(
        'profilepage',
        {
            url: '/profilepage/:id',
            views: {

                'header': {
                    templateUrl: '/components/landingpage/header.html',

                    controller: 'landingPageController'
                },

                'content': {


                    templateUrl: '/components/profilepage/profilepage.content.html',
                    controller: 'profilePageController'

                },
                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }

        }).state(
        'image_details',
        {
            url: '/details/:id',
            views: {

                'header': {
                    templateUrl: '/components/landingpage/header.html',
                    controller: 'landingPageController'


                },
                'content': {

                    templateUrl: '/components/image_details/details.html',
                    controller: 'detailsController'

                },


                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }

        }).state(
        'mypicspage',
        {
            url: '/mypicspage/:id',
            views: {

                'header': {
                    templateUrl: '/components/landingpage/header.html',
                    controller: 'landingPageController'

                },

                'content': {
                    templateUrl: '/components/mypics/mypicspage.content.html',
                    controller: 'myPicsPageController'

                },
                'footer': {
                    templateUrl: '/shared/footer/footer.html'
                }
            }

        });

});

photoApp.run(run);

function run($rootScope, $http, $location, $cookieStore) {
    // keep user logged in after page refresh

    if ($cookieStore.get('globals')) {
        var id = $cookieStore.get('globals').currentUser.username;

    } else {
        $location.path('/');
    }


    // if ($rootScope.globals) {
    //     if (id !== $rootScope.globals.username) {
    //         $location.path('/');
    //     }
    //
    // }
    console.log("cookie id");
    console.log(id);


    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        $('.test.className').filter(function () {
            return this.textContent === 'content';
        }).slice(0, -1).remove();
    });

}

// photoApp.config(["$locationProvider", function($locationProvider) {
//   $locationProvider.html5Mode(true);
// }]);


photoApp.controller('videoController', function ($scope) {
    $scope.pageClass = 'page-video';

});

photoApp.controller('imageGridController', function ($scope) {
    $scope.pageClass = 'page-imageGrid';
});

photoApp.controller('landingPageController', function ($scope) {
    $scope.pageClass = 'page-landing';
});

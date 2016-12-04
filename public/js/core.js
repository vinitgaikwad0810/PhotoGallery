
var photoApp = angular.module('photoApp', ['ngRoute', 'ngAnimate']);

photoApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'partialviews/videobackground.html',
				controller: 'videoController'
			})

			// route for the about page
			.when('/images', {
				templateUrl : 'partialviews/images.html',
				controller: 'imageGridController'
			})

			.when('/login',{
				templateUrl : 'login/login.view.html',
				controller : 'loginController'

			});

	});

	photoApp.controller('videoController', function($scope){
		$scope.pageClass = 'page-video';
	});

	photoApp.controller('imageGridController', function($scope){
		$scope.pageClass = 'page-imageGrid';
	});
	
	photoApp.controller('loginController',function($scope){
		//$scope.pageClass = 'page-imageGrid';
	}); 	
	
	
	var homeApp = angular.module('homeApp', ['ngRoute']);

	homeApp.config(function($routeProvider) {
			$routeProvider

				// route for the home page
				.when('/', {
					templateUrl : 'partialviews/homepage.html',
					controller: 'homeController'
				})

				// route for the about page
				.when('/image', {
					templateUrl : 'partialviews/selectedImage.html',
					controller: 'imageController'
				});

		});

		homeApp.controller('homeController', function($scope){
			
		});

		homeApp.controller('imageController', function($scope){
			
		});


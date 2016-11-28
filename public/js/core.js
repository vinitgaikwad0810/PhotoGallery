
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
			});

	});

	photoApp.controller('videoController', function($scope){
		$scope.pageClass = 'page-video';
	});

	photoApp.controller('imageGridController', function($scope){
		$scope.pageClass = 'page-imageGrid';
	});

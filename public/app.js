'use strict';

var photoApp = angular.module('photoApp', ['ui.router']);

photoApp.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('app',{
		url: '/',
		views: {
			'header': {
				templateUrl: '/templates/app/header.html'

			},
			'content': {
				templateUrl: '/templates/app/content.html',	
				controller: 'videoController'

			},
			'footer': {
				templateUrl: '/templates/app/footer.html'
			}
		}
	})

	.state('init',{
		url: '/images',
		views: {

			'header': {
				templateUrl: '/templates/images/header.html'

			},

			'content': {
				templateUrl: '/templates/images/content.html',	
				controller: 'imageGridController'

			},
			'footer': {
				templateUrl: '/templates/images/footer.html'
			}
		}

});

	});


	photoApp.controller('videoController', function($scope){
		$scope.pageClass = 'page-video';
	});

	photoApp.controller('imageGridController', function($scope){
		$scope.pageClass = 'page-imageGrid';
	});
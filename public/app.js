'use strict';

var photoApp = angular.module('photoApp', ['ui.router','ngCookies']);

photoApp.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',{
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
	})

	.state('images',{
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


})
	.state('signin',{
		url: '/signin',
		views: {

			'header': {
				templateUrl: '/shared/header/header.html'

			},

			'content': {
				templateUrl: '/components/login/login.view.html',	
				controller: 'Login.IndexController'

			},
			'footer': {
				templateUrl: '/shared/footer/footer.html'
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
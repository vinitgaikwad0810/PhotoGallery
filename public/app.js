'use strict';

var photoApp = angular.module('photoApp', [ 'ui.router', 'ngCookies', 'base64' ]);

photoApp
		.config(function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/');

			$stateProvider
					.state('home', {
						url : '/',
						views : {
							'header' : {
								templateUrl : '/shared/header/header.html'

							},
							'content' : {
								templateUrl : '/components/home/content.html',
								controller : 'videoController'

							},
							'footer' : {
								templateUrl : '/shared/footer/footer.html'
							}
						}
					})
					.state('signup', {
						url : '/signup',
						views : {

							'header' : {
								templateUrl : '/shared/header/header.html'

							},

							'content' : {
								templateUrl : '/components/signup/signup.html',
								controller : 'signupController'

							},
							'footer' : {
								templateUrl : '/shared/footer/footer.html'
							}
						}

					})

					.state(
							'images',
							{
								url : '/images',
								views : {

									'header' : {
										templateUrl : '/shared/header/header.html'

									},

									'content' : {
										templateUrl : '/components/images/content.html',
										controller : 'imageGridController'

									},
									'footer' : {
										templateUrl : '/shared/footer/footer.html'
									}
								}

							})
					.state(
							'signin',
							{
								url : '/signin',
								views : {

									'header' : {
										templateUrl : '/shared/header/header.html'

									},

									'content' : {
										templateUrl : '/components/signin/login.view.html',
										controller : 'Login.IndexController'

									},
									'footer' : {
										templateUrl : '/shared/footer/footer.html'
									}
								}

							})
					.state(
							'landingpage',
							{
								url : '/landingpage/:id',
								views : {

									'header' : {
										templateUrl : '/components/landingpage/header.html',
										controller : 'landingPageController'

									},

									'content' : {
										templateUrl : '/components/landingpage/landingpage.content.html',
										controller : 'landingPageController'

									},
									'footer' : {
										templateUrl : '/shared/footer/footer.html'
									}
								}

<<<<<<< Updated upstream
							}).state(
									'profilepage',
									{
										url : '/profilepage/:id',
										views : {

											'header' : {
												templateUrl : '/components/landingpage/header.html',
													controller : 'landingPageController'
=======
							})

							.state(
									'image_details',
									{
										url : '/details/:id',
										views : {

											'header' : {
												templateUrl : '/components/landingpage/header.html'
>>>>>>> Stashed changes

											},

											'content' : {
<<<<<<< Updated upstream
												templateUrl : '/components/profilepage/profilepage.content.html',
												controller : 'profilePageController'

											},
=======
												templateUrl : '/components/image_details/details.html',
												controller : 'detailsController'

											},

>>>>>>> Stashed changes
											'footer' : {
												templateUrl : '/shared/footer/footer.html'
											}
										}
<<<<<<< Updated upstream

									});
							
=======
								});

>>>>>>> Stashed changes

		});

photoApp.controller('videoController', function($scope) {
	$scope.pageClass = 'page-video';
});

photoApp.controller('imageGridController', function($scope) {
	$scope.pageClass = 'page-imageGrid';
});
